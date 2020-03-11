pipeline {
  agent any
  
  environment {
    REPO = "jeromedecoster/note-jenkins-pipeline-node-project"
  }
  
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
    stage('Release') {
      steps {
        withCredentials([string(credentialsId: 'github-token ', variable: 'TOKEN')]) {
          sh "git branch"
          sh "git branch -a"
          sh "git log --format='%H' --max-count=1 master"
        }
      }
    }
  }
}
