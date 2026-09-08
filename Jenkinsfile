pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Downloading frontend repository...'
                checkout scm
            }
        }

        stage('Generate Environment') {
            steps {
                echo 'Injecting production environment variables...'
                sh '''
                    cat <<EOF > .env
VITE_API_URL=http://72.60.30.86:8081
VITE_DEV_URL=http://localhost:8081
VITE_IS_PRODUCTION=true
EOF
                '''
            }
        }

        stage('Build & Deploy') {
            steps {
                echo 'Building image and starting container...'
                sh 'docker compose up -d --build --remove-orphans'
            }
        }

        stage('Cleanup') {
            steps {
                echo 'Cleaning up residual images...'
                sh 'docker image prune -f'
            }
        }
    }

    post {
        success {
            echo 'Frontend deployed successfully!'
        }
        failure {
            echo 'Error in the frontend pipeline.'
        }
    }
}