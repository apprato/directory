import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/alanning:roles";
import { Accounts } from "meteor/accounts-base";
// Custom Collections
import { Clients } from "../../api/clients/clients.js";
import { Trainers } from "../../api/trainers/trainers.js";
import Baby from "babyparse";
import { Random } from "meteor/random";

/* Create Users - Admin, previous site import */
if (Meteor.isProduction || Meteor.isDevelopment) {
  try {
    var usersImportFile = null;
    const usersAdmins = [
      {
        email: "support@appscale.com",
        password: "appscalejs2017##",
        profile: {
          name: { first: "Stephen", last: "Goudie" }
        },
        roles: ["admin"]
      }
    ];

    // Ensure indexes are created for filters and text search and weighted.
    //Trainers._dropIndex("city");
    //Trainers._dropIndex("overview");
    //Trainers._dropIndex("suburb");
    //Trainers._dropIndex("businessName");
    Trainers._ensureIndex(
      {
        businessName: "text",
        city: "text",
        suburb: "text",
        overview: "text"
      },
      {
        weights: {
          businessName: 1,
          city: 2,
          suburb: 3,
          overview: 4
        }
        //name: "TextIndex"
      }
    );

    usersAdmins.forEach(({ email, password, profile, roles }) => {
      const userExists = Meteor.users.findOne({ "emails.address": email });

      if (!userExists) {
        const userId = Accounts.createUser({ email, password, profile });
        Roles.addUsersToRoles(userId, roles);
      }
    });

    switch (Meteor.settings.environment) {
      case "development":
        var usersImportFile = process.env.PWD + "/private/hfc-production-nobreaks.csv";
        break;
      case "staging":
        var usersImportFile =
          process.env.PWD + "/programs/server/assets/app/hfc-production-nobreaks.csv"; // Webpack is in a different location: bundle/bundle/programs/server/assets/app
        break;
      case "production":
        var usersImportFile =
          process.env.PWD + "/programs/server/assets/app/hfc-production-nobreaks.csv"; // Webpack is in a different location: bundle/bundle/programs/server/assets/app
        break;
      default:
        break;
    }

    //usersImportFile = process.env.PWD + "/private/hfc.csv";

    const parsedUsersImportFile = Baby.parseFiles(usersImportFile, {
      header: true,
      skipEmptyLines: true
    });
    const directoryListings = parsedUsersImportFile.data.map(e => {
      var userRow,
        logo,
        logoBefore,
        emailAddress = null;
      emailAddress = e.Email1 ? e.Email1 : e.userid + "@appscalejs.com";
      logoBefore = e.Logo;
      logo = logoBefore.replace("www.", "");
      logo = logoBefore.replace(
        "http://healthfitness.com.au/directory/logos/",
        ""
      );
      userRow = {
        // meteor accounts
        // email: emailAddress,
        password: e.password,
        profile: {
          name: { first: e.FirstName, last: e.LastName }
        },
        roles: ["supplier"],

        // Trainers
        category: e.Category,
        logo: logo,
        businessName: e.Company,
        address1: e.Addr1,
        address2: e.Addr2,
        city: e.City,
        area: e.Area,
        suburb: e.Suburb,
        phoneNumber: e.Phone1,
        phoneNumber2: e.Phone2,
        phoneNumber3: e.Description,
        email: emailAddress,
        email1: emailAddress,
        email2: e.Email2,
        email3: e.Email3,
        overview: e.Blurb,
        website: e.Website,
        state: e.State, //@TODO - Standadise
        postCode: e.Zip,
        country: "AU",
        //phoneNumber: e.Area,
        userid: e.userid
      };
      console.log(userRow);//
      return userRow;
    });

    directoryListings.forEach(directoryListing => {
      var userExists = null,
        trainerExists = null,
        password = null,
        profile = null,
        id = null,
        userid = null;

      email = directoryListing.email;
      password = directoryListing.password;
      profile = directoryListing.profile;
      userExists = Meteor.users.findOne({ "emails.address": email });
      if (!userExists) {
        userId = Accounts.createUser({ email, password, profile });
        Roles.addUsersToRoles(userId, directoryListing.roles);

        trainerExists = Trainers.findOne({ email1: email });
        delete (directoryListing.id,
          directoryListing.email,
          directoryListing.password,
          directoryListing.roles);
        if (!trainerExists) {
          Trainers.insert(directoryListing);
          console.log(directoryListing);
        }
      }
    });
  } catch (exception) {
    console.log(exception);
  }
}
