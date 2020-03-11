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
    }
  }
}
