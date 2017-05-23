import {Meteor} from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';
import {Accounts} from 'meteor/accounts-base';
// Custom Collections
import {Clients} from '../../api/clients/clients.js';
import {Trainers} from '../../api/trainers/trainers.js';

if (!Meteor.isProduction) {
  const users = [{
    email: 'admin@admin.com',
    password: 'password',
    profile: {
      name: {first: 'Carl', last: 'Winslow'},
    },
    roles: ['admin'],
  }];

  users.forEach(({email, password, profile, roles}) => {
    const userExists = Meteor.users.findOne({'emails.address': email});

    if (!userExists) {
      const userId = Accounts.createUser({email, password, profile});
      Roles.addUsersToRoles(userId, roles);
    }
  });


  /* Clients fixtures */
  const clients = [{
    title: 'Require weight training program',
    description: "Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the ",
    height: '190',
    weight: '80',
    sex: 'male',
    image: 'person.png'
  }, {
    title: 'Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring',
    description: 'Require weight training program',
    height: '190',
    weight: '60',
    sex: 'male',
    image: 'person.png'
  }, {
    title: 'Tabarta circtuit re-program required',
    description: "Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the ",
    height: '180',
    weight: '50',
    sex: 'female',
    image: 'person.png'
  }, {
    title: 'Skin fold appointment by a qualified practisioner',
    description: "Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the ",
    height: '170',
    weight: '60',
    sex: 'female',
    image: 'person.png'
  }, {
    title: 'I had a motorbike accident and have lost substantial body muscle, can anyone assist me post physio therapy regain my preivous composure?',
    description: "Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the ",
    height: '170',
    weight: '60',
    sex: 'female',
    image: 'person.png'
  }, {
    title: 'I just had a baby and I would like to imporve my fitness again and loose some weight post child birth ',
    description: "Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the ",
    height: '170',
    weight: '60',
    sex: 'female',
    image: 'person.png'
  }, {
    title: 'I need to be able to increase my flexibility after working in a 9-5 office for 10 years without exercise.',
    description: "Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the ",
    height: '170',
    weight: '60',
    sex: 'female',
    image: 'person.png'
  }, {
    title: 'help people to get fit and treat injuries all in the one place.',
    description: "Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the ",
    height: '170',
    weight: '60',
    sex: 'female',
    image: 'person.png'
  }, {
    title: 'Skin fold appointment by a qualified practisioner',
    description: "Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the ",
    height: '170',
    weight: '60',
    sex: 'female',
    image: 'person.png'
  }, {
    title: 'Kick PT offers a friendly environment where everyone can get fit while having fun participating in boxing',
    description: "Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the ",
    height: '170',
    weight: '60',
    sex: 'female',
    image: 'person.png'
  }, {
    title: 'Toughen Up is a gym based in Altona focused on boxing and mixed martial arts.',
    description: "Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the ",
    height: '170',
    weight: '60',
    sex: 'female',
    image: 'person.png'
  }
  ];

  clients.forEach((client) => {
    const clientExists = Clients.findOne({title: client.title});
    if (!clientExists) Clients.insert(client);
  });


  /* Trainers fixtures */
  const trainers = [{
    category: 'yoga',
    skillTags: 'pilates',
    experienceLevel: 'expert'
  }
  ];
  trainers.forEach((trainers) => {
    const clientExists = Trainers.findOne({category: trainers.category});
    if (!clientExists) Trainers.insert(trainers);
  });


}
