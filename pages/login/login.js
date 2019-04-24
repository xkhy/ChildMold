//获取应用实例
const app = getApp()
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    authSetting: true
  },

  onLoad: function (options) {
    this.getSetting();
  },
      // 获取用户信息
      getSetting(){
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              console.log('可以')
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: res => {
                  console.log(res)
                  this.login(res.encryptedData,res.iv);
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            }else{
              this.setData({ authSetting:false })
            }
          }
        })
      },
    // 登录
    login(encryptedData,iv){
      wx.login({
        success: res => {
          if (res.code) {
            console.log(res.code)
            // 发起网络请求
            app.post('getsession',{
              js_code:res.code
            }).then(res=>{
              console.log(res)
              app.token = res.data.token
              this.setUerInfo(encryptedData,iv);
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
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
          this.getMe();
        } else {
          this.getSetting();
        }
      })
    },
  getMe(){
    app.get('me', {
      token: app.token
    }).then(res=>{
      console.log(res)
      if(res.status==200){
        app.user=res.data;
        wx.switchTab({
          url: '/pages/index/index',
          success(){
            wx.showLoading({
              title: '正在登录',
              mask: true
            });
            // app.showToast('登录成功')
          }
        })
      }else{
        app.showToast(res.msg)
      }
    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      console.log(e.detail)
      this.login(e.detail.encryptedData,e.detail.iv);
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