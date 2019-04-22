const app = getApp();
Page({
  data: {
    followList:[],
    hasMore:true
  },
  onShow() {
    this.getMyFollow();
  },
  onHide(){
    this.setData({
      followList: [],
      hasMore:true
    });
  },
  getMyFollow(pageNo=1) {
    app.get("my_follow", {
      type: 2, // 只能关注童模
      page:pageNo,
      token:app.token
    }).then(res => {
      console.log(res);
      console.log(res.data);
      if(res.status==200){
        if(res.data.length!=0){
          this.setData({
            page:pageNo,
            followList: this.data.followList.concat(res.data)  
          });
        }else{
          this.setData({hasMore:false})
        }
      }else{
        app.showToast(res.msg)
      }      
    });
  },
  // 跳转model页
  toDetail(e) {
    wx.navigateTo({
      url: `/pages/model/detail?id=${e.currentTarget.dataset.id}`
    });
  },
  onReachBottom(){
    if(this.data.hasMore){
      this.getMyFollow(this.data.page+1);
    }
  }
});
