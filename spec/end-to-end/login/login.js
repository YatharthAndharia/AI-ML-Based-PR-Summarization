const request = require('supertest');
const { url } = require('../../utils/constant');
const { loginData1, loginDataFake } = require('../data/login');

describe('While login', () => {
  it('should login successfully if valid credentials', async () => {
    await request(url).post('/login').send(loginData1()).expect(200);
  });
  it('should not login successfully if invalid credentials', async () => {
    await request(url).post('/login').send(loginDataFake()).expect(401);
  });
});
