const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:{}
  },
  onLoad: function (options) {
    let bannerObj =JSON.parse(options.bannerObj);
    console.log(bannerObj) 
    this.setData({
      banner:bannerObj
    })
  }
})