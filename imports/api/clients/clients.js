import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

export const Clients = new Mongo.Collection('Clients');
export default Clients;

// Security measure to stops the client browser calling Disabling Allow and Deny Rules like Movies.insert() or Movies.remove()
Clients.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Clients.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Clients.schema = new SimpleSchema({
  title: {
    type: String,
    label: 'What you want achieved.',
  },
  description: {
    type: String,
    label: 'More detail on history and goals.',
  },
  height: {
    type: String,
    label: 'Height of individual.',
  },
  weight: {
    type: String,
    label: 'Weight of individual.',
  },
  sex: {
    type: String,
    label: 'Sex of individual.',
  },
  image: {
    type: String,
    label: 'Sex of individual.',
  }
});

Clients.attachSchema(Clients.schema);

