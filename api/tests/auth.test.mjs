import * as chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { before, after, describe, it } from 'mocha';
import bcrypt from 'bcrypt';
// import app from '../../api/server.js';
import User from '../../api/models/User.js';
// import passport from 'passport';
import proxyquire from 'proxyquire';

chai.use(chaiHttp);
const { expect } = chai;

class MockGoogleStrategy {
  constructor(options, verify) {
    this.name = 'google';
    this.verify = verify;
  }
}

const mockedPassport = proxyquire('../../api/config/passport.js', {
  'passport-google-oauth20': { Strategy: MockGoogleStrategy },
});

const { app } = proxyquire('../../api/server.js', {
  '../../api/config/passport.js': mockedPassport,
});

describe('Authentication tests', () => {
  let testUser;
  const agent = chai.request.agent(app);

  beforeEach(async () => {
    await User.deleteMany({});

    const hashedPassword = await bcrypt.hash('test123', 10);
    testUser = await User.create({
      email: 'test@email.com',
      password: hashedPassword,
    });
  });

  afterEach(async () => {
    await User.deleteMany({});
    agent.close();
  });

  describe('Local Authentication', () => {
    it('should log in a user with correct credentials', async () => {
      const res = await agent
        .post('/api/auth/login')
        .send({ email: 'test@email.com', password: 'test123' });

      expect(res).to.have.status(200);
      expect(res).to.have.cookie('connect.sid');
    });
  });
});
