# Kubernetes Deployment and Cluster Verification — CraftCV

This document details the Kubernetes orchestration configuration and verification steps for **CraftCV** (Module 7).

---

## 1. Architecture Overview

CraftCV is deployed to a Kubernetes cluster using declarative manifests located in [`k8s/`](../k8s/):

| Manifest | Kind | API Version | Purpose |
|----------|------|-------------|---------|
| [`k8s/deployment.yaml`](../k8s/deployment.yaml) | `Deployment` | `apps/v1` | Manages 2 pod replicas of `craftcv-frontend` with rolling updates, resource limits, and probes |
| [`k8s/service.yaml`](../k8s/service.yaml) | `Service` | `v1` | Exposes the pods via static NodePort `30080` (TCP) targeting container port `80` |

### Key Configuration Details

- **Image**: `ghcr.io/skit-devops-2026/devops-24eskcs083:latest` (built and published via GitHub Actions CI pipeline)
- **Image Pull Policy**: `Always` (ensures cluster nodes pull latest release from GHCR)
- **Image Pull Secret**: `ghcr-pull` (references credentials configured by cluster administrators)
- **Replicas**: `2` (high-availability pod distribution)
- **Resource Allocations**:
  - CPU: Request `50m`, Limit `250m`
  - Memory: Request `64Mi`, Limit `128Mi`
- **Health Probes**:
  - `readinessProbe`: HTTP GET `/` on port 80 (initial delay: 5s, period: 10s)
  - `livenessProbe`: HTTP GET `/` on port 80 (initial delay: 15s, period: 20s)

---

## 2. Local Cluster Setup (kind)

Per the milestone guidelines, `kind` (Kubernetes in Docker) is recommended for local development and testing:

```bash
# 1. Create a local cluster with kind
kind create cluster --name craftcv-cluster

# 2. Configure GHCR image pull secret
kubectl create secret docker-registry ghcr-pull \
  --docker-server=ghcr.io \
  --docker-username=<GITHUB_USERNAME> \
  --docker-password=<GITHUB_PAT> \
  --docker-email=<EMAIL>

# 3. Apply manifests
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

---

## 3. Pod Verification and Status Output

Once deployed, verify that the replicas are running and healthy:

```bash
# Verify deployments
kubectl get deployment craftcv-frontend

# Expected output:
# NAME               READY   UP-TO-DATE   AVAILABLE   AGE
# craftcv-frontend   2/2     2            2           45s

# Verify pod status and distribution
kubectl get pods -l app=craftcv-frontend -o wide

# Expected output:
# NAME                                READY   STATUS    RESTARTS   AGE   IP           NODE
# craftcv-frontend-789bf8d8bb-m8d2k   1/1     Running   0          45s   10.244.0.5   kind-control-plane
# craftcv-frontend-789bf8d8bb-q9f4x   1/1     Running   0          45s   10.244.0.6   kind-control-plane

# Verify NodePort service
kubectl get service craftcv-frontend

# Expected output:
# NAME               TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
# craftcv-frontend   NodePort   10.96.142.123   <none>        80:30080/TCP   50s
```

---

## 4. Testing Endpoints

Test HTTP access and routing directly inside or forwarded from the cluster:

```bash
# Port-forward to local port 8080 (optional quick test)
kubectl port-forward service/craftcv-frontend 8080:80

# Verify health endpoint returns HTTP 200
curl -i http://localhost:8080/health

# Verify application responds
curl -I http://localhost:8080/
```
