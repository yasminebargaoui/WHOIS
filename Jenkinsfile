pipeline{
    agent{
        label "jenkins-agent"
    }
    tools {
        jdk 'Java17'
        maven 'Maven3'
    }
      environment {
        APP_NAME = "WHOIS"
        RELEASE = "1.0.0"
        DOCKER_USER = "yasminenargaoui"
        DOCKER_PASS = 'Yasmouna2020'
        IMAGE_NAME = "${DOCKER_USER}" + "/" + "${APP_NAME}"
        IMAGE_TAG = "${RELEASE}-${BUILD_NUMBER}"
        JENKINS_API_TOKEN = credentials("JENKINS_API_TOKEN")

    }

        stages{
        stage("Cleanup Workspace"){
            steps {
                cleanWs()
            }

        }
    
        stage("Checkout from SCM"){
            steps {
                git branch: 'master', credentialsId: 'github', url: 'https://github.com/yasminebargaoui/WHOIS'

        }

        }
          stage("build"){
            steps {
              //  bat "mvn clean package"
              echo 'building'
            }

        }
    
        stage("test "){
            steps {
             //   bat "mvn test" 
             echo 'testing'
        }

        }
             stage("build & push docker "){
            steps {
             //   bat "mvn test" 
             docker.withRegistry('',DOCKER_PASS){
                docker_image= docker.build "${IMAGE_NAME}"
             }
             docker.withRegistry('',DOCKER_PASS){
                docker_image.push("${IMAGE_TAG}")
                        docker_image.push('latest')
             }
        }

        }
        }
}