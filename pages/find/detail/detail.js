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
      id:id
    }).then(res=>{
      console.log(res)
      this.setData({
        demandInfo:res.data
      })
    })
  }
})