let baseUrl = ""

if (process.env.NODE_ENV === 'production') {
  baseUrl = "https://www.wangxiaobao.cc";
}

if (process.env.NODE_ENV === 'test') {
  baseUrl = 'http://www.wangxiaobao.co';
}

if (process.env.NODE_ENV === 'dev') {
  baseUrl = 'http://dev.wangxiaobao.co';
}

if (process.env.NODE_ENV === 'preview') {
  baseUrl = 'http://preview.wangxiaobao.co';
}

if (process.env.NODE_ENV === 'development') {
  // baseUrl = 'http://192.168.100.12';
  // baseUrl = 'http://192.168.100.21:8080';
  // baseUrl = 'http://192.168.100.242:8080';
  // baseUrl = 'http://192.168.100.37:8080'
}

export default {
  'baseUrl': baseUrl,
  'authFailPage': baseUrl + '/login/timeout'
}
