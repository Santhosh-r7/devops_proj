pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS = credentials('dockerhub-creds')
        FRONTEND_IMAGE = 'san789/dev-frontend:latest'
        BACKEND_IMAGE  = 'san789/dev-backend:latest'
        
    }

    stages {

        // stage('🚀 Build Frontend Image') {
        //     steps {
        //         dir('frontend') {
        //             echo 'Building frontend Docker image...'
        //             bat "docker build -t %FRONTEND_IMAGE% ."
        //         }
        //     }
        // }

        // stage('🚀 Build Backend Image') {
        //     steps {
        //         dir('backend') {
        //             echo 'Backend image, you’re next!'
        //             bat "docker build -t %BACKEND_IMAGE% ."
        //         }
        //     }
        // }

        // stage('📤 Push Images') {
        //     steps {
        //         echo 'Pushing images to DockerHub — bon voyage!'
        //         bat "docker push %FRONTEND_IMAGE%"
        //         bat "docker push %BACKEND_IMAGE%"
        //     }
        // }

    //     stage('⚙ Start Minikube') {
    // steps {
    //     echo 'Checking if Minikube is running...'
    //     bat '''
    //         IF NOT EXIST "%USERPROFILE%\\.minikube\\machines\\minikube" (
    //             minikube start --driver=docker --force
    //         ) ELSE (
    //             echo Minikube is already running. Skipping start.
    //         ) '''}}

        stage('🎉 Deploy to Kubernetes') {
            steps {
                echo 'Applying Kubernetes manifests with 3 replicas — scaling up!'
                bat 'kubectl apply -f ./k8s/ --validate=false'
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
