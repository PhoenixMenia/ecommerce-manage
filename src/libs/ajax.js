import axios from 'axios';
import {
  Message
} from 'element-ui';
import utils from '@/libs/utils'
import AJAX_URL from '@/config/index'
// Make alias(or override) for done and fail func...
// So we do NOT need to modify old code while using Axios/Promise
Promise.prototype.done = Promise.prototype.then;
Promise.prototype.fail = function (fn) {
  return this.then(null, function (args) {
    return fn.apply(this, [args.code || '1', args.message || args.msg || '请求失败']);
  });
};
let refererUrl = '';
refererUrl = AJAX_URL['baseUrl'] + "/wxb_admin/#/wzp_admin/home";
try {
  if (WZP && typeof WZP.print === 'function') {
    refererUrl = AJAX_URL['baseUrl'] + "/wxb_admin/#/wzp_admin/pos";
  }
} catch (e) {
  // error...
}
const fetch = (options) => {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      // timeout: 2000, // 超时
      headers: {
        'Referer-Source': refererUrl, //window.location.href
      },
      withCredentials: true
    });
    instance(options)
      .then(response => {
        let res = response.data;
        switch (res.code) {
          case 0:
            resolve(res.data);
            break;
          case "0":
            resolve(res.data);
            break;
          case -1001:
            Message({
              message: '登录已失效，请重新登录',
              type: 'error',
              // duration: 5 * 1000
            });
            window.setTimeout(function () {
              window.location.href = AJAX_URL['authFailPage'];
            }, 2000);
            break;
          default:
            reject(res);
        }
      })
      .catch(error => {
        Message({
          message: '服务器繁忙，请稍后重试',
          type: 'error',
          // duration: 5 * 1000
        });
      });
  });
};
export default {
  refererUrl,
  get: (url, sendData, serverType) => {
    let data = sendData;
    // avoid cache...
    if (data) {
      data._ = utils.getUNIXTimestamp();
    } else {
      data = {
        _: utils.getUNIXTimestamp()
      };
    }
    // check https://github.com/mzabriskie/axios#request-config for more details
    // use params
    return fetch({
      url: AJAX_URL[url] || url,
      method: 'get',
      params: data
    });
  },
  post: (api, sendData, flag, serverType) => {
    if (flag == 'JSON') {
      let _sendData = Object.assign({}, sendData);
      for (let i in _sendData) {
        if (_sendData[i] === '' || _sendData[i].length === 0) {
          delete _sendData[i];
        }
      }
      return fetch({
        url: AJAX_URL[api],
        method: 'post',
        data: _sendData,
        headers: {
          'Content-Type': 'application/json'
        },
      });
    } else {
      let realSendData = '';
      realSendData = '_time=' + utils.getUNIXTimestamp();
      if (flag === 'ARRAY') {
        if (sendData && Object.keys(sendData).length > 0) {
          for (key in sendData) {
            realSendData += '&' + key + '=' + JSON.stringify(sendData[key]);
          }
        }
      } else {
        if (sendData && Object.keys(sendData).length > 0) {
          realSendData += '&' + utils.serialize(sendData);
        }
      }
      return fetch({
        url: AJAX_URL[api],
        method: 'post',
        data: realSendData,
      });
    }
  },
  postArr: (api, sendData, flag, serverType) => {
    let realSendData = '';
    // realSendData = '_time=' + utils.getUNIXTimestamp();
    if (flag === 'ARRAY') {
      if (sendData) {
        // let inx = 0;
        // for (let key in sendData) {
        //   realSendData += (inx !== 0 ? '&' : '') + key + '=' + (utils.isArray(sendData[key]) || utils.isObject(sendData[key]) ? JSON.stringify(sendData[key]) : sendData[key]);
        //   inx++;
        // }
        realSendData = sendData;
      }
    } else {
      if (sendData) {
        realSendData += '&' + utils.serialize(sendData, '&', true);
      }
    }
    return fetch({
      url: AJAX_URL[api],
      method: 'post',
      data: realSendData,
      headers: {
        'Content-Type': serverType || 'application/x-www-form-urlencoded'
      }
    });
  },
  postPrint: (api, sendData, flag, serverType) => {
    let realSendData = '';
    // realSendData = '_time=' + utils.getUNIXTimestamp();
    if (flag === 'ARRAY') {
      if (sendData) {
        // let inx = 0;
        // for (let key in sendData) {
        //   realSendData += (inx !== 0 ? '&' : '') + key + '=' + (utils.isArray(sendData[key]) || utils.isObject(sendData[key]) ? JSON.stringify(sendData[key]) : sendData[key]);
        //   inx++;
        // }
        realSendData = sendData;
      }
    } else {
      if (sendData) {
        realSendData += '&' + utils.serializePrint(sendData, '&', true);
      }
    }
    return fetch({
      url: AJAX_URL[api],
      method: 'post',
      data: realSendData,
      headers: {
        'Content-Type': serverType || 'application/x-www-form-urlencoded'
      }
    });
  },
  ajax:(url, opts) => {
    return fetch({
      url: AJAX_URL[url] || url,
      method: opts.method,
      params: opts.params,
      data: opts.data,
    });
  }
}
