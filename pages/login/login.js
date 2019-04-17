//获取应用实例
const app = getApp()
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false,
  },

  onLoad: function (options) {

  },
  // 测试
  logo() {
    wx.login({ 
      success: function (res) {
        // console.log(res.code)
      },
    })
  },
  // 授权登录
  // getSetting() {
  //   let that = this
  //   wx.getSetting({
  //     success(res) {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 用户已经授权过,不需要显示授权页面,所以不需要改变 hasUserInfo 的值
  //         // 根据自己的需求有其他操作再补充
  //         // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
  //         wx.showLoading({
  //           title: '正在登录',
  //           mask: true
  //         })
  //         wx.login({
  //           success: function (res) {
  //             // console.log(res.code)
  //             app.get('login/userLogin.do', {
  //               code: res.code
  //             }).then(res => {
  //               // console.log(res)
  //               // wx.setStorageSync('session_key', res.session_key)
  //               // wx.setStorageSync('wxUser', res.wxUser)
  //               if (res.wxUser) {
  //                 app.openid = res.openid
  //                 app.thirdSessionId = res.thirdSessionId
  //                 // wx.setStorageSync("sessionid", res.thirdSessionId)
  //                 app.wxUser = res.wxUser
  //                 if (that.data.loginType == 0) {
  //                   wx.switchTab({
  //                     url: '/pages/index/index',
  //                     success() {
  //                       wx.hideLoading()
  //                       app.showToast('登录成功')
  //                     }
  //                   })
  //                 }  else if (that.data.loginType == 3) {
  //                   wx.redirectTo({
  //                     url: '/pages/index/third/third'
  //                   })
  //                 }
  //               } else {
  //                 that.setData({
  //                   hasUserInfo: false
  //                 })
  //               }
  //             })
  //           },
  //           fail(err) {
  //             wx.hideLoading()
  //             app.showToast('登录失败,请重新登录')
  //           }
  //         })
  //       } else {
  //         // 用户没有授权
  //         // 改变 hasUserInfo 的值，显示授权页面
  //         that.setData({
  //           hasUserInfo: false
  //         });
  //       }
  //     }
  //   });
  // },
  getMe(){
    app.get('me', {
      token: app.token
    }).then(res=>{
      console.log(res)
      app.user=res.data;
    })
  },
  setUerInfo(encryptedData,iv){
    app.post('setuserinfo', {
      token: app.token,
      encrypt:encryptedData,
      iv:iv
    }).then(res=>{
      console.log(res)
      if (res.status==200) {
        // wx.redirectTo({
        //   url: '/pages/index/phone/phone'
        // })
      } else {
        app.showToast('登录失败,请重新登录') 
        wx.login({
          success: function (res) {
            app.post('getsession', {
              js_code: res.code
            }).then(res => {
              console.log(res)
              if (res.status==200) {
                app.token = res.data.token;
                this.setUerInfo(encryptedData,iv);
                this.getMe();
              }else{
                app.showToast('登录失败,请重新登录') 
              }
            })
          }
        })
      }
    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      console.log(e.detail)
      this.setUerInfo(e.detail.encryptedData,e.detail.iv);
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!',
        showCancel: false,
        confirmText: '返回授权'
      });
    }
  },

})