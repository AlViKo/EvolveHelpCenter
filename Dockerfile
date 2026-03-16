FROM node:22-slim AS frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

FROM python:3.13-slim
WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
COPY --from=frontend /app/frontend/dist /app/frontend/dist

RUN python manage.py collectstatic --noinput

CMD python manage.py migrate --noinput && \
    python manage.py seed_content --content-dir ./content && \
    gunicorn evolve_help.wsgi:application --bind 0.0.0.0:${PORT:-8000}
