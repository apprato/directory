# Directory
An online directory featuring a Category City, Suburb categorisation with pager, Listing Page with chained dropdown, Sign Up workflows, Listing Create/Edit page, User Login area, Change & Lost password. This is full-stack javascript web application written with React, Mongo, Node.js.

* React
* Mongo
* Node
* Meteor

## Development
```
meteor npm install
meteor npm start
```

#### Upgrade from Meteor 1.4 to 1.8
Removed    /*"chimp": "^0.41.2", */

## Staging

### Setup EC2 deploy node
Create Ubuntu EC2
```
git clone ssh://git@bitbucket.org/magescale/map_report.git
cd findatrainer
git fetch && git checkout master
cd ..
sh /bin/install.sh
npm install
```

### Deploy from local to staging / production
Run sb bin/deploy.sh for details
To deploy to staging see below:

```
cd .deploy
sh deploy.sh deployLocalToStaging
```

### Mup documentation for deployment
http://meteor-up.com/docs#docker-options