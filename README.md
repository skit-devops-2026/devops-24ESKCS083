# CraftCV


## Author

| Roll No. | Name | GitHub username |
|---|---|---|
| 24ESKCS083 | Bharat Dhakad | Immortis88 |

## About

CraftCV is a full-stack web app for building a personal portfolio from ready-made templates. Users fill in their details, preview the result live, save it, and get a public shareable link.

## Tech stack

- Frontend: React, React Router, Tailwind CSS, Axios
- Backend: Node.js / Express (coming soon)
- Database: MongoDB with Mongoose (coming soon)

## Running locally

```bash
make install
make run
```

## Live URL

> **TODO (M6):** Deploy the Docker image from GHCR to a cloud platform (Render / Railway / Fly.io) and replace this line with the live HTTPS URL.

## Health endpoint

`GET /health` returns the running commit SHA. See `Makefile` and the milestone
sheet for why this is required.

## Monitoring

The monitoring stack (Prometheus + Grafana + nginx-prometheus-exporter) lives in [`monitoring/`](monitoring/README.md).

```bash
# Start app + monitoring
docker compose -f docker-compose.yml -f monitoring/docker-compose.monitoring.yml up -d
```

- Prometheus: http://localhost:9090
- Grafana: http://localhost:3000

## Kubernetes

Kubernetes manifests for deploying to a cluster live in [`k8s/`](k8s/):

| File | Purpose |
|------|---------|
| `k8s/deployment.yaml` | Deploys 2 replicas of the frontend pod |
| `k8s/service.yaml` | Exposes the deployment via NodePort 30080 |

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```
