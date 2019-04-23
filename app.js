//app.js
App({
    // base_url: 'http://192.168.0.107/',
    base_url: 'http://model.tongzgc.com/',
    token:'',
    user:{},
    isLogin:true,
    onLaunch() {
      // 登录
      // wx.login({
      //   success: res => {
      //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
      //     if (res.code) {
      //       console.log(res.code)
      //       // 发起网络请求
      //       this.post('getsession',{
      //         js_code:res.code
      //       }).then(res=>{
      //         console.log(res)
      //         this.token = res.data.token
      //         this.getSetting();
      //       })
      //     } else {
      //       console.log('登录失败！' + res.errMsg)
      //     }
      //   }
      // })
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
                this.setuUerInfo(res.encryptedData,res.iv);
                this.getMe();
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
    setuUerInfo(encryptedData,iv){
      this.post('setuserinfo', {
        token: this.token,
        encrypt:encryptedData,
        iv:iv
      }).then(res=>{
        console.log(res)
        if (res.status==200) {
          
        } else {
          this.showToast('登录失败,请重新登录') 
          wx.login({
            success(res) {
              this.post('getsession', {
                js_code: res.code
              }).then(res => {
                console.log(res)
                if (res.status==200) {
                  this.token = res.data.token;
                  this.setuUerInfo(encryptedData,iv);
                  this.getMe();
                }else{
                  this.showToast('登录失败,请重新登录') 
                }
              })
            }
          })
        }
      })
    },
    getMe(){
      this.get('me', {
        token: this.token
      }).then(res=>{
        console.log(res)
        this.user=res.data;
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
                  resolve(res.data);
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