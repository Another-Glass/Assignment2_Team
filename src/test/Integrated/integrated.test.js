



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
    \                                                                                                  /
     ---<---<---<---<---<---<---<---<---<---<---<---<---<---<---<---<---<---<---<---<---<---<---<---<---



    테스트 Variables(./config.json)

        준비단계
        prepare : {
            adminEmail : 관리자 계정정보
            adminPW : 관리자 계정정보
            initialMenu : 준비단계에서 갖출 메뉴 갯수
            initialTag : 준비단계에서 갖출 태그 갯수, 새로 생성되는 메뉴에만 적용
            initialitem : 준비단계에서 갖출 메뉴당 아이템 갯수 , 새로 생성되는 메뉴에만 적용
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
const supertest = require('supertest');
const responseMessage = require('../../globals/responseMessage');
const statusCode = require('../../globals/statusCode');
const routes = require('../../globals/routes');


const host = "http://54.180.139.105:3000"
const testClient = supertest(host);