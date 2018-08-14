function Str2Hex(s) {
  var c = "";
  var n;
  var ss = "0123456789ABCDEF";
  var digS = "";
  for (var i = 0; i < s.length; i++) {
    c = s.charAt(i);
    n = ss.indexOf(c);
    digS += Dec2Dig(eval(n));

  }
  //return value;
  return digS;
}

function Dec2Dig(n1) {
  var s = "";
  var n2 = 0;
  for (var i = 0; i < 4; i++) {
    n2 = Math.pow(2, 3 - i);
    if (n1 >= n2) {
      s += '1';
      n1 = n1 - n2;
    } else
      s += '0';

  }
  return s;

}

function Dig2Dec(s) {
  var retV = 0;
  if (s.length == 4) {
    for (var i = 0; i < 4; i++) {
      retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);
    }
    return retV;
  }
  return -1;
}

function Hex2Utf8(s) {
  var retS = "";
  var tempS = "";
  var ss = "";
  if (s.length == 16) {
    tempS = "1110" + s.substring(0, 4);
    tempS += "10" + s.substring(4, 10);
    tempS += "10" + s.substring(10, 16);
    var sss = "0123456789ABCDEF";
    for (var i = 0; i < 3; i++) {
      retS += "%";
      ss = tempS.substring(i * 8, (eval(i) + 1) * 8);


      retS += sss.charAt(Dig2Dec(ss.substring(0, 4)));
      retS += sss.charAt(Dig2Dec(ss.substring(4, 8)));
    }
    return retS;
  }
  return "";
}

function trim(text) {
  return text == null ?
    "" :
    ( text + "" ).replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}

export default {
  //将对象转为序列化的字符串,sp为分隔符,默认为&
  serialize: function (obj, sp) {
    var str = '';
    sp = sp ? sp : '&';
    for (var i in obj) {
      if (typeof obj[i] !== 'undefined' && obj[i] !== '') {
        str += i + '=' + encodeURIComponent(obj[i]);
        str += sp;
      }
    }
    if (str.length > 0) {
      str = str.substring(0, str.length - 1);
    }
    return str;
  },
  serializePrint: function (obj, sp) {
    var str = '';
    sp = sp ? sp : '&';
    for (var i in obj) {
      if (typeof obj[i] !== 'undefined' && obj[i] !== '') {
        str += i + '=' + obj[i];
        str += sp;
      }
    }
    if (str.length > 0) {
      str = str.substring(0, str.length - 1);
    }
    return str;
  },
  //将序列化字符串解析为对象，sp为分隔符,默认为&
  serializeObject: function (str, sp) {
    var o = {};
    sp = sp ? sp : '&';
    var arr = str.split(sp);
    for (var i = 0; i < arr.length; i++) {
      var key = arr[i].split('=')[0];
      var value = arr[i].split('=')[1];
      if (typeof value != 'undefined') {
        o[key] = decodeURIComponent(value);
      }
    }
    return o;
  },
  //获取UNIX时间戳
  getUNIXTimestamp: function () {
    return Math.round(new Date().getTime() / 1000);
  },
  //获取指定时间点的Date,参数分别为天，时，分，秒
  getExpiredays: function (d, h, m, s) {
    var nd = new Date();
    var day = d | 0;
    var hour = h | 0;
    var minite = m | 0;
    var second = s | 0;
    var expiresDate = new Date(nd.getTime() + (d * 24 * 3600 + (hour) * 3600 + minite * 60 + second) * 1000);
    console.log(expiresDate);
    return expiresDate;
  },
  each: function (arr, callback) {
    if (typeof arr != 'undefined') {
      if (Object.prototype.toString.call(arr) === '[object Array]') {
        for (var i = 0; i < arr.length; i++) {
          if (callback.call(arr, i) === false) {
            break;
          }
        }
      } else {
        for (var i in arr) {
          if (callback.call(arr, i) === false) {
            break;
          }
        }
      }
    }
  },
  rnd: function (n, m) {
    var random = Math.floor(Math.random() * (m - n + 1) + n);
    return random;
  },
  isType: function (type, obj) {
    return {}.toString.call(obj) == "[object " + type + "]";
  },
  isObject: function (obj) {
    return this.isType("Object", obj);
  },
  isString: function (str) {
    return this.isType("String", str);
  },
  isArray: function (arr) {
    return Array.isArray(arr) || this.isType("Array", arr);
  },
  isFunction: function (func) {
    return this.isType("Function", func);
  },
  isUndefined: function (und) {
    return this.isType("Undefined", und);
  },
  isFloat: function (str) {
    return str && /^-?\d*(\.\d+)?$/.test(str);
  },
  isPositiveFloat: function (str) {
    return str && /^\d+\.\d+$/.test(str);
  },
  isNotLessThanZero: function (str) {
    return ~~(str * 100) >= 0;
  },
  isOneDigitFloat: function (str) {
    return str && /^-?\d*(\.\d)?$/.test(str);
  },
  isTwoDigitFloat: function (str) {
    // ^\d+\.\d\d$
    return str && /^-?\d*(\.\d\d)?$/.test(str);
  },
  isInteger: function (str) {
    return str && str % 1 === 0 && str > 0;
  },
  isMostTwoDigitFloat:function (str) {
    return str && /^\d+(?:\.\d{1,2})?$/.test(str);
  },
  EncodeUtf8: function (s1) {
    // escape函数用于对除英文字母外的字符进行编码。如“Visit W3School!”->"Visit%20W3School%21"
    var s = escape(s1);
    var sa = s.split("%"); //sa[1]=u6211
    var retV = "";
    if (sa[0] != "") {
      retV = sa[0];
    }
    for (var i = 1; i < sa.length; i++) {
      if (sa[i].substring(0, 1) == "u") {
        retV += Hex2Utf8(Str2Hex(sa[i].substring(1, 5)));
        if (sa[i].length >= 6) {
          retV += sa[i].substring(5);
        }
      } else retV += "%" + sa[i];
    }
    return retV;
  },
  getFileExtension: function (filename) {
    var tempArr = filename.split(".");
    var ext;
    if (tempArr.length === 1 || (tempArr[0] === "" && tempArr.length === 2)) {
      ext = "";
    } else {
      ext = tempArr.pop().toLowerCase(); //get the extension and make it lower-case
    }
    return ext;
  },
  getFileRealName: function (filename) {
    // var tempArr = filename.split(".");
    // var name;
    // if (tempArr.length === 1 || (tempArr[0] === "" && tempArr.length === 2)) {
    //     name = "";
    // } else if (tempArr.length === 2) {
    //     name = tempArr.shift();
    // } else {
    //     tempArr.pop();
    //     name = tempArr.join('.');
    // }
    // return window.encodeURIComponent(name);
    var guid = function () {
      var s4 = function () {
        const rand = (1 + Math.random()) * 0x10000;
        return (rand | 0).toString(16).substring(1)
      };
      // return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
      return `${s4()}${s4()}${s4()}${s4()}`;
    };
    return (new Date()).getTime() + '_' + guid();
  },
  compareFloat: function (a, b) {
    return ~~(a * 100) > ~~(b * 100);
  },
  hasClass: (dom, cls) => {
    return dom.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
  },
  addClass: (dom, cls) => {
    if (!utils.hasClass(dom, cls)) dom.className += " " + cls;
  },
  removeClass: (dom, cls) => {
    if (utils.hasClass(dom, cls)) {
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      dom.className = dom.className.replace(reg, ' ');
    }
  },
  deUnicode: (value) => {
    return value && value.split(/\\/).length > 1 ? value.split(/\\/).filter(data => data).map(data => String.fromCharCode(data.replace(/\u/g, '0x'))).join('') : value;
  },
  trim,
  formatDate: {
    format: function (date, pattern) {
      pattern = pattern || 'yyyy-MM-dd';
      const padding = (s, len) => {
        len = len - (s + '').length;
        for (let i = 0; i < len; i++) {
          s = '0' + s;
        }
        return s;
      };
      return pattern.replace(/([yMdhsm])(\1*)/g, function ($0) {
        switch ($0.charAt(0)) {
          case 'y':
            return padding(date.getFullYear(), $0.length);
          case 'M':
            return padding(date.getMonth() + 1, $0.length);
          case 'd':
            return padding(date.getDate(), $0.length);
          case 'w':
            return date.getDay() + 1;
          case 'h':
            return padding(date.getHours(), $0.length);
          case 'm':
            return padding(date.getMinutes(), $0.length);
          case 's':
            return padding(date.getSeconds(), $0.length);
        }
      });
    }
  },
  /**
   * 设置cookie
   * @param name
   * @param value
   * @param expires
   * @param path
   * @param domain
   */
  setCookie: function (name, value, expires, path, domain) {
    if (expires) {
      expires = new Date(new Date().getTime() + expires * 1000);
    }
    document.cookie = name + "=" + encodeURIComponent(value) + ((expires) ? "; expires=" + expires.toGMTString() : "") + ((path) ? "; path=" + path : "; path=/") + ((domain) ? ";domain=" + domain : "");
  },
  /**
   * 取cookie
   * @param name
   * @returns {*}
   */
  getCookie: function (name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) {
      return decodeURIComponent(arr[2]);
    }
    return null;
  },
  /**
   * 清cookie
   * @param name
   * @param path
   * @param domain
   */
  clearCookie: function (name, path, domain) {
    if (this.getCookie(name)) {
      document.cookie = name + "=" + ((path) ? "; path=" + path : "; path=/") + ((domain) ? "; domain=" + domain : "") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT";
    }
  },
  // insert b(array) into a[i]...
  // [].splice.apply(a,[i,0].concat(b))
  uni2str: function(str){
    var result = [];
    var strArr = str.split('\\u');//根据 \u 分割
    var len = strArr.length;
    for(var i=0; i<len; i++){
      if(strArr[i]){
        result.push(String.fromCharCode(parseInt(strArr[i], 16)));//16 转 10
      }
    }
    return result.join('');
  },
  // undefined, null ,'', NaN, [], {}, 0, false 为 true，其他为 false
  isEmpty: function(arg){
    if(arg == null || arg === '' || arg === undefined) {
      return true;
    }
    // 如果是空数组
    if(Array.isArray(arg) && arg.length === 0){
      return true;
    }

    if(typeof arg == 'string'){
      return trim(arg) === '';
    }

    // 如果是空对象
    try {
      if(typeof arg === 'object') {
        let str = JSON.stringify(arg);
        if(str === '{}') {
          return true;
        } else {
          return false;
        }
      }
    } catch (e) {
      return false;
    }
  },

  // 过滤请求字段
  filterParams: function(formData, keys) {
    let _data = JSON.parse(JSON.stringify(formData));
    let _keys = '';
    // 如果列出需要的字段
    if(Array.isArray(keys)) {
      _keys = keys.join('');
    }
    for(let [key, value] of Object.entries(_data)) {
      if (value === '' || value === undefined || value === null) {
        delete _data[key];
      }
      if(_keys && _keys.indexOf(key) === -1) {
        delete _data[key];
      }
    }
    return _data;
  }
}
