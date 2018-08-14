import * as types from '../mutation_types';
import {
  getCurrentUser,
  getCurrentMenu
} from '../midwares/localStorageDao.js';

// initial state
const state = {
  tabNav: [],
  currentPageClass: '',
  SYS_VERSION: '1.0',
  CURRENT_ORG: {},
  BELONG_ORG: [],
  CURRENT_USER: getCurrentUser(),
  CURRENT_MENU: {},
  CURRENT_MENU_POS: {},
  vipInfo: {},
  creditInfo: {},
  cardInfo: {},
  transCard: {},
  cardListInfo: {},
  vipStatus: '',
  rulesDetail: [],
  rulesId: '',
  WxToken: '',
  tradeSourceList: {
    "1": '门店POS',
    "2": '自助',
    "3": '公众号',
    "4": '推荐返利'
  },
  TYPE_LIST: {
    "1": "储值充值",
    "2": "储值充值撤销",
    "3": "储值赠送",
    "4": "储值赠送撤销",
    "5": "储值消费",
    "6": "储值消费撤销",
    "7": "实收金额",
    "8": "实收金额撤销",
    "9": "积分奖励",
    "10": "积分奖励撤销",
    "11": "积分消费",
    "12": "积分消费撤销",
    "13": "代金券消费",
    "14": "礼品券消费",
    "17": "推荐奖励"
  }
};

// getters
const getters = {
  TYPE_LIST: state => state.TYPE_LIST,
  tradeSourceList: state => state.tradeSourceList,
  tabNav: state => state.tabNav,
  currentPageClass: state => state.currentPageClass,
  SYS_VERSION: state => state.SYS_VERSION,
  CURRENT_USER: state => state.CURRENT_USER,
  CURRENT_MENU: state => state.CURRENT_MENU,
  CURRENT_MENU_POS: state => state.CURRENT_MENU_POS,
  vipInfo: state => state.vipInfo,
  creditInfo: state => state.creditInfo,
  cardInfo: state => state.cardInfo,
  transCard: state => state.transCard,
  cardListInfo: state => state.cardListInfo,
  vipStatus: state => state.vipStatus,
  rulesDetail: state => state.rulesDetail,
  rulesId: state => state.rulesId,
  WxToken: state => state.WxToken
};

// actions
const actions = {
  addTabNavItem({
    commit
  }, item) {
    commit(types.ADD_TAB_NAV_ITEM, item);
  },
  setBelongOrg ({
    commit
  }, orgList) {
    commit(types.SET_BELONG_ORG, orgList);
  },
  removeTabNavItem({
    commit
  }, targetName) {
    commit(types.REMOVE_TAB_NAV_ITEM, targetName);
  },
  setPageClass({
    commit
  }, str) {
    commit(types.SET_CURRENT_PAGE_CLASS, str)
  },
  setWxToken({
    commit
  }, str) {
    commit(types.SET_WX_TOKEN, str)
  },
  setCurrentOrg({
    commit
  }, obj) {
    commit(types.SET_CURRENT_ORG, obj)
  },
  setCurrentUser({
    commit
  }, obj) {
    commit(types.SET_CURRENT_USER, obj)
  },
  setCurrentMenu({
    commit
  }, arr) {
    commit(types.SET_CURRENT_MENU, arr)
  },
  setCurrentMenuPos({
    commit
  }, arr) {
    commit(types.SET_CURRENT_MENU_POS, arr)
  },
  setVipInfo({
    commit
  }, item) {
    commit(types.SET_VIP_INFO, item)
  },
  setCreditInfo({
    commit
  }, item) {
    commit(types.SET_CREDIT_INFO, item)
  },
  setCardInfo({
    commit
  }, item) {
    commit(types.SET_CARD_INFO, item)
  },
  setTransCard({
    commit
  }, item) {
    commit(types.SET_TRANS_CARD, item)
  },
  setCardListInfo({
    commit
  }, item) {
    commit(types.SET_CARD_LIST_INFO, item)
  },
  setVipStatus({
    commit
  }, str) {
    commit(types.SET_VIP_STATUS, str)
  },
  setRulesDetail({
    commit
  }, item) {
    commit(types.SET_RULES_DETAIL, item)
  },
  setRulesId({
    commit
  }, str) {
    commit(types.SET_RULES_ID, str)
  },
};

// mutations
const mutations = {
  [types.ADD_TAB_NAV_ITEM](state, item) {
    state.tabNav.unshift({
      name: item.name,
      title: item.title,
      params: item.params
    })
  },
  [types.SET_BELONG_ORG] (state, orgList) {
    state.BELONG_ORG = orgList || [];
  },
  [types.REMOVE_TAB_NAV_ITEM](state, title) {
    state.tabNav = state.tabNav.filter(function (tab) {
      return tab.title !== title;
    })
  },
  [types.SET_CURRENT_PAGE_CLASS](state, str) {
    state.currentPageClass = str;
  },
  [types.SET_WX_TOKEN](state, str) {
    state.WxToken = str;
  },
  [types.SET_CURRENT_ORG](state, obj) {
    state.CURRENT_ORG = obj || {};
  },
  [types.SET_CURRENT_USER](state, obj) {
    state.CURRENT_USER = obj;
  },
  [types.SET_CURRENT_MENU](state, arr) {
    state.CURRENT_MENU = arr;
  },
  [types.SET_CURRENT_MENU_POS](state, arr) {
    state.CURRENT_MENU_POS = arr;
  },
  [types.SET_VIP_INFO](state, item) {
    state.vipInfo = item;
  },
  [types.SET_CREDIT_INFO](state, item) {
    state.creditInfo = item;
  },
  [types.SET_CARD_INFO](state, item) {
    state.cardInfo = item;
  },
  [types.SET_TRANS_CARD](state, item) {
    state.transCard = item;
  },
  [types.SET_CARD_LIST_INFO](state, item) {
    state.cardListInfo = item;
  },
  [types.SET_VIP_STATUS](state, str) {
    state.vipStatus = str;
  },
  [types.SET_RULES_DETAIL](state, item) {
    state.rulesDetail = item;
  },
  [types.SET_RULES_ID](state, str) {
    state.rulesId = str;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
}
