const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempImg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  uploadImg(){
    let that=this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.uploadFile({
          url: app.base_url+'upload_img',
          filePath: tempFilePaths[0],
          name: 'image',
          header: {
            "Content-Type": "multipart/form-data"
          },
          success(res) {
            let data = JSON.parse(res.data)
            console.log(data)
            that.setData({
              tempImg:tempFilePaths[0]
            })
          }
        })
      }
    })
  },
})