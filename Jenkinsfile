pipeline {
    agent any

    environment {
        ORTELIUS_URL = "http://18.234.48.8"
        ORTELIUS_USER = "admin"
        ORTELIUS_PASS = "admin"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'github-creds',
                    url: 'https://github.com/koojennie/Submission-Belajar-Fundamental-Aplikasi-Web-Dengan-React.git'
            }
        }

        stage('Build React App') {
            steps {
                sh '''
                    npm install
                    npm run build
                '''
            }
        }

        stage('Generate SBOM') {
            steps {
                echo "Generating SBOM..."
                sh 'syft . -o json > sbom.json || true'
            }
        }

        stage('Publish to Ortelius') {
            steps {
                echo "Sending SBOM to Ortelius..."
                script {
                    def payload = [
                        name: "my-react-app",
                        version: "1.0.0-${env.BUILD_NUMBER}",
                        sbom: readFile('sbom.json')
                    ]
                    httpRequest authentication: 'ortelius-creds',
                        httpMode: 'POST',
                        contentType: 'APPLICATION_JSON',
                        requestBody: groovy.json.JsonOutput.toJson(payload),
                        url: "${ORTELIUS_URL}/msapi/component"
                }
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying React build to Nginx..."
                sh 'sudo cp -r build/* /var/www/html/'
            }
        }
    }

    post {
        success {
            archiveArtifacts artifacts: 'build/**', fingerprint: true
        }
    }
}