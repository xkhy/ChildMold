const app = getApp();
Page({
  data: {
    imgUrls: [],
    models:[],
    modelList: [
      "/assets/images/model1.png",
      "/assets/images/model2.png",
      "/assets/images/model3.png",
      "/assets/images/model1.png",
      "/assets/images/model2.png",
      "/assets/images/model3.png",
      "/assets/images/model1.png",
      "/assets/images/model2.png",
      "/assets/images/model3.png"
    ],
    type: "1"
  },
  onLoad() {
    // this.getBanner();
    // this.getModel();
  },
  getBanner() {
    app.get("getad").then(res => {
      console.log(res);
      this.setData({
        imgUrls: res.data
      });
    });
  },
  getModel() {
    app.get("index_product", {
      page:1,
      order: this.data.type
    }).then(res => {
      console.log(res);
      console.log(res.data);
      this.setData({
        models: res.data
      });
    });
  },
  changeType(e){
    this.setData({
      type: e.currentTarget.dataset.type
    })
    this.getModel();
  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },
  // 跳转model页
  toModel() {
    wx.navigateTo({
      url: "/pages/details/details"
    });
  }
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
