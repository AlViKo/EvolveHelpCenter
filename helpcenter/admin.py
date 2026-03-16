from django.contrib import admin
from .models import Collection, Article


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'audience', 'sort_order')
    list_filter = ('audience',)
    prepopulated_fields = {'slug': ('title',)}


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'collection', 'content_type', 'visibility', 'status', 'sort_order')
    list_filter = ('status', 'visibility', 'content_type', 'collection')
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title', 'description', 'body_markdown')
