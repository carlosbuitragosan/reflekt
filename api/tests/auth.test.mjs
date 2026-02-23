import { expect } from 'chai';
import app from '../server.js';
import request from 'supertest';
import User from '../models/User.js';

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
          expect(res.body.msg).to.equal('Login successful.');
          expect(res.headers['set-cookie']).to.exist;
          done();
        });
    });

    it('should logout user', (done) => {
      authenticateUser.post('/api/auth/logout').end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.headers['set-cookie'][0]).includes('connect.sid=;');
        done();
      });
    });

    it('should not log in a user with wrong password', (done) => {
      const user = {
        email: 'carlos@email.com',
        password: '1234',
      };
      authenticateUser
        .post('/login')
        .send(user)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          done();
        });
    });

    it('should register new user', async () => {
      const newUser = {
        email: 'test2@email.com',
        password: '234',
      };

      const res = await authenticateUser
        .post('/api/auth/register')
        .send(newUser);

      expect(res.statusCode).to.equal(201);
      expect(res.body.msg).to.equal('User registered successfully.');
      expect(res.headers['set-cookie']).to.exist;

      await User.deleteOne({ email: testUser.email });
    });

    it('should log in user with google', (done) => {
      authenticateUser.get('/api/auth/google').end((err, res) => {
        expect(res.statusCode).to.equal(302);
        expect(res.headers.location).to.include('accounts.google.com');
        done();
      });
    });

    it('should log in user with github', (done) => {
      authenticateUser.get('/api/auth/github').end((err, res) => {
        expect(res.statusCode).to.equal(302);
        expect(res.headers.location).to.include('github.com');
        done();
      });
    });
  });
});
