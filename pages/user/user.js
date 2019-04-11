const app = getApp()
Page({
  data: {
    type:2,
    is_auth:true,
    id:1
  },
  toDetail(){
    let type = this.data.type==1?"busniess":"model"
    wx.navigateTo({
      url: `/pages/${type}/detail?id=${this.data.id}`,
    })
  },
  contact(){
    wx.showModal({
      title: '拨打客服电话:',
      content: '17857094953',
      success(res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: '17857094953',
            success: function(res) {
              console.log('拨打成功')
            }
          })
        }
      }
    })
  }
})