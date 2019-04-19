const app = getApp();
Page({
  data: {
    followList:[],
    type:2 // 1商家 2童模
  },
  onShow() {
    this.getMyFollow();
  },
  getMyFollow() {
    app.get("my_follow", {
      type: this.data.type,
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
  changeType(e){
    this.setData({
      followList:[],
      type: e.currentTarget.dataset.type
    })
    this.getMyFollow();
  },
  // 跳转model页
  toDetail(e) {
   let type = this.data.type==1?"busniess":"model";
    wx.navigateTo({
      url: `/pages/${type}/detail?id=${e.currentTarget.dataset.id}`
    });
  }
});
