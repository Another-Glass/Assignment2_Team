// // const app = require('../../app');
// const supertest = require('supertest');
// const responseMessage = require('../../globals/responseMessage');
// const statusCode = require('../../globals/statusCode');
// const routes = require('../../globals/routes');
// const faker = require('faker');
// const dotenv = require('dotenv');
// dotenv.config();

// const host = `http://localhost:${process.env.PORT}`;
// const testClient = supertest(host);

// const adminUser = `${process.env.ADMIN_USER}`;
// const adminPassword = `${process.env.ADMIN_PASSWORD}`;

// let token = '';

// describe('토큰 생성하기', () => {
//   test('토큰 생성 성공', async () => {
//     const res = await testClient
//       .post(`${routes.user}${routes.signin}`)
//       .send(
//         {
//           "email" : adminUser,
//           "password" : adminPassword
//         }
//       )
//     expect(res.status).toBe(statusCode.OK)
//     expect(res.body.success).toBe(true)
//     expect(res.body.message).toBe(responseMessage.LOGIN_SUCCESS)
//     token = res.body.data.accessToken
//   })
// })

// describe('메뉴 생성하기', () => {
//   test('메뉴 생성 성공', async () => {
//       const res = await testClient
//         .post(`${routes.post}`)
//         .set('token', token)
//         .send(
//           {
//             "title": faker.lorem.word(),
//             "content": faker.lorem.text(),
//             "categoryIdx":1
//           }
//         )
//       expect(res.status).toBe(statusCode.CREATED)
//       expect(res.body.success).toBe(true)
//       expect(res.body.message).toBe(responseMessage.CREATE_POST_SUCCESS)
//     })
  
//     test('메뉴 생성 입력값 누락 ', async () => {
//       const res = await testClient
//         .post(`${routes.post}`)
//         .set('token', token)
//         .send(
//           {
//             "title": "testtest",
//             "content": "test123"
//           }
//         )
//       expect(res.status).toBe(statusCode.BAD_REQUEST)
//       expect(res.body.success).toBe(false)
//       expect(res.body.message).toBe(responseMessage.NULL_VALUE)
//     })
// })
  
