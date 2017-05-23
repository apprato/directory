# findatrainer

## Development
meteor npm install
meteor npm start

### Npm modules
This should be in package.json i think.
meteor add email
meteor add meteorhacks:ssr
meteor add ajduke:bootstrap-tagsinput # typeahead: enabled
meteor add bootstrp:tagsinput

## Staging
TBC

### Setup EC2 deploy node
Create Ubuntu EC2
git clone ssh://git@bitbucket.org/magescale/map_report.git
cd findatrainer
git fetch && git checkout master
cd ..
sh /bin/install.sh
npm install

### Deploy from EC2 deploy node to staging - see bin/deploy.sh for details

mup setup
mup deploy
mup start
cd /home/ubuntu/f indatrainer/.deploy


## Production
....

