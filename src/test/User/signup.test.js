// const app = require('../../app');
const supertest = require('supertest');
const responseMessage = require('../../globals/responseMessage');
const statusCode = require('../../globals/statusCode');
const routes = require('../../globals/routes');
const faker = require('faker');
const dotenv = require('dotenv');
dotenv.config();

const host = `${process.env.HOST}`
const testClient = supertest(host);

describe('signup', () => {
  test('유저 회원가입 성공', async () => {
    const res = await testClient
      .post(`${routes.user}`)
      .send(
        {
          "email" : faker.internet.email(),
          "password" : "1234",
          "isAdmin": true
        }
      )
    expect(res.status).toBe(statusCode.CREATED)
    expect(res.body.success).toBe(true)
    expect(res.body.message).toBe(responseMessage.CREATED_USER)
  })

  test('유저 회원가입 입력값 누락', async () => {
    const res = await testClient
      .post(`${routes.user}`)
      .send(
        {
          "email" : faker.internet.email(),
        }
      )
    expect(res.status).toBe(statusCode.BAD_REQUEST)
    expect(res.body.success).toBe(false)
    expect(res.body.message).toBe(responseMessage.NULL_VALUE)
  })

  test('유저 회원가입 이메일 양식 불일치', async () => {
    const res = await testClient
      .post(`${routes.user}`)
      .send(
        {
          "email" : "test@navercom",
          "password" : "1234",
          "isAdmin": true
        }
      )
    expect(res.status).toBe(statusCode.BAD_REQUEST)
    expect(res.body.success).toBe(false)
    expect(res.body.message).toBe(responseMessage.NULL_VALUE)
  })

  test('유저 회원가입 이메일 중복', async () => {
    const res = await testClient
      .post(`${routes.user}`)
      .send(
        {
          "email" : "test@naver.com",
          "password" : "1234",
          "isAdmin": true
        }
      )
    expect(res.status).toBe(statusCode.FORBIDDEN)
    expect(res.body.success).toBe(false)
    expect(res.body.message).toBe(responseMessage.DUPLICATE_ERROR)
  })
})