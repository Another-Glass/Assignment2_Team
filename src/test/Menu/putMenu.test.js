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
let menuId;

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

describe('메뉴 생성하기', () => {
  test('테스트 메뉴 생성 성공', async () => {
    const res = await testClient
      .post(`${routes.menu}`)
      .set('Authorization', token)
      .send(
        {
          "category": faker.lorem.word(),
          "name": faker.lorem.word(),
          "description": faker.lorem.text()
        }
      )
      expect(res.status).toBe(statusCode.CREATED)
      expect(res.body.success).toBe(true)
      expect(res.body.message).toBe(responseMessage.CREATE_MENU_SUCCESS)
    menuId = res.body.data.id
  })
})

describe('메뉴 수정하기', () => {
  test('메뉴 수정 성공', async () => {
      const res = await testClient
        .put(`${routes.menu}/${menuId}`)
        .set('Authorization', token)
        .send(
          {
            "category" : "salad",
            "name" : "깔라마리 달래 샐러드",
            "description" : "해산물 샐러드",
            "isSold" : true,
            "badge" : "NEW"
          }
        )
      expect(res.status).toBe(statusCode.OK)
      expect(res.body.success).toBe(true)
      expect(res.body.message).toBe(responseMessage.UPDATE_MENU_SUCCESS)
    })
  
    test('메뉴 수정 입력값 누락', async () => {
      const res = await testClient
        .put(`${routes.menu}/${menuId}`)
        .set('Authorization', token)
        .send(
          {
          }
        )
      expect(res.status).toBe(statusCode.BAD_REQUEST)
      expect(res.body.success).toBe(false)
      expect(res.body.message).toBe(responseMessage.NULL_VALUE)
    })

    test('메뉴 삭제 성공', async () => {
      const res = await testClient
        .delete(`${routes.menu}/${menuId}`)
        .set('Authorization', token)
      expect(res.status).toBe(statusCode.OK)
      expect(res.body.success).toBe(true)
      expect(res.body.message).toBe(responseMessage.DELETE_MENU_SUCCESS)
    })

    test('메뉴가 없어서 메뉴 수정 불가', async () => {
      const res = await testClient
        .put(`${routes.menu}/${menuId}`)
        .set('Authorization', token)
        .send(
          {
            "category" : "salad",
            "name" : "깔라마리 달래 샐러드",
            "description" : "해산물 샐러드",
            "isSold" : true,
            "badge" : "NEW"
          }
        )
      expect(res.status).toBe(statusCode.NOT_FOUND)
      expect(res.body.success).toBe(false)
      expect(res.body.message).toBe(responseMessage.NO_MENU)
    })
})
  
