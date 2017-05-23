import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Clients from './clients';
import rateLimit from '../../modules/rate-limit.js';

export const upsertClient = new ValidatedMethod({
  name: 'clients.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    title: { type: String, optional: true },
    description: { type: String, optional: true },
    height: { type: String, optional: true },
    weight: { type: String, optional: true },
    sex: { type: String, optional: true },
  }).validator(),
  run(client) {
    return Clients.upsert({ _id: client._id }, { $set: client });
  },
});

export const removeClient= new ValidatedMethod({
  name: 'clients.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Clients.remove(_id);
  },
});

rateLimit({
  methods: [
    upsertClient,
    removeClient,
  ],
  limit: 5,
  timeRange: 1000,
});
