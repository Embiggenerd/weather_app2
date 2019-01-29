process.env.NODE_ENV = 'test';

import chai = require('chai');
import chaiHttp = require('chai-http');
const should = chai.should();

import App from '../../src/App';

chai.use(chaiHttp);

describe('routes : index', () => {

  describe('GET /does/not/exist', () => {
    it('should throw an error', (done) => {
      chai.request(App)
      .get('/does/not/exist')
      .end((err: Error, res:ChaiHttp.Response) => {
        res.status.should.equal(404);
        res.type.should.equal('application/json');
        done();
      });
    });
  });

});
