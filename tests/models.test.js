import Camo from 'camo';
import {
  describe, it, before, after,
} from 'mocha';
import BuyRequest from '../server/models/buyrequest.model';
import SellRequest from '../server/models/sellrequest.model';

describe('Request Models', () => {
  let database = null;

  before((done) => {
    Camo.connect(`mongodb://${process.env.IP || 'localhost'}:${
      process.env.MONGO_PORT || '27017'
    }/app_test`).then((db) => {
      database = db;
      return database.dropDatabase();
    }).then(() => {}).then(done, done);
  });

  after(() => database.dropDatabase());

  describe('Sell Request Model', () => {
    describe('#save()', () => {
      it('should save Sell document to database', (done) => {
        const sellRequest = new SellRequest({
          pricing: [
            {
              storageSize: '64GB',
              new: 1160,
              a1: 1155,
              a2: 1150,
              b1: 1145,
              b2: 1140,
              c: 1135,
              'c/b': 1130,
              'c/d': 1125,
            },
            {
              storageSize: '256GB',
              new: 1180,
              a1: 1175,
              a2: 1170,
              b1: 1165,
              b2: 1160,
              c: 1155,
              'c/b': 1150,
              'c/d': 1145,
            },
            {
              storageSize: '512GB',
              new: 1200,
              a1: 1195,
              a2: 1190,
              b1: 1185,
              b2: 1180,
              c: 1175,
              'c/b': 1170,
              'c/d': 1165,
            },
          ],
          _id: '5f7d88a2c768ae790cf3eaa9',
          requestType: 'Sell Request',
          deviceName: 'iPhone XS Max',
          created: '2020-10-07T09:21:38.585Z',
        });
        sellRequest.save((err) => {
          if (!err) {
            done();
          }
        });
      });
    });

    describe('#load()', () => {
      it('should load Sell document from database', (done) => {
        SellRequest.findOne({ deviceName: 'iPhone XS Max' }, (err) => {
          if (!err) {
            done();
          }
        });
      });
    });
  });
  describe('Buy Request Model', () => {
    describe('#save()', () => {
      it('should save Buy document to database', (done) => {
        const buyRequest = new BuyRequest(
          {
            pricing: [
              {
                storageSize: '16GB',
                new: 40,
                a1: 35,
                a2: 30,
                b1: 25,
                b2: 20,
                c: 15,
                'c/b': 10,
                'c/d': 5,
              },
              {
                storageSize: '64GB',
                new: 60,
                a1: 55,
                a2: 50,
                b1: 45,
                b2: 40,
                c: 35,
                'c/b': 30,
                'c/d': 25,
              },
              {
                storageSize: '128GB',
                new: 80,
                a1: 75,
                a2: 70,
                b1: 65,
                b2: 60,
                c: 55,
                'c/b': 50,
                'c/d': 45,
              },
            ],
            _id: '5f7d889ec768ae790cf3eaa8',
            requestType: 'Buy Request',
            deviceName: 'iPhone SE',
            created: '2020-10-07T09:21:34.977Z',
          },
        );
        buyRequest.save((err) => {
          if (!err) {
            done();
          }
        });
      });
    });

    describe('#load()', () => {
      it('should load Buy document from database', (done) => {
        BuyRequest.findOne({ deviceName: 'iPhone SE' }, (err) => {
          if (!err) {
            done();
          }
        });
      });
    });
  });
});
