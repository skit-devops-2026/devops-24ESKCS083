pipeline {
    // Define the execution environment for the pipeline.
    // Using a Docker agent runs all stages inside an isolated container with Node.js 24.
    // This ensures consistency across environments without requiring Node.js to be installed directly on the host.
    agent {
        docker {
            image 'node:24'
        }
    }

    stages {
        // Stage 1: Install dependencies
        // Executes 'make install' (runs 'cd Frontend && npm install') to download and set up all required packages.
        stage('Install') {
            steps {
                sh 'make install'
            }
        }

        // Stage 2: Run tests and quality checks
        // Executes 'make test' (runs 'cd Frontend && npm run lint') to catch syntax and styling issues.
        // If this step fails with a non-zero exit code, Jenkins halts the pipeline and marks the build as failed.
        stage('Test') {
            steps {
                sh 'make test'
            }
        }

        // Stage 3: Compile and build production assets
        // Executes 'make build' (runs 'cd Frontend && npm run build') to create the production-ready distribution bundle.
        stage('Build') {
            steps {
                sh 'make build'
            }
        }
    }
}
