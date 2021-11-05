const app = require('../../app');
const supertest = require('supertest');
const responseMessage = require('../../globals/responseMessage');
const statusCode = require('../../globals/statusCode');
const routes = require('../../globals/routes');
const faker = require('faker');

const testClient = supertest(app);

describe('signup', () => {
  test('유저 회원가입 성공', async () => {
    const res = await testClient
      .post(`${routes.user}${routes.signup}`)
      .send(
        {
          "name" : faker.name.findName(),
          "email" : faker.internet.email(),
          "password" : "1234",
          "password2": "1234"
        }
      )
    expect(res.status).toBe(statusCode.CREATED)
    expect(res.body.success).toBe(true)
    expect(res.body.message).toBe(responseMessage.CREATED_USER)
  })

  test('유저 회원가입 입력값 누락', async () => {
    const res = await testClient
      .post(`${routes.user}${routes.signup}`)
      .send(
        {
          "name" : faker.name.findName(),
          "email" : faker.internet.email(),
          "password" : "1234"
        }
      )
    expect(res.status).toBe(statusCode.BAD_REQUEST)
    expect(res.body.success).toBe(false)
    expect(res.body.message).toBe(responseMessage.NULL_VALUE)
  })

  test('유저 회원가입 이메일 중복', async () => {
    const res = await testClient
      .post(`${routes.user}${routes.signup}`)
      .send(
        {
          "name" : faker.name.findName(),
          "email" : "tkdtn800@naver.com",
          "password" : "1234",
          "password2": "1234"
        }
      )
    expect(res.status).toBe(statusCode.BAD_REQUEST)
    expect(res.body.success).toBe(false)
    expect(res.body.message).toBe(responseMessage.DUPLICATE_ERROR)
  })

  test('유저 회원가입 패스워드 불일치', async () => {
    const res = await testClient
      .post(`${routes.user}${routes.signup}`)
      .send(
        {
          "name" : faker.name.findName(),
          "email" : faker.internet.email(),
          "password" : "1234",
          "password2": "12345"
        }
      )
    expect(res.status).toBe(statusCode.BAD_REQUEST)
    expect(res.body.success).toBe(false)
    expect(res.body.message).toBe(responseMessage.MISS_MATCH_PW)
  })
})