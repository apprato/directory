module.exports = {
  servers: {
    one: {
      host: '149.28.183.167',
      username: "healthfitness",
      // pem:
      password: "nCZ2OHOK3kcppVtTue7Qu8Qc6j0=",
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'healthfitness',
    path: '../',

    servers: {
      one: {},
    },

    buildOptions: {
      debug: true,
      serverOnly: true,
    },

    env: {
      ROOT_URL: 'http://healthfitness.com.au',
      MONGO_URL: 'mongodb://localhost/meteor',
    },
    // change to 'kadirahq/meteord' if your app is not using Meteor 1.4
    dockerImage: 'zodern/meteor:root',
    deployCheckWaitTime: 600,

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  mongo: {
    oplog: true,
    port: 27017,
    version: '3.4.1',
    servers: {
      one: {},
    },
  },
};
