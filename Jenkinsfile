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

        BACKEND_PORT = '5001'
        FRONTEND_PORT = '3000'
    }

    stages {
        stage('Checkout SCM') {
            steps {
                git branch: 'main', url: 'https://github.com/revathi40063/freshcart-fullstack.git'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir("${BACKEND_DIR}") {
                    bat 'docker build -t %BACKEND_IMAGE% .'
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir("${FRONTEND_DIR}") {
                    bat 'docker build -t %FRONTEND_IMAGE% .'
                }
            }
        }

        stage('Run Docker Containers') {
    steps {
        // Stop & remove old containers
        bat "docker stop ${env.BACKEND_IMAGE} || exit 0"
        bat "docker rm ${env.BACKEND_IMAGE} || exit 0"
        bat "docker stop ${env.FRONTEND_IMAGE} || exit 0"
        bat "docker rm ${env.FRONTEND_IMAGE} || exit 0"

        // Run containers with mapped ports
        bat "docker run -d -p ${env.BACKEND_PORT}:${env.BACKEND_PORT} --name ${env.BACKEND_IMAGE} ${env.BACKEND_IMAGE}"
        bat "docker run -d -p ${env.FRONTEND_PORT}:${env.FRONTEND_PORT} --name ${env.FRONTEND_IMAGE} ${env.FRONTEND_IMAGE}"
    }
}


        stage('Test Containers') {
            steps {
                echo "You can add your API/HTTP test scripts here to verify containers"
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
