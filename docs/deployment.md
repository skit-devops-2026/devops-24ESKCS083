# Deployment Screenshots — CraftCV

This directory stores deployment evidence required for milestone M6.

## Live Deployment

**Live URL:** https://craftcv-1cjq.onrender.com

The CraftCV frontend is deployed as a Docker container on **Render** (free tier), served via Nginx inside the image pulled from GitHub Container Registry (GHCR).

### Deployment details

| Item | Value |
|------|-------|
| Platform | Render (Web Service, Free tier) |
| Image | `ghcr.io/skit-devops-2026/devops-24eskcs083:latest` |
| Registry | GitHub Container Registry (GHCR) |
| Port | 80 (Nginx) |
| Live URL | https://craftcv-1cjq.onrender.com |

### CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci.yml`) automatically:
1. Builds and lints the React frontend
2. Packages it into a multi-stage Docker image (Node 24 → Nginx Alpine)
3. Pushes the image to GHCR tagged with `latest` and the commit SHA
4. Triggers a Render redeploy via the `RENDER_DEPLOY_HOOK_URL` secret

### GHCR Image

The image is published at:
`https://github.com/skit-devops-2026/devops-24ESKCS083/pkgs/container/devops-24eskcs083`

## Deployment Screenshot

> Take a screenshot of https://craftcv-1cjq.onrender.com in your browser
> and save it as `docs/deployment-screenshot.png`, then commit and push.
