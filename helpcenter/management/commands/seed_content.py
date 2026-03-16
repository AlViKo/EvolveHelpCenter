import os
from pathlib import Path

import frontmatter
import yaml
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from helpcenter.models import Collection, Article

REQUIRED_COLLECTION_FIELDS = ['title', 'slug', 'description', 'icon', 'audience', 'sort_order']
REQUIRED_ARTICLE_FIELDS = [
    'title', 'slug', 'collection', 'content_type', 'visibility',
    'description', 'author', 'owner', 'status', 'created_at',
    'updated_at', 'last_reviewed_at',
]
VALID_AUDIENCES = {'admin', 'user'}
VALID_VISIBILITIES = {'user', 'admin', 'all'}
VALID_CONTENT_TYPES = {'guide', 'faq', 'overview'}
VALID_STATUSES = {'draft', 'published'}

ALLOWED_VISIBILITY = {
    'admin': {'admin', 'all'},
    'user': {'user', 'all'},
}


class Command(BaseCommand):
    help = 'Seed the database from content/ Markdown files'

    def add_arguments(self, parser):
        parser.add_argument(
            '--content-dir',
            type=str,
            default='./content',
            help='Path to the content directory',
        )
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Validate without writing to the database',
        )

    def handle(self, *args, **options):
        content_dir = Path(options['content_dir']).resolve()
        dry_run = options['dry_run']

        if not content_dir.is_dir():
            raise CommandError(f"Content directory not found: {content_dir}")

        errors = []
        collections_data = []
        articles_data = []

        for entry in sorted(content_dir.iterdir()):
            if not entry.is_dir() or entry.name.startswith('.'):
                continue

            collection_slug = entry.name
            collection_yaml = entry / '_collection.yaml'

            if not collection_yaml.exists():
                # Skip non-collection directories (e.g. images/)
                continue

            with open(collection_yaml, 'r', encoding='utf-8') as f:
                cdata = yaml.safe_load(f)

            if not isinstance(cdata, dict):
                errors.append(f"[{collection_slug}] _collection.yaml is not a valid YAML mapping")
                continue

            for field in REQUIRED_COLLECTION_FIELDS:
                if not cdata.get(field):
                    errors.append(f"[{collection_slug}] Missing required field '{field}' in _collection.yaml")

            if cdata.get('slug') and cdata['slug'] != collection_slug:
                errors.append(f"[{collection_slug}] slug '{cdata['slug']}' does not match folder name")

            if cdata.get('audience') and cdata['audience'] not in VALID_AUDIENCES:
                errors.append(f"[{collection_slug}] Invalid audience '{cdata['audience']}'")

            collections_data.append((collection_slug, cdata))

            for md_file in sorted(entry.glob('*.md')):
                article_slug = md_file.stem

                with open(md_file, 'r', encoding='utf-8') as f:
                    post = frontmatter.load(f)

                meta = dict(post.metadata)
                body = post.content

                for field in REQUIRED_ARTICLE_FIELDS:
                    if not meta.get(field):
                        errors.append(f"[{collection_slug}/{md_file.name}] Missing required field '{field}'")

                if meta.get('slug') and meta['slug'] != article_slug:
                    errors.append(
                        f"[{collection_slug}/{md_file.name}] "
                        f"slug '{meta['slug']}' does not match filename '{article_slug}'"
                    )

                if meta.get('collection') and meta['collection'] != collection_slug:
                    errors.append(
                        f"[{collection_slug}/{md_file.name}] "
                        f"collection '{meta['collection']}' does not match folder '{collection_slug}'"
                    )

                if meta.get('content_type') and meta['content_type'] not in VALID_CONTENT_TYPES:
                    errors.append(f"[{collection_slug}/{md_file.name}] Invalid content_type '{meta['content_type']}'")

                if meta.get('visibility') and meta['visibility'] not in VALID_VISIBILITIES:
                    errors.append(f"[{collection_slug}/{md_file.name}] Invalid visibility '{meta['visibility']}'")

                if meta.get('status') and meta['status'] not in VALID_STATUSES:
                    errors.append(f"[{collection_slug}/{md_file.name}] Invalid status '{meta['status']}'")

                audience = cdata.get('audience')
                visibility = meta.get('visibility')
                if audience and visibility and visibility not in ALLOWED_VISIBILITY.get(audience, set()):
                    errors.append(
                        f"[{collection_slug}/{md_file.name}] "
                        f"visibility '{visibility}' is not compatible with collection audience '{audience}'"
                    )

                articles_data.append((collection_slug, article_slug, meta, body))

        if errors:
            self.stderr.write(self.style.ERROR("Validation errors found:"))
            for err in errors:
                self.stderr.write(self.style.ERROR(f"  - {err}"))
            raise CommandError(f"{len(errors)} validation error(s). No data written.")

        if dry_run:
            self.stdout.write(self.style.SUCCESS(
                f"Dry run OK: {len(collections_data)} collections, {len(articles_data)} articles. No errors."
            ))
            return

        with transaction.atomic():
            collection_objects = {}
            for collection_slug, cdata in collections_data:
                obj, created = Collection.objects.update_or_create(
                    slug=collection_slug,
                    defaults={
                        'title': cdata['title'],
                        'description': cdata['description'],
                        'icon': cdata['icon'],
                        'audience': cdata['audience'],
                        'sort_order': cdata['sort_order'],
                    },
                )
                collection_objects[collection_slug] = obj
                action = 'Created' if created else 'Updated'
                self.stdout.write(f"  {action} collection: {obj.title}")

            for collection_slug, article_slug, meta, body in articles_data:
                collection = collection_objects[collection_slug]
                obj, created = Article.objects.update_or_create(
                    collection=collection,
                    slug=article_slug,
                    defaults={
                        'title': meta['title'],
                        'content_type': meta['content_type'],
                        'visibility': meta['visibility'],
                        'description': meta['description'],
                        'body_markdown': body,
                        'author': meta['author'],
                        'owner': meta['owner'],
                        'status': meta['status'],
                        'sort_order': meta.get('sort_order', 100),
                        'tags': meta.get('tags', []),
                        'created_at': meta['created_at'],
                        'updated_at': meta['updated_at'],
                        'last_reviewed_at': meta['last_reviewed_at'],
                    },
                )
                action = 'Created' if created else 'Updated'
                self.stdout.write(f"  {action} article: {obj.title}")

        self.stdout.write(self.style.SUCCESS(
            f"\nDone: {len(collections_data)} collections, {len(articles_data)} articles seeded."
        ))
