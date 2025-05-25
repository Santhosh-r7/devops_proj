pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS = credentials('dockerhub-creds')
        FRONTEND_IMAGE = 'san789/dev-frontend:latest'
        BACKEND_IMAGE  = 'san789/dev-backend:latest'
        // Point to Minikube's Docker and kubeconfig
        DOCKER_TLS_VERIFY = '1'
        DOCKER_HOST = 'tcp://127.0.0.1:50523'  // use the correct port from `minikube docker-env`
        DOCKER_CERT_PATH = 'C:\\Users\\LENOVO\\.minikube\\certs'
        KUBECONFIG = 'C:\\Users\\LENOVO\\.kube\\config'
    }

    stages {
        stage('👋 Say Hello & Checkout') {
            steps {
                echo 'Hey there! Let’s grab the latest code and get started!'
                git branch: 'main', url: 'https://github.com/Santhosh-r7/devops_proj.git'
            }
        }

        stage('🐳 Docker Login') {
            steps {
                echo 'Logging into DockerHub like a pro...'
                bat 'echo %DOCKER_CREDENTIALS_PSW% | docker login -u %DOCKER_CREDENTIALS_USR% --password-stdin'
            }
        }

        stage('🚀 Build Frontend Image') {
            steps {
                dir('frontend') {
                    echo 'Building frontend Docker image...'
                    bat "docker build -t %FRONTEND_IMAGE% ."
                }
            }
        }

        stage('🚀 Build Backend Image') {
            steps {
                dir('backend') {
                    echo 'Backend image, you’re next!'
                    bat "docker build -t %BACKEND_IMAGE% ."
                }
            }
        }

        stage('📤 Push Images') {
            steps {
                echo 'Pushing images to DockerHub — bon voyage!'
                bat "docker push %FRONTEND_IMAGE%"
                bat "docker push %BACKEND_IMAGE%"
            }
        }

        stage('⚙ Start Minikube') {
    steps {
        echo 'Checking if Minikube is running...'
        bat '''
            IF NOT EXIST "%USERPROFILE%\\.minikube\\machines\\minikube" (
                minikube start --driver=docker --force
            ) ELSE (
                echo Minikube is already running. Skipping start.
            ) '''}}

        stage('🎉 Deploy to Kubernetes') {
            steps {
                echo 'Applying Kubernetes manifests with 3 replicas — scaling up!'
                bat 'kubectl apply -f k8s/frontend-deployment.yaml'
                bat 'kubectl apply -f k8s/backend-deployment.yaml'
                bat 'kubectl apply -f k8s/frontend-service.yaml'
                bat 'kubectl apply -f k8s/backend-service.yaml'
                //bat 'kubectl scale deployment frontend --replicas=3'
                //bat 'kubectl scale deployment backend --replicas=3'
            }
        }

        stage('🔍 Verify Pods') {
            steps {
                echo 'Let’s see those pods running...'
                bat 'kubectl get pods'
            }
        }
    }

    post {
        success {
            echo '🎊 Woohoo! Everything worked perfectly. Your app is live with 3 pods each!'
        }
        failure {
            echo '💥 Uh-oh, something went wrong. Time to debug!'
        }
    }
}
