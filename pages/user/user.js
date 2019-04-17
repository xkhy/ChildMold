const app = getApp()
Page({
  data: {
    type:2,
    user:{}
  },
  onLoad(){
    this.setData({
      user:app.user
    })
  },
  toDetail(){
    let type = this.data.type==1?"busniess":"model"
    wx.navigateTo({
      url: `/pages/${type}/detail?id=${this.data.user.uid}`,
    })
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