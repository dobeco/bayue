import config from './config.js'

const tips = {
  1: "抱歉出现了一个错误",
  1005: "appkey无效",
  3000: "期刊不存在"

}

class HTTP {
  constructor() {
    this.baseRestUrl = config.api_blink_url
  }

  request({url, resolve, data = {}, method = "GET"}) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)

    })

  };

  _request( url,resolve,reject,data = {},method = "GET") {

    wx.request({
      url: config.api_blink_url + url,
      data: data,
      method: method,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: res => {
        // 判断以2（2xx)开头的状态码为正确
        // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
        let code = res.statusCode.toString();
        let startChar = code.charAt(0);
        if (startChar == '2') {
          resolve(res.data);
        } else {
          reject();
          let error_code = res.data.error_code;
          this._show_error(error_code)
        }
      },
      fail: function (err) {
        reject()
        this._show_error(1)
      }
    });
  }
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip? tip: tips[1],
      icon: 'none',
      duration: 2000
    })
  }
};

export default HTTP;