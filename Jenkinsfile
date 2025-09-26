pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'your-dockerhub-username'
        DOCKERHUB_PASS = 'your-dockerhub-password'
        BACKEND_IMAGE = 'freshcart-backend'
        FRONTEND_IMAGE = 'freshcart-frontend'
    }

    stages {
        stage('Checkout SCM') {
            steps {
                git branch: 'main', url: 'https://github.com/revathi40063/freshcart-fullstack.git'
            }
        }

        stage('Clone Repository') {
            steps {
                echo 'Repository cloned successfully.'
            }
        }

        stage('Build Docker Images') {
            steps {
                bat 'docker build -t %BACKEND_IMAGE% ./backend'
                bat 'docker build -t %FRONTEND_IMAGE% ./frontend'
            }
        }

        stage('Run Docker Containers') {
            steps {
                bat 'docker run -d -p 5000:5000 --name freshcart-backend %BACKEND_IMAGE%'
                bat 'docker run -d -p 3000:3000 --name freshcart-frontend %FRONTEND_IMAGE%'
            }
        }

        stage('Test Containers') {
            steps {
                bat 'docker ps'
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    bat 'docker login -u %USER% -p %PASS%'
                    bat 'docker tag %BACKEND_IMAGE% %USER%/%BACKEND_IMAGE%'
                    bat 'docker tag %FRONTEND_IMAGE% %USER%/%FRONTEND_IMAGE%'
                    bat 'docker push %USER%/%BACKEND_IMAGE%'
                    bat 'docker push %USER%/%FRONTEND_IMAGE%'
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up containers...'
            bat 'docker stop freshcart-backend || echo "Backend not running"'
            bat 'docker stop freshcart-frontend || echo "Frontend not running"'
            bat 'docker rm freshcart-backend || echo "Backend container not found"'
            bat 'docker rm freshcart-frontend || echo "Frontend container not found"'
        }
    }
}
