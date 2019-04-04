const app = getApp();
Page({
  data: {
    imgUrls: [],
    models:[],
    type:2
  },
  onLoad() {
    this.getMyFollow();
  },
  getMyFollow() {
    app.get("my_follow", {
      type: this.data.type,
      page:1
    }).then(res => {
      console.log(res);
      console.log(res.data);
      this.setData({
        models: res.data
      });
    });
  },
  changeType(e){
    this.setData({
      type: e.currentTarget.dataset.type
    })
    this.getMyFollow();
  },
  // 跳转model页
  toModel(e) {
    wx.navigateTo({
      url: `/pages/model/details?id=${e.currentTarget.dataset.id}`
    });
  }
});
