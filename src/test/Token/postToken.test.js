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

describe('token', () => {
  test('유저 토큰 생성 성공', async () => {
    const res = await testClient
      .post(`${routes.token}`)
      .send(
        {
          "email" : "test@naver.com",
          "password" : "1234"
        }
      )
    expect(res.status).toBe(statusCode.OK)
    expect(res.body.success).toBe(true)
    expect(res.body.message).toBe(responseMessage.LOGIN_SUCCESS)
  })

  test('유저 토큰 입력값 누락', async () => {
    const res = await testClient
      .post(`${routes.token}`)
      .send(
        {
          "email" : faker.internet.email()
        }
      )
    expect(res.status).toBe(statusCode.BAD_REQUEST)
    expect(res.body.success).toBe(false)
    expect(res.body.message).toBe(responseMessage.NULL_VALUE)
  })

  test('유저 토큰 존재하지 않는 이메일', async () => {
    const res = await testClient
      .post(`${routes.token}`)
      .send(
        {
          "email" : "test@testtest.com",
          "password" : "1234"
        }
      )
    expect(res.status).toBe(statusCode.NOT_FOUND)
    expect(res.body.success).toBe(false)
    expect(res.body.message).toBe(responseMessage.NO_USER)
  })

  test('유저 로그인 비밀번호 불일치', async () => {
    const res = await testClient
      .post(`${routes.token}`)
      .send(
        {
          "email" : "test@naver.com",
          "password": "12345"
        }
      )
    expect(res.status).toBe(statusCode.BAD_REQUEST)
    expect(res.body.success).toBe(false)
    expect(res.body.message).toBe(responseMessage.MISS_MATCH_PW)
  })
})