from rest_framework import serializers
from .models import Collection, Article


class ArticleSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['title', 'slug', 'content_type', 'visibility', 'description',
                  'author', 'sort_order', 'updated_at']


class ArticleDetailSerializer(serializers.ModelSerializer):
    collection_title = serializers.CharField(source='collection.title', read_only=True)
    collection_slug = serializers.CharField(source='collection.slug', read_only=True)

    class Meta:
        model = Article
        fields = ['title', 'slug', 'collection_slug', 'collection_title',
                  'content_type', 'visibility', 'description', 'body_markdown',
                  'author', 'owner', 'status', 'sort_order', 'tags',
                  'created_at', 'updated_at', 'last_reviewed_at']


class CollectionSummarySerializer(serializers.ModelSerializer):
    article_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Collection
        fields = ['title', 'slug', 'description', 'icon', 'audience',
                  'sort_order', 'article_count']


class CollectionDetailSerializer(serializers.ModelSerializer):
    articles = ArticleSummarySerializer(many=True, read_only=True)
    article_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Collection
        fields = ['title', 'slug', 'description', 'icon', 'audience',
                  'sort_order', 'article_count', 'articles']


class SearchResultSerializer(serializers.ModelSerializer):
    collection_title = serializers.CharField(source='collection.title', read_only=True)
    collection_slug = serializers.CharField(source='collection.slug', read_only=True)
    audience = serializers.CharField(source='collection.audience', read_only=True)

    class Meta:
        model = Article
        fields = ['title', 'slug', 'description', 'content_type', 'visibility',
                  'collection_slug', 'collection_title', 'audience']
