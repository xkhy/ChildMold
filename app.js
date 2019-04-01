//app.js
App({
  base_url: 'http://192.168.0.107/',
  // onLaunch: function () {
  //   // 登录
  //   wx.login({
  //     success: res => {
  //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //     }
  //   })
  //   // 获取用户信息
  //   wx.getSetting({
  //     success: res => {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //         wx.getUserInfo({
  //           success: res => {
  //             // 可以将 res 发送给后台解码出 unionId
  //             this.globalData.userInfo = res.userInfo

  //             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //             // 所以此处加入 callback 以防止这种情况
  //             if (this.userInfoReadyCallback) {
  //               this.userInfoReadyCallback(res)
  //             }
  //           }
  //         })
  //       }
  //     }
  //   })
  // },
  request: function (api, params, method) {
    var _this = this;
    var promise = new Promise((resolve, reject) => {
      wx.request({
        url: _this.base_url + api,
        data: params,
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'cookie': wx.getStorageSync('JSESSIONID')
        },
        method: method,
        success: function (res) {
          wx.hideLoading()
          if (res.statusCode == 200) {
            resolve(res.data);
          } else {
            reject(res.data);
          }
        },
        fail: function(res){
          setTimeout(function () {
            wx.hideLoading();
          }, 100);
          wx.showToast({
            title: '服务器暂时无法连接',
            icon: 'loading',
            duration: 2000
          })
          reject(res);
        }
      })
    });
    return promise;
  },
  get: function (api, params) {
    return this.request(api, params, 'GET');
  },
  //POST请求
  post: function (api, params) {
    return this.request(api, params, 'POST');
  },
  globalData: {
    userInfo: null
  }
})