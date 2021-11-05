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

// describe('전체 메뉴 조회하기', () => {
//   test('전체 메뉴 조회 성공', async () => {
//       const res = await testClient
//         .get(`${routes.post}?offset=0&limit=5`)
//       expect(res.status).toBe(statusCode.OK)
//       expect(res.body.success).toBe(true)
//       expect(res.body.message).toBe(responseMessage.READ_POST_SUCCESS)
//       expect(typeof (res.body.data)).toBe('object')
//     })

//   test('메뉴가 없어서 메뉴 조회 불가', async () => {
//       const res = await testClient
//         .get(`${routes.post}`)
//       expect(res.status).toBe(statusCode.BAD_REQUEST)
//       expect(res.body.success).toBe(false)
//       expect(res.body.message).toBe(responseMessage.NULL_VALUE)
//     })
// })