pipeline {
  agent any
  
  stages {
    stage('Test') {
      steps {
        slackSend color: 'good', message: 'Test then *Jenkinsfile*'
      }
    }
  }
}
