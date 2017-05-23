#!/usr/bin/php
# Agquote Deploy: Install mup & libraries and deploy to staging, production
# Description: Install Ubuntu EC2 with necessary libraries
#              Deploy to staging
#              Deploy to production

#INSTALLDIR=`echo $0 | sed 's/deploy\.sh//g'`
#if [ "$2" = "local" ] ;
#then
#
#elif [ "$2" = "prod" ] ;
#then
#
#elif [ "$2" = "other" ]
#then
#
#else
#    echo "You need to choose an environment setting" ;
#fi
#CRON=emarsys.php

installDeployLibraries () {
  sudo apt-get update
  sudo apt-get install python-software-properties
  sudo apt-get install npm
  curl https://raw.githubusercontent.com/creationix/nvm/v0.11.1/install.sh | bash
  nvm install 4.4.7
  nvm use 4.4.7
  sudo apt-get install awscli
  sudo npm install -g mupx
  sudo npm install -g mupx-letsencrypt
  sudo npm install mup
  curl https://install.meteor.com | /bin/sh
  sudo ln -s /usr/bin/nodejs /usr/bin/node
}

setupStaging() {
  cd /home/ubuntu/findatrainer/.deploy
  mup --config mup.js --settings settings-staging.json  setup
  mup --config mup.js --settings settings-staging.json deploy
}

deployStaging() {
  cd /home/ubuntu/findatrainer/.deploy
  mup --config mup.js --settings settings-staging.json deploy
}

case "$1" in
  installDeployLibraries)
    echo 'Installing Mup'
    installDeployLibraries
    echo 'Finishing Installing Mup'
    ;;
  setupStaging)
    echo 'Setup Staging'
    setupStaging
    echo 'Finished Setting up staging'
    ;;
  deployStaging)
    echo 'Deploy to Staging'
    deployStaging
    echo 'Finished deploying to staging'
    ;;
  *)


echo "
SYNOPSIS
    sh deploy.sh
    sh deploy.sh [-- [OPTIONS...]]
DESCRIPTION
    Findatrainer Deploy Script

OPTIONS
    installDeployLibraries staging | production   -  Installs Deployment app and libraries
    setupStaging staging | production
    deployStaging

EXAMPLES
sh bin/deploy.sh staging install installDeployLibraries
cd /home/ubuntu/findatrainer/.deploy
-> Setup Stagin
sh /home/ubuntu/findatrainer/bin/deploy.sh setupStaging
-> Deploy Staging
sh /home/ubuntu/findatrainer/bin/deploy.sh deployStaging

NOTES
With installing sometimes it gets stuck on the target
If so start again on the host:
docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q)
sudo rm -Rf /opt/findatrainer/ /opt/mongodb/
"
    >&2
    exit 1
    ;;
esac
