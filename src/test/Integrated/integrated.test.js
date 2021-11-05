



/*
    시나리오

    사전 준비단계
        describe : prepare
            test : admin account - 관리자 접속
            test : check menus and tags - 사전 준비 1단계 끝
            test : deploy menus and tags - 사전 준비 2단계 끝
            
        Parallel Promise는 Promise
                            .all
                            .allSettled
                            .race
        참조

                                                                          / 메뉴마다 태그 3종류 배정  \
    관리자 접속 - 메뉴 갯수 확인 - 100개 채워지도록 작업 - 사전 준비 1단계 끝 - 메뉴마다 아이템 3종류 배정 - 사전 준비 2단계 끝
               \ 태그 갯수 확인 - 30개 채워지도록 작업  /


    사전 준비 2단계까지 완료 후 사용자 시작
                                    describe numbering              0-0 1-0 2-0
                                                                        1-1 2-1
                                                                            2-2
                                                                            2-3
        describe : user${prevgen+1}-${2^prevchild-0,1} 시작은 0-0
            test : user account - 사용자 접속
            test : check menu(1,2,3) - 랜덤 메뉴 3개 확인
            tes : check item and tag(1,2,3) - 해당 메뉴의 태그/아이템 확인

   -<-wait 3s-<-
   /   새로운   \
   \   사용자   /                  / 해당 메뉴의 태그 확인   \
    사용자 접속 - 랜덤 메뉴 3개 확인 - 해당 메뉴의 아이템 확인 - 종료
   /   새로운   \
   \   사용자   /
   -<-wait 3s-<-


    사전 준비 2단계까지 완료 후 관리자 지속적으로

    / 15초 휴식 - 1~5개 랜덤 메뉴 추가 + 태그/아이템 3개 배정 - 추가된 아이템 제외 동일 수량 메뉴 및 해당 아이템 제거 \
    \                                                                                                        /
        ---<---<---<---<---<---<---<---<---<---<---<---<---<---<---<---<---<---<---<---<---<---<---<---<---



    테스트 Variables(./config.json)

        host : 대상 서버 baseURL (http://localhost:3000)

        준비단계
        prepare : {
            adminEmail : 관리자 계정정보
            adminPW : 관리자 계정정보
            initialMenu : 준비단계에서 갖출 메뉴 갯수
            initialTag : 준비단계에서 갖출 태그 갯수, 새로 생성되는 메뉴에만 적용
            initialitemAndTag : 준비단계에서 갖출 메뉴당 아이템/태그 갯수 , 새로 생성되는 메뉴에만 적용
        }
        사용자 logic
        user : {
            maxGeneration : 사용자들을 몇 세대까지 증가시켜서 테스트를 하는가? 해당 generation에 도달하면 더이상 테스트 사용자를 만들지 않고 테스트 종료
            choice : 한 사용자가 몇개의 메뉴를 선택해서 확인해볼것인지
            interval : 새로운 사용자가 등장하기 까지 유예시간.
        }
        관리자 logic 
        admin : {
            interval : 새로 메뉴 수정작업을 시작하기까지 대기시간
            range : {
                min : 랜덤으로 추가되는 메뉴의 최소 갯수
                max : 랜덤으로 추가되는 메뉴의 최대 갯수
            }
        }

*/


jest.setTimeout(60 * 60 * 1000) // 일단 1시간

const supertest = require('supertest');
const responseMessage = require('../../globals/responseMessage');
const statusCode = require('../../globals/statusCode');
const routes = require('../../globals/routes');
const config = require('./config.json')


const host = config.host;
const testClient = supertest(host);

let adminInfo = {
    // admin의 jwt등 admin 계정을 계속 사용하기 위한 정보들
    jwt: "" // jwt 토큰 저장
}

let menuInfo = [
    // menu와 그 하위의 태그/아이템들의 id 정보.
]

let tagInfo = [
    // 태그들의 id 정보.
]

describe("prepare", () => {
    try {
        test("admin account", async () => {

            try {
                /*
                필요한 경우에
                const resSU = await testClient
                    .post(`${routes.user}${routes.signup}`)
                    .send(
                        {
                            email: config.prepare.adminEmail,
                            pw: config.prepare.adminPW,
                        }
                    )
                */
                const resSI = await testClient
                    .post(`${routes.user}${routes.signin}`)
                    .set("Content-Type", "application/json")
                    .send(
                        {
                            email: config.prepare.adminEmail,
                            pw: config.prepare.adminPW,
                        }
                    )
                /*
        
                위랑 마찬가지로 필요한 경우에
                expect(resSU.status).toBe(statusCode.CREATED)
                expect(resSU.body.success).toBe(true)
                expect(resSU.body.message).toBe(responseMessage.CREATED_USER)
                */
                expect(resSI.status).toBe(statusCode.OK)
                expect(resSI.body.success).toBe(true)
                expect(resSI.body.message).toBe(responseMessage.LOGIN_SUCCESS)
                var jwtToken = resSI.body.data.accessToken
                adminInfo.jwt = jwtToken ?? ""
                expect(jwtToken).toBeDefined();
            } catch (err) {
                console.log(err)
            }

        })
        test("check menus and tags", async () => {

            // 등록된 총 메뉴 갯수를 확인하는 반복
            var allMenuPromise = new Promise(async (resolve, reject) => {
                var iterator = 0;

                while (iterator != -1) {
                    try {
                        const pagedMenu = await testClient
                            .get(`/menus?page=${iterator}`)
                            //.set("Content-Type", "application/json")
                            .set("Authorization", adminInfo.jwt)
                            .send()

                        if (pagedMenu.status == statusCode.OK) {

                            // 현재 페이지 메뉴정보 추출 및 메모리 기록
                            var menus = pagedMenu.body.data
                            menus.forEach((ele, idx, arr) => {
                                var menu = {
                                    id: ele.id,
                                    items: [],
                                    tags: []
                                }
                                ele.items.forEach((ele, idx, arr) => {
                                    menu.items.push(ele.id)
                                })
                                ele.tags.forEach((ele, idx, arr) => {
                                    menu.tags.push(ele.id)
                                })
                                menuInfo.push(menu)

                            });
                            iterator++;

                            expect(pagedMenu.status).toBe(statusCode.OK)
                            expect(pagedMenu.body.success).toBe(true)
                            expect(pagedMenu.body.message).toBe(responseMessage.Somename) // TODO




                        } else {
                            expect(pagedMenu.status).not.toBe(statusCode.OK)
                            iterator = -1;
                        }
                    } catch (err) {
                        console.log(err)
                    }
                }
                resolve()
            })

            //등록된 총 태그 갯수를 확인하는 반복
            var allTagPromise = new Promise(async (resolve, reject) => {
                try {
                    const tagRes = await testClient
                        .get(`/tags`)
                        //.set("Content-Type", "application/json")
                        .set("Authorization", adminInfo.jwt)
                        .send()
                    if (tagRes.status == statusCode.OK) {
                        tagRes.body.data.forEach((ele, idx, arr) => {
                            tagInfo.push(ele.id)
                        })
                        resolve()
                        expect(tagRes.status).toBe(statusCode.OK)
                    } else {
                        reject(new Error(`
                    Unexpected response status code
                        expected : ${statusCode.OK}
                        received : ${tagRes.status}`))
                    }
                } catch (err) {
                    console.log(err)
                }
            })

            try {
                await Promise.all([allMenuPromise, allTagPromise])
            } catch (err) {
                console.log(err)
                
            }
        })
        test("deploy menus and tags", async () => {
            var menuCount = menuInfo.length;
            var tagCount = tagInfo.length;

            var menuGoal = config.prepare.initialMenu
            var tagGoal = config.prepare.initialTag

            var newMenuPromises = []
            var newTagPromises = []

            // 메뉴를 보충
            while (menuCount < menuGoal) {
                var menuIncreasePromise = new Promise(async (resolve, reject) => {
                    try {
                        const postMenuRes = await testClient
                            .post(`/menus`)
                            .set("Content-Type", "application/json")
                            .set("Authorization", adminInfo.jwt)
                            .send({
                                category: `category${menuCount}`,
                                name: `name${menuCount}`,
                                description: `description${menuCount}`
                            })

                        if (postMenuRes.status == statusCode.CREATED) {
                            var newMenu = {
                                id: postMenuRes.body.data.id,
                                items: [],
                                tags: []
                            }

                            menuInfo.push(newMenu)


                            // 실제 Promise 실행 처리는 Tag 추가를 먼저 하기 때문에 전체 태그중에 선택됨
                            var forShuffle = tagInfo.slice()
                            var deployingTag = forShuffle.sort(() => { 0.5 - Math.random() }).slice(0, n)

                            for (var i = 0; i < config.prepare.initialitemAndTag; i++) {
                                testClient
                                    .post(`/menus/${menu.id}/tags`)
                                    //.set("Content-Type", "application/json")
                                    .set("Authorization", adminInfo.jwt)
                                    .send({
                                        tags: deployingTag[i]
                                    })
                                    .then(attatchTag => {
                                        //TODO Tag 등록후 필요한 후처리?
                                        //일단 이거는 아무것도 안할래
                                        //태그 제대로 묶였겠지
                                        if (attatchTag.status == statusCode.CREATED) {
                                            newMenu.tags.push(deployingTag[i])
                                        } else {
                                            console.log(new Error(`
                                    Unexpected response status code
                                        expected : ${statusCode.CREATED}
                                        received : ${attatchTag.status}`))
                                        }
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    })
                            }

                            for (var i = 0; i < config.prepare.initialitemAndTag; i++) {
                                testClient
                                    .post(`/menus/${menu.id}/items`)
                                    //.set("Content-Type", "application/json")
                                    .set("Authorization", adminInfo.jwt)
                                    .send({
                                        size: `size${i}`,
                                        name: `name${i}`,
                                        price: i * 1000
                                    })
                                    .then(attatchItem => {
                                        //TODO Item 등록후 필요한 후처리?
                                        //일단 이거는 아무것도 안할래
                                        //아이템 제대로 묶였겠지
                                        if (attatchItem.status == statusCode.CREATED) {
                                            newMenu.items.push(attatchItem.body.data.id)
                                        } else {
                                            throw new Error(`
                                        Unexpected response status code
                                            expected : ${statusCode.CREATED}
                                            received : ${attatchItem.status}`)
                                        }
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    })
                            }
                            expect(postMenuRes.status).toBe(statusCode.CREATED)
                            resolve(newMenu)

                        } else {
                            reject(new Error(`
                        Unexpected response status code
                            expected : ${statusCode.CREATED}
                            received : ${postMenuRes.status}`))
                        }
                    } catch (err) {
                        console.log(err)
                    }
                })
                menuCount++;
                newMenuPromises.push(menuIncreasePromise)
            }

            while (tagCount < tagGoal) {
                var tagIncreasePromise = new Promise(async (resolve, reject) => {
                    try {
                        const postTagRes = await testClient
                            .post(`/tags`)
                            .set("Content-Type", "application/json")
                            .set("Authorization", adminInfo.jwt)
                            .send({
                                category: `category${tagCount}`,
                                name: `name${tagCount}`,
                                description: `description${tagCount}`
                            })

                        if (postTagRes.status == statusCode.CREATED) {
                            tagInfo.push(postTagRes.body.data.id)
                            expect(postTagRes.status).toBe(statusCode.CREATED)
                            resolve(postTagRes.body.data.id)
                        } else {
                            reject(new Error(`
                    Unexpected response status code
                        expected : ${statusCode.CREATED}
                        received : ${postTagRes.status}`))
                        }
                    } catch (err) {
                        console.log(err)
                    }
                })

                tagCount++;
                newTagPromises.push(tagIncreasePromise)
            }
            try {
                await Promise.all(newTagPromises)
                await Promise.all(newMenuPromises)

                expect(menuInfo.length).toBeGreaterThanOrEqual(config.prepare.initialMenu)
                expect(tagInfo.length).toBeGreaterThanOrEqual(config.prepare.initialTag)
            }
            catch (err) {
                console.log(err)
                
            }
        })
    } catch (err) {
        console.log(err)
    }

})