const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeInfo:{}
  },
  onLoad: function (options) {
    this.getNoticeInfo(options.id)
  },
  getNoticeInfo(id){
    app.get("notice_info",{
      id:id,
      token:app.token
    }).then(res=>{
      console.log(res)
      this.setData({
        noticeInfo:res.data
      })
    })
  }
})