import * as types from '../mutation_types';
import * as storageKeys from '../storage_keys';

export const getCurrentUser = function () {
  return JSON.parse(localStorage.getItem(storageKeys.STORAGE_CURRENT_USER_KEY)) || {};
};

export const getCurrentMenu = function () {
  return JSON.parse(localStorage.getItem(storageKeys.STORAGE_CURRENT_MENU_KEY)) || [];
};

const localStorageMiddleware = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type == types.SET_CURRENT_USER) {
      localStorage.setItem(storageKeys.STORAGE_CURRENT_USER_KEY, JSON.stringify(state.base.CURRENT_USER));
    }
    if (mutation.type == types.SET_CURRENT_MENU) {
      localStorage.setItem(storageKeys.STORAGE_CURRENT_MENU_KEY, JSON.stringify(state.base.CURRENT_MENU));
    }
  });
};

export default localStorageMiddleware;
