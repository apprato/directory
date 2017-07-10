module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: '54.252.236.93',
      username: "ubuntu",
      pem: "~/.ssh/aws/healthfitness1.pem"
      // pem: './path/to/pem'
      // password: 'server-password'
      // or neither for authenticate from ssh-agent
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
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'http://healthfitness.appscalejs.com',
      MONGO_URL: 'mongodb://localhost/meteor',
    },
    /*
    log: { // (optional)
      driver: 'syslog',
       opts: {
       'syslog-address': 'udp://syslogserverurl.com:1234'
       },
    },
    */

    // ssl: { // (optional)
    //   // Enables let's encrypt (optional)
    //   autogenerate: {
    //     email: 'email.address@domain.com',
    //     // comma seperated list of domains
    //     domains: 'website.com,www.website.com'
    //   }
    // },

    docker: {
      // change to 'kadirahq/meteord' if your app is not using Meteor 1.4
      image: 'abernix/meteord:base',
      // imagePort: 80, // (default: 80, some images EXPOSE different ports)
    },

    // This is the maximum time in seconds it will wait
    // for your app to start
    // Add 30 seconds if the server has 512mb of ram
    // And 30 more if you have binary npm dependencies.
    deployCheckWaitTime: 600,

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  mongo: {
    port: 27017,
    version: '3.4.1',
    servers: {
      one: {}
    }
  }
};
