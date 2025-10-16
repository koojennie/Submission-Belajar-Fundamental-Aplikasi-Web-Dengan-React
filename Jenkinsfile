pipeline {
    agent any

    environment {
        ORTELIUS_URL = "http://18.234.48.8/dmadminweb"
        ORTELIUS_USER = "admin"       // ganti user ortelius kamu
        ORTELIUS_PASS = "admin"    // ganti password ortelius kamu
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'github-creds', url: 'https://github.com/koojennie/Submission-Belajar-Fundamental-Aplikasi-Web-Dengan-React.git'
            }
        }

        stage('Build') {
            steps {
                echo "Building application..."
                sh 'echo Build success!'
            }
        }

        stage('Generate SBOM') {
            steps {
                echo "Generating SBOM..."
                sh 'syft . -o json > sbom.json || true' // contoh pakai Syft
            }
        }

        stage('Publish to Ortelius') {
            steps {
                echo "Sending SBOM to Ortelius..."
                httpRequest authentication: 'ortelius-creds',
                    httpMode: 'POST',
                    contentType: 'APPLICATION_JSON',
                    requestBody: readFile('sbom.json'),
                    url: "${ORTELIUS_URL}/api/catalog/component"
            }
        }
    }
}