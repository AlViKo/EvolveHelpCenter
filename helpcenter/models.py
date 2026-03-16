from django.db import models


class Collection(models.Model):
    AUDIENCE_CHOICES = [
        ('admin', 'Admin'),
        ('user', 'User'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.CharField(max_length=200)
    icon = models.CharField(max_length=100)
    audience = models.CharField(max_length=10, choices=AUDIENCE_CHOICES)
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['sort_order']

    def __str__(self):
        return self.title


class Article(models.Model):
    CONTENT_TYPE_CHOICES = [
        ('guide', 'Guide'),
        ('faq', 'FAQ'),
        ('overview', 'Overview'),
    ]
    VISIBILITY_CHOICES = [
        ('user', 'User'),
        ('admin', 'Admin'),
        ('all', 'All'),
    ]
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
    ]

    collection = models.ForeignKey(
        Collection, on_delete=models.CASCADE, related_name='articles'
    )
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200)
    content_type = models.CharField(max_length=10, choices=CONTENT_TYPE_CHOICES)
    visibility = models.CharField(max_length=10, choices=VISIBILITY_CHOICES)
    description = models.CharField(max_length=200)
    body_markdown = models.TextField()
    author = models.CharField(max_length=200)
    owner = models.EmailField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    sort_order = models.IntegerField(default=100)
    tags = models.JSONField(default=list, blank=True)
    created_at = models.DateField()
    updated_at = models.DateField()
    last_reviewed_at = models.DateField()

    class Meta:
        ordering = ['sort_order']
        unique_together = [('collection', 'slug')]

    def __str__(self):
        return self.title
