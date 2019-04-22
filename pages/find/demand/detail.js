const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    demandInfo:{}
  },
  onLoad: function (options) {
    this.getDemandInfo(options.id)
  },
  getDemandInfo(id){
    app.get("demand_info",{
      id:id,
      token:app.token
    }).then(res=>{
      console.log(res)
      this.setData({
        demandInfo:res.data
      })
    })
  },
  toUserDetail(){
    wx.navigateTo({
      url: `/pages/busniess/detail?id=${this.data.demandInfo.user_id}`
    })
  }
})