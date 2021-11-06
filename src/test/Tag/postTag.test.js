// const app = require('../../app');
const supertest = require('supertest');
const responseMessage = require('../../globals/responseMessage');
const statusCode = require('../../globals/statusCode');
const routes = require('../../globals/routes');
const faker = require('faker');
const dotenv = require('dotenv');
dotenv.config();

const host = `${process.env.HOST}`;
const testClient = supertest(host);

const adminUser = `${process.env.ADMIN_USER}`;
const adminPassword = `${process.env.ADMIN_PASSWORD}`;

let token = '';

describe('토큰 생성하기', () => {
  test('토큰 생성 성공', async () => {
    const res = await testClient
      .post(`${routes.token}`)
      .send(
        {
          "email" : adminUser,
          "password" : adminPassword
        }
      )
    expect(res.status).toBe(statusCode.OK)
    expect(res.body.success).toBe(true)
    expect(res.body.message).toBe(responseMessage.LOGIN_SUCCESS)
    token = res.body.data.accessToken
  })
})

describe('태그 생성하기', () => {
  test('태그 생성 성공', async () => {
      const res = await testClient
        .post(`${routes.tag}`)
        .set('Authorization', token)
        .send(
          {
            "type": faker.lorem.word(),
            "name": faker.lorem.text(),
          }
        )
      expect(res.status).toBe(statusCode.CREATED)
      expect(res.body.success).toBe(true)
      expect(res.body.message).toBe(responseMessage.CREATE_TAG_SUCCESS)
    })
  
    test('태그 생성 입력값 누락 ', async () => {
      const res = await testClient
        .post(`${routes.tag}`)
        .set('Authorization', token)
        .send(
          {
            "type": faker.lorem.word()
          }
        )
      expect(res.status).toBe(statusCode.BAD_REQUEST)
      expect(res.body.success).toBe(false)
      expect(res.body.message).toBe(responseMessage.NULL_VALUE)
    })
})
  
