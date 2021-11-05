// const app = require('../../app');
const supertest = require('supertest');
const responseMessage = require('../../globals/responseMessage');
const statusCode = require('../../globals/statusCode');
const routes = require('../../globals/routes');
const faker = require('faker');
const dotenv = require('dotenv');
dotenv.config();

const host = `http://localhost:${process.env.PORT}`;
const testClient = supertest(host);

const adminUser = `${process.env.ADMIN_USER}`;
const adminPassword = `${process.env.ADMIN_PASSWORD}`;

let token = '';

describe('토큰 생성하기', () => {
  test('토큰 생성 성공', async () => {
    const res = await testClient
      .post(`${routes.user}${routes.signin}`)
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

describe('메뉴 수정하기', () => {
  test('메뉴 수정 성공', async () => {
      const res = await testClient
        .put(`${routes.post}/82`)
        .set('token', token)
        .send(
          {
            "title": faker.lorem.word(),
            "content": faker.lorem.text(),
            "categoryIdx":5
          }
        )
      expect(res.status).toBe(statusCode.CREATED)
      expect(res.body.success).toBe(true)
      expect(res.body.message).toBe(responseMessage.UPDATE_POST_SUCCESS)
    })
  
    test('메뉴 수정 입력값 누락', async () => {
      const res = await testClient
        .put(`${routes.post}/82`)
        .set('token', token)
        .send(
          {
            "title": faker.lorem.word(),
            "content": undefined
          }
        )
      expect(res.status).toBe(statusCode.BAD_REQUEST)
      expect(res.body.success).toBe(false)
      expect(res.body.message).toBe(responseMessage.NULL_VALUE)
    })

    test('메뉴가 없어서 메뉴 수정 불가', async () => {
      const res = await testClient
        .put(`${routes.post}/9999999999`)
        .set('token', token)
        .send(
          {
            "title": faker.lorem.word(),
            "content": faker.lorem.text(),
            "categoryIdx":5
          }
        )
      expect(res.status).toBe(statusCode.NOT_FOUND)
      expect(res.body.success).toBe(false)
      expect(res.body.message).toBe(responseMessage.NO_POST)
    })
})
  
