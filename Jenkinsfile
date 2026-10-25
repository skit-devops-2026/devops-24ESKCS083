// ---------------------------------------------------------------------------
// Jenkinsfile — CraftCV CI/CD Pipeline
// Declarative Pipeline for building, testing, and publishing the CraftCV
// frontend Docker image to GitHub Container Registry (GHCR).
//
// Prerequisites (configure in Jenkins before running):
//   - Node.js 24 installation named "node-24" (Manage Jenkins → Tools)
//   - Docker available on the Jenkins agent
//   - GitHub credentials stored as a Jenkins secret:
//       ID: ghcr-credentials  (Username = GitHub username, Password = PAT with write:packages)
// ---------------------------------------------------------------------------

pipeline {
    agent any

    // ---------------------------------------------------------------------------
    // Tool bindings — Jenkins will set up the PATH for each stage automatically
    // ---------------------------------------------------------------------------
    tools {
        nodejs 'node-24'
    }

    // ---------------------------------------------------------------------------
    // Pipeline-wide environment variables
    // ---------------------------------------------------------------------------
    environment {
        // GitHub Container Registry image name (lowercase required by OCI spec)
        IMAGE_NAME = 'ghcr.io/skit-devops-2026/devops-24eskcs083'
        // Tag the image with both the Jenkins build number and latest
        IMAGE_TAG  = "${env.BUILD_NUMBER}"
    }

    // ---------------------------------------------------------------------------
    // Stages
    // ---------------------------------------------------------------------------
    stages {

        // Stage 1: Check out source code from the SCM configured on this job
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // Stage 2: Install npm dependencies using the lockfile for reproducibility
        stage('Install') {
            steps {
                dir('Frontend') {
                    sh 'npm ci'
                }
            }
        }

        // Stage 3: Run lint (oxlint) and the Vitest unit-test suite
        stage('Test') {
            steps {
                dir('Frontend') {
                    // Lint — fails the build on any lint error
                    sh 'npm run lint'
                    // Unit tests — fails the build if any test fails
                    sh 'npm test'
                }
            }
        }

        // Stage 4: Compile the production bundle with Vite
        stage('Build') {
            steps {
                dir('Frontend') {
                    sh 'npm run build'
                }
            }
        }

        // Stage 5: Build the multi-stage Docker image (only on main branch)
        stage('Docker Build') {
            when {
                branch 'main'
            }
            steps {
                sh """
                    docker build \
                        -t ${IMAGE_NAME}:${IMAGE_TAG} \
                        -t ${IMAGE_NAME}:latest \
                        .
                """
            }
        }

        // Stage 6: Push the image to GitHub Container Registry (only on main branch)
        stage('Docker Push') {
            when {
                branch 'main'
            }
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'ghcr-credentials',
                    usernameVariable: 'GHCR_USER',
                    passwordVariable: 'GHCR_TOKEN'
                )]) {
                    sh """
                        echo "\${GHCR_TOKEN}" | docker login ghcr.io \
                            -u "\${GHCR_USER}" \
                            --password-stdin
                        docker push ${IMAGE_NAME}:${IMAGE_TAG}
                        docker push ${IMAGE_NAME}:latest
                        docker logout ghcr.io
                    """
                }
            }
        }

    }

    // ---------------------------------------------------------------------------
    // Post-build actions
    // ---------------------------------------------------------------------------
    post {
        always {
            // Clean the workspace after every run to avoid stale build artefacts
            cleanWs()
        }
        success {
            echo "Pipeline succeeded — image ${IMAGE_NAME}:${IMAGE_TAG} is ready."
        }
        failure {
            echo "Pipeline failed — check the stage logs above for details."
        }
    }
}
