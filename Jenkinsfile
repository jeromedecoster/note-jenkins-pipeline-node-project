pipeline {
  agent any
  
  tools {
    nodejs "node-v12"
  }
  
  stages {
    stage("Test") {
      steps {
        sh "npm install"
        sh "npm test"
      }
      post {
        success {
          slackSend color: 'good', message: "${currentBuild.fullDisplayName}: stage(Test) *success*"
        }
        failure { 
          slackSend color: 'danger', message: "${currentBuild.fullDisplayName}: stage(Test) *failure*"
        }
      }
    }
  }
}
