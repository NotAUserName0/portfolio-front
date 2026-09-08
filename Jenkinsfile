pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Generate Environment') {
            steps {
                echo 'Generating environment file...'
                sh '''
                    cat <<EOF > .env
VITE_API_URL=http://72.60.30.86:8081
VITE_DEV_URL=http://localhost:8081
VITE_IS_PRODUCTION=true
EOF
                '''
            }
        }

        stage('Lint') {
            steps {
                echo 'Running linter...'
                sh 'docker run --rm -v $(pwd):/app -w /app node:20-alpine sh -c "npm ci && npm run lint --if-present"'
            }
        }

        stage('Build & Deploy') {
            steps {
                echo 'Building image with Vite + Nginx and deploying...'
                sh 'docker compose up -d --build --remove-orphans'
            }
        }

        stage('Cleanup') {
            steps {
                sh 'docker image prune -f'
            }
        }
    }
}