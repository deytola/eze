import chai from 'chai';
import chaiHttp from 'chai-http';
import {
  describe, it, before, afterEach, beforeEach,
} from 'mocha';
import Camo from 'camo';
import BuyRequest from '../server/models/buyrequest.model';
import SellRequest from '../server/models/sellrequest.model';
import server from '../server/server';

// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);
describe('Trade Requests', () => {
  let database = null;

  before((done) => {
    Camo.connect(`mongodb://${process.env.IP || 'localhost'}:${
      process.env.MONGO_PORT || '27017'
    }/app_test`).then((db) => {
      database = db;
      return database.dropDatabase();
    }).then(() => {}).then(done, done);
  });

  afterEach((done) => {
    database.dropDatabase().then(() => {}).then(done, done);
  });
  describe('BuyRequests', () => {
    beforeEach((done) => { // Before each test we empty the database
      BuyRequest.deleteMany({}, (err) => {
        if (!err) {
          done();
        }
      });
    });

    describe('/GET buy requests', () => {
      it('it should GET all the buy requests', (done) => {
        chai.request(server.app)
          .get('/api/buyRequests')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
          });
      });
    });
  });

  describe('SellRequests', () => {
    beforeEach((done) => { // Before each test we empty the database
      SellRequest.deleteMany({}, (err) => {
        if (!err) {
          done();
        }
      });
    });

    describe('/GET sell requests', () => {
      it('it should GET all the sell requests', (done) => {
        chai.request(server.app)
          .get('/api/sellRequests')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
          });
      });
    });
  });

  describe('TradeRequests', () => {
    beforeEach((done) => { // Before each test we empty the database
      SellRequest.deleteMany({}, (err) => {
        if (!err) {
          done();
        }
      });
    });
    beforeEach((done) => { // Before each test we empty the database
      BuyRequest.deleteMany({}, (err) => {
        if (!err) {
          done();
        }
      });
    });

    describe('/GET buy or sell requests by query param', () => {
      it('it should GET all the sell requests by requestType query param', (done) => {
        chai.request(server.app)
          .get('/api/traderequests?requestType=sell')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
          });
      });
      it('it should GET all the buy requests by requestType query param', (done) => {
        chai.request(server.app)
          .get('/api/traderequests?requestType=buy')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
          });
      });
      it('it should GET all the sell requests by requestType and pagination query param', (done) => {
        chai.request(server.app)
          .get('/api/traderequests?requestType=sell&page=2&limit=10')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
          });
      });
      it('it should GET all the buy requests by requestType and pagination query param', (done) => {
        chai.request(server.app)
          .get('/api/traderequests?requestType=buy&page=2&limit=10')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
          });
      });
    });
  });
});
