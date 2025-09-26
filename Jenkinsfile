pipeline {
    agent any

    tools {
        jdk 'JDK_HOME'
        maven 'MAVEN_HOME'
        nodejs 'NODE_HOME'
    }

    environment {
        // Docker images
        BACKEND_IMAGE  = 'freshcart-backend'
        FRONTEND_IMAGE = 'freshcart-frontend'

        // Docker Hub credentials
        DOCKERHUB_USER = 'mvarevathi-uname'
        DOCKERHUB_PASS = 'chinnu@2005'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/revathi40063/freshcart-fullstack.git'
            }
        }

        stage('Build React Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                // Backend Image
                bat 'docker build -t %BACKEND_IMAGE% ./backend'
                
                // Frontend Image
                bat 'docker build -t %FRONTEND_IMAGE% ./frontend'
            }
        }

        stage('Run Docker Containers') {
            steps {
                // Stop & remove old containers if exist
                bat 'docker stop %BACKEND_IMAGE% || exit 0'
                bat 'docker rm %BACKEND_IMAGE% || exit 0'
                bat 'docker stop %FRONTEND_IMAGE% || exit 0'
                bat 'docker rm %FRONTEND_IMAGE% || exit 0'

                // Run containers with dynamic ports
                bat 'docker run -d -P --name %BACKEND_IMAGE% %BACKEND_IMAGE%'
                bat 'docker run -d -P --name %FRONTEND_IMAGE% %FRONTEND_IMAGE%'
            }
        }

        stage('Test Containers') {
            steps {
                script {
                    // Get the mapped backend port
                    def backendPort = bat(script: 'docker port %BACKEND_IMAGE% 5000', returnStdout: true).trim()
                    echo "Backend is running at http://localhost:${backendPort}"

                    // Get the mapped frontend port
                    def frontendPort = bat(script: 'docker port %FRONTEND_IMAGE% 80', returnStdout: true).trim()
                    echo "Frontend is running at http://localhost:${frontendPort}"

                    // Simple health check
                    bat "curl http://localhost:${backendPort}/api/health"
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                // Login to Docker Hub
                bat "docker login -u %DOCKERHUB_USER% -p %DOCKERHUB_PASS%"

                // Tag and push backend
                bat "docker tag %BACKEND_IMAGE% %DOCKERHUB_USER%/%BACKEND_IMAGE%:latest"
                bat "docker push %DOCKERHUB_USER%/%BACKEND_IMAGE%:latest"

                // Tag and push frontend
                bat "docker tag %FRONTEND_IMAGE% %DOCKERHUB_USER%/%FRONTEND_IMAGE%:latest"
                bat "docker push %DOCKERHUB_USER%/%FRONTEND_IMAGE%:latest"
            }
        }
    }

    post {
        always {
            echo 'Cleaning up containers...'
            bat 'docker stop %BACKEND_IMAGE% || exit 0'
            bat 'docker rm %BACKEND_IMAGE% || exit 0'
            bat 'docker stop %FRONTEND_IMAGE% || exit 0'
            bat 'docker rm %FRONTEND_IMAGE% || exit 0'
        }
    }
}
