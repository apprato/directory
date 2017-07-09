import {Meteor} from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';
import {Accounts} from 'meteor/accounts-base';
// Custom Collections
import {Clients} from '../../api/clients/clients.js';
import {Trainers} from '../../api/trainers/trainers.js';
import Baby from 'babyparse';
import {Random} from 'meteor/random';


//if (Meteor.isProduction || Meteor.isDevelopment) {
try {
  /* Create Users - Admin, previous site import */
  const usersAdmins = [{
    email: 'support@appscale.com',
    password: 'appscalejs2017##',
    profile: {
      name: {first: 'Stephen', last: 'Goudie'},
    },
    roles: ['admin'],
  }];

  usersAdmins.forEach(({email, password, profile, roles}) => {
    const userExists = Meteor.users.findOne({'emails.address': email});

    if (!userExists) {
      const userId = Accounts.createUser({email, password, profile});
      Roles.addUsersToRoles(userId, roles);
    }
  });

  const usersImportFile = process.env.PWD + '/imports/startup/server/fixtures/hfc-develop.csv';
  const parsedUsersImportFile = Baby.parseFiles(usersImportFile, {header: true, skipEmptyLines: true});
  const directoryListings = parsedUsersImportFile.data.map(e => {
    var emailAddress = e.Email1 ? e.Email1 : e.userid + '@appscalejs.com';
    var userRow = null;
    userRow =  {
      // meteor accounts
      // email: emailAddress,
      password: e.password,
      profile: {
        name: {first: e.FirstName, last: e.LastName},
      },
      roles: ['supplier'],

      // Trainers
      category: e.Category,
      businessName: e.Company,
      address1: e.Addr1,
      address2: e.Addr2,
      city: e.City,
      area: e.Area,
      suburb: e.Suburb,
      phoneNumber: e.Description,
      phoneNumber2: e.Description,
      phoneNumber3: e.Description,
      email: emailAddress,
      email1: emailAddress,
      email2: e.Email2,
      email3: e.Email3,
      overview: e.Description,
      //state: e.State, @TODO - Standadise
      postCode: e.Zip,
      country: 'AU',
      phoneNumber: e.Area,
      userid: e.userid
    };
    return userRow;
  });

  directoryListings.forEach((directoryListing) => {
    var userExists = null, trainerExists = null,  password = null, profile = null, id = null, userid = null;

    email = directoryListing.email;
    password = directoryListing.password;
    profile = directoryListing.profile;
    userExists = Meteor.users.findOne({'emails.address': email});
    if (!userExists) {
      userId = Accounts.createUser({email, password, profile});
      Roles.addUsersToRoles(userId, directoryListing.roles);

      trainerExists = Trainers.findOne({'email1': email});
      delete(directoryListing.id, directoryListing.email, directoryListing.password, directoryListing.roles);
      if (!trainerExists) {
        Trainers.insert(directoryListing);
        console.log(directoryListing)
      }
    }
  });
}
catch (exception) {
  console.log(Exception);
}

//}
