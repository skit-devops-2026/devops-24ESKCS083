# Deployment Screenshots — CraftCV

This directory stores deployment evidence required for milestone M6.

## deployment-screenshot.md

> **Note:** Replace the placeholder below with an actual screenshot after running the live deployment.

### Live deployment on Render / Railway / Fly.io

The CraftCV frontend is deployed as a Docker container and accessible at the live URL listed in the root `README.md`.

**Steps to capture the deployment screenshot:**
1. Open the live URL in a browser
2. Take a screenshot showing the running app and the URL bar
3. Save as `docs/deployment-screenshot.png`
4. Commit and push

### CI/CD pipeline — Docker build & push

The GitHub Actions workflow (`.github/workflows/ci.yml`) automatically:
1. Builds the React frontend
2. Packages it into a multi-stage Docker image
3. Pushes the image to GitHub Container Registry (`ghcr.io/skit-devops-2026/devops-24eskcs083:latest`)

The image is publicly visible at:  
`https://github.com/skit-devops-2026/devops-24ESKCS083/pkgs/container/devops-24eskcs083`
