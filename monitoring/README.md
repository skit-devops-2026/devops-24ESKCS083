# Monitoring — CraftCV

This directory contains the Prometheus + Grafana monitoring stack for CraftCV.

## Stack

| Component | Image | Port | Purpose |
|-----------|-------|------|---------|
| Prometheus | `prom/prometheus:v2.53.0` | 9090 | Metrics collection & storage |
| Grafana | `grafana/grafana:11.1.0` | 3000 | Dashboards & visualisation |
| nginx-prometheus-exporter | `nginx/nginx-prometheus-exporter:1.1.0` | 9113 | Exposes Nginx metrics to Prometheus |

## Files

| File | Purpose |
|------|---------|
| `prometheus.yml` | Prometheus scrape configuration |
| `docker-compose.monitoring.yml` | Compose overlay to run the full monitoring stack |

## Running the monitoring stack

```bash
# Start app + monitoring together
docker compose -f docker-compose.yml -f monitoring/docker-compose.monitoring.yml up -d
```

Then open:
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3000 (user: `admin` / password: `admin`)

## Key metrics collected

Prometheus scrapes the `nginx-prometheus-exporter` which reads from Nginx's `stub_status` page:

| Metric | Description |
|--------|-------------|
| `nginx_connections_active` | Current active connections |
| `nginx_connections_accepted_total` | Total accepted connections |
| `nginx_connections_handled_total` | Total handled connections |
| `nginx_http_requests_total` | Total HTTP requests processed |
| `nginx_connections_reading` | Connections reading request |
| `nginx_connections_writing` | Connections writing response |
| `nginx_connections_waiting` | Idle keep-alive connections |

## Grafana dashboard

Import the **Nginx** dashboard (ID `12708`) from Grafana Labs after connecting the Prometheus data source:

1. Grafana → **Connections** → **Data sources** → Add Prometheus (`http://prometheus:9090`)
2. Grafana → **Dashboards** → **Import** → enter ID `12708`

## Alerting (future)

Wire up Alertmanager by uncommenting the `alertmanagers` block in `prometheus.yml` and adding alert rules to a `rules/` subdirectory.
