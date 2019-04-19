const app = getApp();
Page({
  data: {
    followList:[]
  },
  onLoad() {
    this.getMyFollow();
  },
  getMyFollow() {
    app.get("my_follow", {
      type: 2, // 只能关注童模
      page:1,
      token:app.token
    }).then(res => {
      console.log(res);
      console.log(res.data);
      this.setData({
        followList: res.data
      });
    });
  },
  // 跳转model页
  toDetail(e) {
    wx.navigateTo({
      url: `/pages/model/detail?id=${e.currentTarget.dataset.id}`
    });
  }
});
