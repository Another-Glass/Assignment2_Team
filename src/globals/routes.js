//경로 변수들 모음

// Root
const ROOT = '/';

// User
const USER_SIGNUP = '/user';
const USER_SIGNIN = '/token';

// Menu
const MENU = '/menus';
const MENU_DETAIL = '/:menuId';
const MENU_PAGE = "/menus?page=${num}"

// Tag
const TAG = '/tags';
const TAG_DETAIL = '/:tagId';

const routes = {
  root: ROOT,
  user: USER_SIGNUP,
  token: USER_SIGNIN,
  menu: MENU,
  menuDetail: MENU_DETAIL,
  menuPage : MENU_PAGE,
  tag: TAG,
  tagDetail: TAG_DETAIL
}

module.exports = routes;



