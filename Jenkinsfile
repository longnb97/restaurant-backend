pipeline {
    agent any

    stages {
        stage('Start') {
            steps {
                echo "Starting build"
                echo "Building...."
            }
        }
        stage("Git pull"){
            steps {
                sh "cd /var/www/workspace/web"
                sh "git clone https://github.com/longnb97/restaurant-backend.git"
            }
        }
        stage('End') {
            steps {
                echo "End build"
            }
        }
    }
}
