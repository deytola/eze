import { expect } from 'chai';
import { describe, it } from 'mocha';
import server from '../server/server';
import config from '../config/config';

describe('Server', () => {
  it('tests that server is running correct port', async () => {
    expect(server.port).to.equal(config.port);
  });
});
