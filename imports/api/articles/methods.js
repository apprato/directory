import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Articles from './articles';
import rateLimit from '../../modules/rate-limit.js';

export const upsertArticle = new ValidatedMethod({
  name: 'articles.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    title: { type: String, optional: true },
    body: { type: String, optional: true },
  }).validator(),
  run(article) {
    return Articles.upsert({ _id: article._id }, { $set: article });
  },
});

export const removeArticle = new ValidatedMethod({
  name: 'articles.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Articles.remove(_id);
  },
});

rateLimit({
  methods: [
    upsertArticle,
    removeArticle,
  ],
  limit: 5,
  timeRange: 1000,
});
