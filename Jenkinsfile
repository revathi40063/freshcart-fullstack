pipeline {
    agent any

    tools {
        jdk 'JDK_HOME'
        maven 'MAVEN_HOME'
        nodejs 'NODE_HOME'
    }

    environment {
        BACKEND_DIR = 'backend'
        FRONTEND_DIR = 'frontend'

        BACKEND_IMAGE = 'freshcart-backend'
        FRONTEND_IMAGE = 'freshcart-frontend'

        # Host ports (can be different if 3000/5000 busy)
        BACKEND_HOST_PORT = '5001'
        FRONTEND_HOST_PORT = '3001'
    }

    stages {
        stage('Checkout SCM') {
            steps {
                git branch: 'main', url: 'https://github.com/revathi40063/freshcart-fullstack.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                dir("${BACKEND_DIR}") {
                    bat 'docker build -t %BACKEND_IMAGE% .'
                }
                dir("${FRONTEND_DIR}") {
                    bat 'docker build -t %FRONTEND_IMAGE% .'
                }
            }
        }

        stage('Run Docker Containers') {
            steps {
                // Stop & remove old containers if they exist
                bat "docker stop %BACKEND_IMAGE% || exit 0"
                bat "docker rm %BACKEND_IMAGE% || exit 0"
                bat "docker stop %FRONTEND_IMAGE% || exit 0"
                bat "docker rm %FRONTEND_IMAGE% || exit 0"

                // Run containers: backend 5000, frontend 3000
                bat "docker run -d -p %BACKEND_HOST_PORT%:5000 --name %BACKEND_IMAGE% %BACKEND_IMAGE%"
                bat "docker run -d -p %FRONTEND_HOST_PORT%:3000 --name %FRONTEND_IMAGE% %FRONTEND_IMAGE%"
            }
        }

        stage('Test Containers') {
            steps {
                echo "Add API/HTTP tests here"
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'DOCKER_HUB_CRED',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS')]) {
                    bat "docker login -u %DOCKER_USER% -p %DOCKER_PASS%"
                    bat "docker tag %BACKEND_IMAGE% %DOCKER_USER%/%BACKEND_IMAGE%:latest"
                    bat "docker push %DOCKER_USER%/%BACKEND_IMAGE%:latest"
                    bat "docker tag %FRONTEND_IMAGE% %DOCKER_USER%/%FRONTEND_IMAGE%:latest"
                    bat "docker push %DOCKER_USER%/%FRONTEND_IMAGE%:latest"
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished!'
        }
    }
}
