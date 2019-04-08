const app = getApp()
Page({
  data: {
    userType:2
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