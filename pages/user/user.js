const app = getApp()
Page({
  data: {
    user:{}
  },
  onLoad(){
    this.setData({
      user:app.user
    })
  },
  toDetail(){
    let type = this.data.user.type==1?"busniess":"model"
    wx.navigateTo({
      url: `/pages/${type}/detail?id=${this.data.user.uid}`,
    })
  },
  toFollow(){
    let type = this.data.user.type==1?"busniess":"model"
    wx.navigateTo({
      url: `/pages/${type}/follow/follow`,
    })
  },
  goAuth(){
    let status=this.data.user.status 
    if(status==0){
      wx.navigateTo({
        url: './auth/auth'
      })
    }else if(status==1){
      app.showToast('请等待审核')
    }
  },
  contact(){
    wx.showModal({
      title: '拨打客服电话:',
      content: this.data.user.csh,
      success:(res)=> {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: this.data.user.csh,
            success: function(res) {
              console.log('拨打成功')
            }
          })
        }
      }
    })
  }
})