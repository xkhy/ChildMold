//app.js
App({
  // base_url: 'http://192.168.0.107/',
  base_url: 'http://model.tongzgc.com/',
  token:'',
  user:{},
  isLogin:'',
  onLaunch() {
    // if(this.getSetting){
      this.getSetting();
    // }
  },
    // 获取用户信息
    getSetting(){
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                console.log(res)
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo
                this.login(res.encryptedData,res.iv);
                // this.setuUerInfo(res.encryptedData,res.iv);
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }else{
            console.log('未授权,应该去登录页')
            this.isLogin=false;
          }
        }
      })
  },
  // 登录
  login(encryptedData,iv){
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          console.log(res.code)
          // 发起网络请求
          this.post('getsession',{
            js_code:res.code
          }).then(res=>{
            console.log(res)
            this.token = res.data.token
            this.setuUerInfo(encryptedData,iv);
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  setuUerInfo(encryptedData,iv){
    this.post('setuserinfo', {
      token: this.token,
      encrypt:encryptedData,
      iv:iv
    }).then(res=>{
      console.log(res)
      if (res.status==200) {
        this.getMe();
      }else {
        this.getSetting();
      }
    })
  },
  getMe(){
    this.get('me', {
      token: this.token
    }).then(res=>{
      console.log(res)
      if(res.status==200){
        this.user=res.data;
        this.isLogin=true;
      }else if(res.status==300){
        this.isLogin=false;
      }
    })
  },
  request: function (api, params, method) {
    var _this = this;
    var promise = new Promise((resolve, reject) => {
      wx.request({
        url: _this.base_url + api,
        data: params,
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        method: method,
        success: function (res) {
          // wx.hideLoading()
          if (res.statusCode == 200) {
            switch (res.data.status) {
              case 200:
                resolve(res.data);
                break;
              case 300:
                wx.navigateTo({
                  url: '/pages/login/login',
                })
                resolve('300了要重登了'+res.data);
              case 500:
                resolve(res.data);
                // _this.showToast(res.msg)
                break;
            }
            // resolve(res.data);
          } 
          else {
            wx.showToast({
              title: res.msg,
              icon: 'loading',
              duration: 2000
            })
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
          // reject(res);
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
  // 提示框
  showToast(msg,icon="none"){
    wx.showToast({
      title: msg,
      icon: icon
    })
  },
  // 确认框
  showModal(error) {
    wx.showModal({
      content: error,
      showCancel: false,
    })
  },
  globalData: {
    userInfo: null
  }
})