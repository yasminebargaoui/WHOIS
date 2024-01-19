pipeline{
    agent{
        label "jenkins-agent"
    }
   
      environment {
        APP_NAME = "WHOIS"
        RELEASE = "1.0.0"
        DOCKER_USER = "yasminebargaoui"
        DOCKER_PASS = "dockerhub"
        IMAGE_NAME = "${DOCKER_USER}" + "/" + "${APP_NAME}"
        IMAGE_TAG = "${RELEASE}-${BUILD_NUMBER}"
        JENKINS_API_TOKEN =credentials("JENKINS_API_TOKEN")

    }
     tools {
        jdk 'Java17'
        maven 'Maven3'
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
                script{
            //   bat "mvn test" 
             docker.withRegistry('',DOCKER_PASS){
                docker_image= docker.build "${IMAGE_NAME}"
             }
             docker.withRegistry('',DOCKER_PASS){
                docker_image.push("${IMAGE_TAG}")
                        docker_image.push('latest')
                         docker.withRegistry('', 'DOCKER_PASS') {
                        def customImage = docker.build("$IMAGE_NAME")

                        // Push the container to the custom Registry */
                       customImage.push()
                         }
             }
                }
            }
           

}
             }
        }
            