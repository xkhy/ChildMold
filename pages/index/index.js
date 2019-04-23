const app = getApp();
Page({
  data: {
    bannner: [],
    models:[],
    type: "1",
    hasMore:true
  },
  onLoad() {
    // else{
    // if(app.token){
    //   console.log('第一次回调',app.token)
    //   this.setData({token:app.token})
    // }else{
    //   app.getSetting=()=>{
    //     console.log('再次回调',app.token)
    //     this.setData({token:app.token})
    //   }
    // }
    // if(this.data.token){
      this.getBanner();
      this.getModel();
    // }
    // }
  },
  getBanner() {
    app.get("getad",{
      token:app.token
    }).then(res => {
      console.log(res);
      if(res.status==200){
        wx.hideLoading();
        app.showToast('登录成功');
        this.setData({
          bannner: res.data
        });
      }else{
        wx.navigateTo({
          url: '/pages/login/login'
        })
      }
    });
  },
  toBannerDetail(e){
    let index=e.currentTarget.dataset.index;
    let bannerObj=this.data.bannner[index]
    console.log(bannerObj) 
    if(bannerObj.type!=1){
      bannerObj=JSON.stringify(bannerObj)
      wx.navigateTo({
        url: `./article/article?bannerObj=${bannerObj}`
      });
    }
  },
  getModel(pageNo=1) {
    app.get("index_product", {
      page:pageNo,
      order: this.data.type,
      token:app.token
    }).then(res => {
      console.log(res);
      console.log(res.data);
      if(res.status==200){
        if(res.data.length!=0){
          this.setData({
            page:pageNo,
            models: this.data.models.concat(res.data)
          });
        }else{
          this.setData({
            hasMore:false
          })
        }
      }else{
        app.showToast(res.msg)
      }     
    });
  },
  changeType(e){
    this.setData({
      type: e.currentTarget.dataset.type,
      models:[],
      page:1,
      hasMore:true
    })
    this.getModel();
  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },
  // 跳转model页
  toModel(e) {
    wx.navigateTo({
      url: `/pages/model/detail?id=${e.currentTarget.dataset.id}`
    });
  },
  onReachBottom() {
    if(this.data.hasMore){
      this.getModel(this.data.page + 1)
    }
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
              wx.navigateTo({
                url: '/pages/login/login'
              })
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
        }else {
          this.login(encryptedData,iv);
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
          this.getBanner();
          this.getModel();
        }else if(res.status==300){
          wx.navigateTo({
            url: '/pages/login/login'
          })
        }
      })
    },
  // toVote(e){
  //   wx.navigateTo({
  //     url: `/pages/vote/vote?id=${e.currentTarget.dataset.id}`
  //   });
  // }
});

// //index.js
// //获取应用实例
// const app = getApp()

// Page({
//   data: {
//     motto: 'Hello World',
//     userInfo: {},
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserInfo')
//   },
//   //事件处理函数
//   bindViewTap: function() {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onLoad: function () {
//     if (app.globalData.userInfo) {
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse){
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserInfo({
//         success: res => {
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//     }
//   },
//   getUserInfo: function(e) {
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   }
// })
