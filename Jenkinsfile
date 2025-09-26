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

        BACKEND_HOST_PORT = '5001'   // use 5001 if 5000 is busy
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
                dir("${env.BACKEND_DIR}") {
                    bat "docker build -t ${env.BACKEND_IMAGE} ."
                }
                dir("${env.FRONTEND_DIR}") {
                    bat "docker build -t ${env.FRONTEND_IMAGE} ."
                }
            }
        }

        stage('Run Docker Containers') {
            steps {
                bat "docker stop ${env.BACKEND_IMAGE} || exit 0"
                bat "docker rm ${env.BACKEND_IMAGE} || exit 0"
                bat "docker stop ${env.FRONTEND_IMAGE} || exit 0"
                bat "docker rm ${env.FRONTEND_IMAGE} || exit 0"

                bat "docker run -d -p ${env.BACKEND_HOST_PORT}:5000 --name ${env.BACKEND_IMAGE} ${env.BACKEND_IMAGE}"
                bat "docker run -d -p ${env.FRONTEND_HOST_PORT}:3000 --name ${env.FRONTEND_IMAGE} ${env.FRONTEND_IMAGE}"
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
                    bat "docker tag ${env.BACKEND_IMAGE} %DOCKER_USER%/${env.BACKEND_IMAGE}:latest"
                    bat "docker push %DOCKER_USER%/${env.BACKEND_IMAGE}:latest"
                    bat "docker tag ${env.FRONTEND_IMAGE} %DOCKER_USER%/${env.FRONTEND_IMAGE}:latest"
                    bat "docker push %DOCKER_USER%/${env.FRONTEND_IMAGE}:latest"
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
