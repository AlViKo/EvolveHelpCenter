from django.db.models import Count, Q
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Collection, Article
from .serializers import (
    CollectionSummarySerializer,
    CollectionDetailSerializer,
    ArticleDetailSerializer,
    ArticleSummarySerializer,
    SearchResultSerializer,
)


def _apply_role_filter_collections(queryset, role):
    if role == 'user':
        return queryset.filter(audience='user')
    return queryset


def _apply_role_filter_articles(queryset, role):
    if role == 'user':
        return queryset.filter(visibility__in=['user', 'all'])
    return queryset


@api_view(['GET'])
def landing(request):
    role = request.query_params.get('role', None)

    collections = Collection.objects.all()
    collections = _apply_role_filter_collections(collections, role)

    article_filter = Q(articles__status='published')
    if role == 'user':
        article_filter &= Q(articles__visibility__in=['user', 'all'])

    collections = collections.annotate(
        article_count=Count('articles', filter=article_filter)
    )

    admin_collections = collections.filter(audience='admin')
    user_collections = collections.filter(audience='user')

    return Response({
        'admin_collections': CollectionSummarySerializer(admin_collections, many=True).data,
        'user_collections': CollectionSummarySerializer(user_collections, many=True).data,
    })


@api_view(['GET'])
def collection_detail(request, slug):
    role = request.query_params.get('role', None)

    collections = _apply_role_filter_collections(Collection.objects.all(), role)

    try:
        collection = collections.get(slug=slug)
    except Collection.DoesNotExist:
        return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

    articles = collection.articles.filter(status='published').order_by('sort_order')
    articles = _apply_role_filter_articles(articles, role)

    article_filter = Q(articles__status='published')
    if role == 'user':
        article_filter &= Q(articles__visibility__in=['user', 'all'])

    collection_with_count = Collection.objects.filter(pk=collection.pk).annotate(
        article_count=Count('articles', filter=article_filter)
    ).first()

    data = CollectionDetailSerializer(collection_with_count).data
    data['articles'] = ArticleSummarySerializer(articles, many=True).data

    return Response(data)


@api_view(['GET'])
def article_detail(request, slug, article_slug):
    try:
        article = Article.objects.select_related('collection').get(
            collection__slug=slug, slug=article_slug, status='published'
        )
    except Article.DoesNotExist:
        return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

    return Response(ArticleDetailSerializer(article).data)


@api_view(['GET'])
def search(request):
    query = request.query_params.get('q', '').strip()
    role = request.query_params.get('role', None)

    if len(query) < 2:
        return Response({'results': [], 'count': 0, 'query': query})

    articles = Article.objects.filter(
        status='published'
    ).filter(
        Q(title__icontains=query) |
        Q(description__icontains=query) |
        Q(body_markdown__icontains=query)
    ).select_related('collection').order_by(
        'collection__sort_order', 'sort_order'
    )

    articles = _apply_role_filter_articles(articles, role)

    if role == 'user':
        articles = articles.filter(collection__audience='user')

    serialized = SearchResultSerializer(articles, many=True).data

    return Response({
        'results': serialized,
        'count': len(serialized),
        'query': query,
    })
