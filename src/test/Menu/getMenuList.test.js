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

describe('전체 메뉴 조회하기', () => {
  test('전체 메뉴 조회 성공', async () => {
      const res = await testClient
        .get(`${routes.menu}?page=1`)
      expect(res.status).toBe(statusCode.OK)
      expect(res.body.success).toBe(true)
      expect(res.body.message).toBe(responseMessage.READ_MENU_SUCCESS)
      expect(typeof (res.body.data)).toBe('object')
    })
})