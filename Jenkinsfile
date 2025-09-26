pipeline {
    agent any

    tools {
        // Add your tool names configured in Jenkins
        jdk 'JDK_HOME'
        maven 'MAVEN_HOME'
        nodejs 'NODE_HOME'
    }

    environment {
        BACKEND_IMAGE = 'freshcart-backend'
        FRONTEND_IMAGE = 'freshcart-frontend'
        DOCKERHUB_CREDENTIALS = 'docker-hub' // Jenkins credentials ID
        BACKEND_PORT = '5000'
        FRONTEND_PORT = '3000'
    }

    stages {
        stage('Checkout SCM') {
            steps {
                git branch: 'main', url: 'https://github.com/revathi40063/freshcart-fullstack.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    // Backend Docker build
                    bat "docker build -t ${env.BACKEND_IMAGE} ./backend"

                    // Frontend Docker build
                    bat "docker build -t ${env.FRONTEND_IMAGE} ./frontend"
                }
            }
        }

        stage('Run Docker Containers') {
            steps {
                script {
                    // Stop & remove old containers if running
                    bat "docker stop ${env.BACKEND_IMAGE} || exit 0"
                    bat "docker rm ${env.BACKEND_IMAGE} || exit 0"
                    bat "docker stop ${env.FRONTEND_IMAGE} || exit 0"
                    bat "docker rm ${env.FRONTEND_IMAGE} || exit 0"

                    // Run containers
                    bat "docker run -d -p ${env.BACKEND_PORT}:${env.BACKEND_PORT} --name ${env.BACKEND_IMAGE} ${env.BACKEND_IMAGE}"
                    bat "docker run -d -p ${env.FRONTEND_PORT}:${env.FRONTEND_PORT} --name ${env.FRONTEND_IMAGE} ${env.FRONTEND_IMAGE}"
                }
            }
        }

        stage('Test Containers') {
            steps {
                script {
                    // Wait for backend to start
                    bat "timeout /t 10"
                    bat "curl -f http://localhost:${env.BACKEND_PORT}/ || exit 1"

                    // Wait for frontend to start
                    bat "timeout /t 5"
                    bat "curl -f http://localhost:${env.FRONTEND_PORT}/ || exit 1"
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                script {
                    // Login and push
                    docker.withRegistry('https://index.docker.io/v1/', "${env.DOCKERHUB_CREDENTIALS}") {
                        bat "docker tag ${env.BACKEND_IMAGE} your-dockerhub-username/${env.BACKEND_IMAGE}:latest"
                        bat "docker push your-dockerhub-username/${env.BACKEND_IMAGE}:latest"

                        bat "docker tag ${env.FRONTEND_IMAGE} your-dockerhub-username/${env.FRONTEND_IMAGE}:latest"
                        bat "docker push your-dockerhub-username/${env.FRONTEND_IMAGE}:latest"
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up old containers...'
            bat "docker stop ${env.BACKEND_IMAGE} || exit 0"
            bat "docker rm ${env.BACKEND_IMAGE} || exit 0"
            bat "docker stop ${env.FRONTEND_IMAGE} || exit 0"
            bat "docker rm ${env.FRONTEND_IMAGE} || exit 0"
        }
        success {
            echo 'CI/CD Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs.'
        }
    }
}
