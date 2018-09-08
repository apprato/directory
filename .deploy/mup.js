module.exports = {
  servers: {
    one: {
      host: '13.238.245.84',
      username: "ubuntu",
      pem: "~/.ssh/aws/healthfitness1.pem"
      // pem:
      // password:
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
      ROOT_URL: 'http://healthfitness.appscalejs.com',
      MONGO_URL: 'mongodb://localhost/meteor',
    },
    // change to 'kadirahq/meteord' if your app is not using Meteor 1.4
    dockerImage: 'abernix/meteord:base',
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
