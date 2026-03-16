from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView
from django.views.static import serve

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/helpcenter/', include('helpcenter.urls')),
    path('images/<path:path>', serve, {
        'document_root': settings.CONTENT_DIR / 'images',
    }),
    # Catch-all: serve React index.html for all frontend routes
    re_path(r'^(?!api/|admin/|static/|images/).*$', TemplateView.as_view(template_name='index.html')),
]
