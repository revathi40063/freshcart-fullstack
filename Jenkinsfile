pipeline {
    agent any

    environment {
        // Docker Compose project name
        DOCKER_COMPOSE_PROJECT = 'freshcart'

        // Docker Hub credentials (optional if pushing images)
        DOCKERHUB_CREDENTIALS = 'dockerhub-id' 
        DOCKERHUB_USERNAME = 'your_dockerhub_username'
        DOCKERHUB_REPO = 'revathi/freshcart'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/revathi40063/freshcart-fullstack.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    // Build images using docker-compose
                    sh 'docker-compose -f docker-compose.yml build'
                }
            }
        }

        stage('Run Docker Containers') {
            steps {
                script {
                    // Start containers in detached mode
                    sh 'docker-compose -f docker-compose.yml up -d'
                }
            }
        }

        stage('Test Containers') {
            steps {
                script {
                    // Optional: check if containers are running
                    sh 'docker ps'
                }
            }
        }

        stage('Push Images to Docker Hub') {
            when {
                expression { false } // Change to true if you want to push images
            }
            steps {
                script {
                    docker.withRegistry('', DOCKERHUB_CREDENTIALS) {
                        sh "docker tag freshcart-backend ${DOCKERHUB_USERNAME}/freshcart-backend:latest"
                        sh "docker push ${DOCKERHUB_USERNAME}/freshcart-backend:latest"

                        sh "docker tag freshcart-frontend ${DOCKERHUB_USERNAME}/freshcart-frontend:latest"
                        sh "docker push ${DOCKERHUB_USERNAME}/freshcart-frontend:latest"
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up any exited containers'
            sh 'docker-compose -f docker-compose.yml down'
        }
    }
}
