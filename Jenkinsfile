pipeline {
  agent any
  
  stages {
    stage('Test') {
      slackSend color: 'good', message: 'Test then *Jenkinsfile*'
    }
  }
}
