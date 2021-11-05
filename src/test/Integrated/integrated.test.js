



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

    / 15초 휴식 - 1~5개 랜덤 메뉴 추가 + 태그/아이템 3개 배정 - 추가된 아이템 제외 동일 수량 메뉴/아이템 제거 \
    \                                                                                                  /
     ---<---<---<---<---<---<---<---<---<---<---<---<---<---<---<---<---<---<---<---<---<---<---<---<---

*/ 




const supertest = require('supertest');
const responseMessage = require('../../globals/responseMessage');
const statusCode = require('../../globals/statusCode');
const routes = require('../../globals/routes');


const host = "http://54.180.139.105:3000"
const testClient = supertest(host);