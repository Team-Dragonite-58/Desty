import request from 'supertest';
import response from 'supertest';
import express from 'express';
import { describe, beforeEach, expect, test, jest } from '@jest/globals';
import bodyParser from 'body-parser';
import locationRouter from '../server/routes/locationRouter';
import loginRouter from '../server/routes/loginRouter';
import signupRouter from '../server/routes/signupRouter';
import userInfoRouter from '../server/routes/userInfoRouter';

const app = express();
app.use(bodyParser.json());
app.use(express.json());

app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/userinfo', userInfoRouter);
app.use('/location', locationRouter);

// describe('/signup', () => {
//   test('confirm successful signup', async () => {
//     const res = await request(app).post('/signup').send({
//       displayName: 'dsfsd',
//       user: 'sdfsdf',
//       pass: 'ssdfsd',
//       currentLocation: 'sdsfdf',
//       profilePicture: 'sdfsdfsdf',
//     });
//     expect(res.status).toBe(201);
//     expect(res.body).toHaveProperty('id');
//     expect(res.body).toHaveProperty('username');
//     expect(res.body).toHaveProperty('displayName');
//     expect(res.body).toHaveProperty('currentLocation');
//     expect(res.body).toHaveProperty('profilePicture');
//   });
// });

describe('/login', () => {
  test('confirm successful login', async () => {
    const res = await request(app).post('/login').send({
      user: 'sdfsdf',
      pass: 'ssdfsd',
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('username');
    expect(res.body).toHaveProperty('displayName');
    expect(res.body).toHaveProperty('currentLocation');
    expect(res.body).toHaveProperty('profilePicture');
  });

  test('try to login with wrong user detail', async () => {
    const res = await request(app).post('/login').send({
      user: 'sdfsdffsdfsd',
      pass: 'ssdfsd',
    });
    expect(res.body.err).toBeDefined();
  });
});

describe('/location', () => {
  test('get all the location data once tag is "all"', async () => {
    const res = await request(app).get('/location').send({
      tag: 'all',
      id: 2,
    });
    expect(res.status).toBe(201);
  });
});
