# findatrainer

Originally Meteor 1.4, Node 4.6
Current Meteor 1.8, Node 8.11

## Development
meteor npm install
meteor npm start

#### Upgrade from Meteor 1.4 to 1.8
Removed    /*"chimp": "^0.41.2", */

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

