import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

const Articles = new Mongo.Collection('Articles');
export default Articles;

Articles.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Articles.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Articles.schema = new SimpleSchema({
  title: {
    type: String,
    label: 'The title of the document.',
  },
  body: {
    type: String,
    label: 'The body of the document.',
  },
});

Articles.attachSchema(Articles.schema);

Factory.define('document', Articles, {
  title: () => 'Factory Title',
  body: () => 'Factory Body',
});
