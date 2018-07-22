/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import Articles from './articles.js';
import { upsertArticle, removeArticle } from './methods.js';

describe('Articles methods', function () {
  beforeEach(function () {
    if (Meteor.isServer) {
      resetDatabase();
    }
  });

  it('inserts a document into the Articles collection', function () {
    upsertArticle.call({
      title: 'You can\'t arrest me, I\'m the Cake Boss!',
      body: 'They went nuts!',
    });

    const getArticle = Articles.findOne({ title: 'You can\'t arrest me, I\'m the Cake Boss!' });
    assert.equal(getArticle.body, 'They went nuts!');
  });

  it('updates a document in the Articles collection', function () {
    const { _id } = Factory.create('document');

    upsertArticle.call({
      _id,
      title: 'You can\'t arrest me, I\'m the Cake Boss!',
      body: 'They went nuts!',
    });

    const getArticle = Articles.findOne(_id);
    assert.equal(getArticle.title, 'You can\'t arrest me, I\'m the Cake Boss!');
  });

  it('removes a document from the Articles collection', function () {
    const { _id } = Factory.create('document');
    removeArticle.call({ _id });
    const getArticle = Articles.findOne(_id);
    assert.equal(getArticle, undefined);
  });
});
