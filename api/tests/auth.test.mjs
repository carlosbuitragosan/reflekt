import { expect } from 'chai';
import app from '../server.js';
import request from 'supertest';

describe('Authentication tests', () => {
  const testUser = {
    email: 'carlos@email.com',
    password: 'carlos',
  };

  const authenticateUser = request.agent(app);

  describe('Local Authentication', () => {
    it('should log in existing user with correct credentials', (done) => {
      authenticateUser
        .post('/api/auth/login')
        .send(testUser)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect('Location', '/diary-entry');
          expect(res.headers['set-cookie']).to.exist;
          done();
        });
    });
  });
});
