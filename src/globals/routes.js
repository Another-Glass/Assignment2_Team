//경로 변수들 모음

// Root
const ROOT = '/';

// User
const USER_SIGNUP = '/user';
const USER_SIGNIN = '/token';

// Menu
const MENU = '/menus';
const MENU_DETAIL = '/:menuId';

// Tag
const TAG = '/tags';
const TAG_DETAIL = '/:tagId';

// Item
const ITEM = '/items';
const ITEM_DETAIL = '/:itemId';

const routes = {
  root: ROOT,
  user: USER_SIGNUP,
  token: USER_SIGNIN,
  menu: MENU,
  menuDetail: MENU_DETAIL,
  tag: TAG,
  tagDetail: TAG_DETAIL,
  item: ITEM,
  itemDetail: ITEM_DETAIL
}

module.exports = routes;



