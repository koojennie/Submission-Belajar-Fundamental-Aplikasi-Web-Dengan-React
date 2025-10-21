pipeline {
    agent any

    environment {
        // Ortelius credentials & URLs
        DHURL = "http://54.87.139.161/" // IP EC2 Ortelius
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

        stage('Set Git Vars') {
            steps {
                script {
                    env.GIT_COMMIT = sh(script: "git rev-parse HEAD", returnStdout: true).trim()
                    env.SHORT_SHA = env.GIT_COMMIT.take(7)
                    env.GIT_BRANCH = sh(script: "git rev-parse --abbrev-ref HEAD", returnStdout: true).trim()
                    env.GIT_URL = "https://github.com/koojennie/Submission-Belajar-Fundamental-Aplikasi-Web-Dengan-React"
                    env.GIT_REPO = "Submission-Belajar-Fundamental-Aplikasi-Web-Dengan-React"
                }
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
                echo "Generating CycloneDX SBOM (v1.4 compatible)..."
                sh '''
                curl -sSfL https://raw.githubusercontent.com/anchore/syft/main/install.sh | sh -s -- -b $PWD
                ./syft dir:. --scope all-layers -o cyclonedx-json@1.4 > cyclonedx.json
                echo "SBOM generated with CycloneDX 1.4"
                ls -lh cyclonedx.json
                head -20 cyclonedx.json
                '''
            }
        }

        stage('Prepare Ortelius Component File') {
            steps {
                writeFile file: 'component.toml', text: """
Application = "GLOBAL.CICD.ReactApp"
Application_Version = "1.0.0"

Name = "GLOBAL.CICD.ReactWebApp"
Variant = "${env.GIT_BRANCH}"
Version = "v1.0.0.${env.BUILD_NUMBER}-g${env.SHORT_SHA}"

[Attributes]
    GitRepo = "${env.GIT_URL}"
    GitCommit = "${env.GIT_COMMIT}"
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