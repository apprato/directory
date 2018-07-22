/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { assert } from 'meteor/practicalmeteor:chai';
import Articles from './articles.js';

describe('Articles collection', function () {
  it('registers the collection with Mongo properly', function () {
    assert.equal(typeof Articles, 'object');
  });
});
