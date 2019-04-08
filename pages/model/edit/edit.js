// pages/model/model.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      "../../assets/images/model1.png",
      "../../assets/images/model2.png",
      "../../assets/images/model3.png",
      "../../assets/images/model1.png",
      "../../assets/images/model2.png",
      "../../assets/images/model3.png",
      "../../assets/images/model1.png",
      "../../assets/images/model2.png",
      "../../assets/images/model3.png"
    ],
    current: "tab1"
  },
  handleChange({ detail }) {
    var index = detail.key;
    console.log(index);
    this.setData({
      current: index
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
