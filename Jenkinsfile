pipeline {
    agent any

    environment {
        // Ortelius credentials & URLs
        DHURL = "http://98.86.106.66/" // atau IP Ortelius kamu, kalau domain belum resolve
        DHUSER = "admin"
        DHPASS = "admin"

        // Komponen & docker info (kalau tidak pakai docker, bisa dikosongkan)
        DOCKERREPO = "none"
        IMAGE_TAG = "1.0.${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'github-creds', url: 'https://github.com/koojennie/Submission-Belajar-Fundamental-Aplikasi-Web-Dengan-React.git'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Generate SBOM') {
            steps {
                echo "Generating SBOM using Syft..."
                sh '''
                curl -sSfL https://raw.githubusercontent.com/anchore/syft/main/install.sh | sh -s -- -b $PWD
                ./syft dir:. -o cyclonedx-json > cyclonedx.json
                '''
            }
        }

        stage('Prepare Ortelius Component File') {
            steps {
                writeFile file: 'component.toml', text: """
Application = "GLOBAL.CICD.ReactApp"
Application_Version = "1.0"

Name = "GLOBAL.CICD.ReactComponent"
Variant = "${env.BRANCH_NAME}"
Version = "v1.0.0.${env.BUILD_NUMBER}-${env.GIT_COMMIT.take(7)}"

[Attributes]
    DockerRepo = "${env.DOCKERREPO}"
    DockerTag = "${env.IMAGE_TAG}"
    ServiceOwner = "${env.DHUSER}"
    ServiceOwnerEmail = "togetherforever1404@gmail.com"
"""
            }
        }

        stage('Install Ortelius CLI') {
            steps {
                echo "Installing Ortelius CLI..."
                sh '''
                curl -L https://github.com/Ortelius/ortelius-cli/releases/latest/download/ortelius-linux-amd64.tar.gz -o dh.tar.gz
                tar -xvf dh.tar.gz
                chmod +x ortelius
                mv ortelius dh
                '''
            }
        }

        stage('Publish to Ortelius') {
            steps {
                echo "Publishing component and SBOM to Ortelius..."
                sh '''
                export DHURL=${DHURL}
                export DHUSER=${DHUSER}
                export DHPASS=${DHPASS}
                ./dh updatecomp --rsp component.toml --deppkg "cyclonedx@cyclonedx.json"
                '''
            }
        }
    }
}