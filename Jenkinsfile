pipeline{
    agent{
        label "jenkins-agent"
    }
   
      environment {
        APP_NAME = "WHOIS"
        RELEASE = "1.0.0"
        DOCKER_USER = "yasminebargaoui"
        DOCKER_PASS = "z23FWSa9.+R&yc4"
        IMAGE_NAME = "${DOCKER_USER}" + "/" + "${APP_NAME}"
        IMAGE_TAG = "${RELEASE}-${BUILD_NUMBER}"
        JENKINS_API_TOKEN ="11953212cf01b50628cfa90aa30c868ba8"

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

/*             stage("build & push docker "){
            steps {
                script{
            //   bat "mvn test" 
            /* docker.withRegistry('',DOCKER_PASS){
                docker_image= docker.build "${IMAGE_NAME}"
             }
             docker.withRegistry('',DOCKER_PASS){
                docker_image.push("${IMAGE_TAG}")
                        docker_image.push('latest')*/
                       /*  docker.withRegistry('https://registry.hub.docker.com', 'DOCKER_PASS') {
                        def customImage = docker.build("$IMAGE_NAME")

                        /* Push the container to the custom Registry */
                      //  customImage.push()
                      stage('Build') {
steps {
script{
     git 'https://github.com/yasminebargaoui/WHOIS'
     sh 'docker build -t my-image:${BUILD_NUMBER} .'
}
}
                      }
stage('Push') {
steps {
    script{
withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
sh 'docker login -u $DOCKER_USER -p $DOCKER_PASS'
sh 'docker push my-image:${BUILD_NUMBER}'
}
}
}
}
             }
        }
            