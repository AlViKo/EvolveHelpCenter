from django.urls import path
from . import views

app_name = 'helpcenter'

urlpatterns = [
    path('landing/', views.landing, name='landing'),
    path('search/', views.search, name='search'),
    path('collections/<slug:slug>/', views.collection_detail, name='collection-detail'),
    path('collections/<slug:slug>/<slug:article_slug>/', views.article_detail, name='article-detail'),
]
