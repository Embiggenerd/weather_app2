process.env.NODE_ENV = 'test';

// import request from 'request-promise';
import * as chai from 'chai';
const should = chai.should();
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

import App from '../../src/App';
import knex from '../../src/db/connection';
const queries = require('../../src/db/queries');

describe('Locations API Routes', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
    .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('GET /ping', () => {
    it('should return "pong"', () => {
      chai.request(App)
      .get('/locations/ping')
      .end((err, res) => {
        res.type.should.eql('text/html');
        res.text.should.eql('pong');
      });
    });
  });
});
