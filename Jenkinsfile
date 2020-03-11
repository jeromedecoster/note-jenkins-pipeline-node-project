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
          sh '''#!/bin/bash
            LAST_LOG=$(git log --format='%H' --max-count=1 origin/master)
            echo "LAST_LOG:$LAST_LOG"
            LAST_MERGE=$(git log --format='%H' --merges --max-count=1 origin/master)
            echo "LAST_MERGE:$LAST_MERGE"
            LAST_MSG=$(git log --format='%s' --max-count=1 origin/master)
            echo "LAST_MSG:$LAST_MSG"
            VERSION=$(echo $LAST_MSG | grep --only-matching 'v\\?[0-9]\\+\\.[0-9]\\+\\(\\.[0-9]\\+\\)\\?')
            echo "VERSION:$VERSION"
            
            if [[ $LAST_LOG == $LAST_MERGE && -n $VERSION ]]
            then
                DATA='{
                    "tag_name": "'$VERSION'",
                    "target_commitish": "master",
                    "name": "'$VERSION'",
                    "body": "'$LAST_MSG'",
                    "draft": false,
                    "prerelease": false
                }'

                curl --data "$DATA" "https://api.github.com/repos/$REPO/releases?access_token=$TOKEN"
            fi
            '''
        }
      }
    }
  }
}
