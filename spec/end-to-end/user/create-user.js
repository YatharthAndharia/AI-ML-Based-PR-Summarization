const { expect } = require('chai');
const request = require('supertest');
const { url } = require('../../utils/constant');
const { signUpData } = require('../data/user');

describe('When creating a user', () => {
  it('should create user if username does not exist', async () => {
    await request(url).post('/signup').send(signUpData()).expect(200);
  });
  it('should not create user if username already exists', async () => {
    const res = await request(url)
      .post('/signup')
      .send(signUpData())
      .expect(409);
    expect(res.body.msg).to.be.equal('User Already Exists');
  });
});
