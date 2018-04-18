// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest');
const app = require('../../src/app');

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/');
    expect.assertions(1);
    expect(response.statusCode).toBe(200);
  });
});

describe('Test the user path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/user');
    expect.assertions(1);
    expect(response.statusCode).toBe(200);
  });

  test('It should return the json message', async () => {
    const response = await request(app).get('/user');
    expect.assertions(3);
    expect(response.statusCode).toBe(200);
    expect(response.type).toEqual('application/json');
    expect(response.text).toContain('Nick');
  });
});
