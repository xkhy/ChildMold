const app = getApp();
Page({
  data: {
    bannner: [],
    models:[],
    type: "1",
    hasMore:true
  },
  onLoad() {
    // else{
    // if(app.token){
    //   console.log('第一次回调',app.token)
    //   this.setData({token:app.token})
    // }else{
    //   app.getSetting=()=>{
    //     console.log('再次回调',app.token)
    //     this.setData({token:app.token})
    //   }
    // }
    // if(this.data.token){
      this.getBanner();
      this.getModel();
    // }
    // }
  },
  getBanner() {
    app.get("getad",{
      token:app.token
    }).then(res => {
      console.log(res);
      if(res.status==200){
        wx.hideLoading();
        app.showToast('登录成功');
        this.setData({
          bannner: res.data
        });
      }else{
        wx.redirectTo({
          url: '/pages/login/login'
        })
      }
    });
  },
  toBannerDetail(e){
    let index=e.currentTarget.dataset.index;
    let bannerObj=this.data.bannner[index]
    console.log(bannerObj) 
    if(bannerObj.type!=1){
      bannerObj=JSON.stringify(bannerObj)
      wx.navigateTo({
        url: `./article/article?bannerObj=${bannerObj}`
      });
    }
  },
  getModel(pageNo=1) {
    app.get("index_product", {
      page:pageNo,
      order: this.data.type,
      token:app.token
    }).then(res => {
      console.log(res);
      console.log(res.data);
      if(res.status==200){
        if(res.data.length!=0){
          this.setData({
            page:pageNo,
            models: this.data.models.concat(res.data)
          });
        }else{
          this.setData({
            hasMore:false
          })
        }
      }
      // else{
      //   app.showToast("请先登录")
      // }     
    });
  },
  changeType(e){
    this.setData({
      type: e.currentTarget.dataset.type,
      models:[],
      page:1,
      hasMore:true
    })
    this.getModel();
  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },
  // 跳转model页
  toModel(e) {
    wx.navigateTo({
      url: `/pages/model/detail?id=${e.currentTarget.dataset.id}`
    });
  },
  onReachBottom() {
    if(this.data.hasMore){
      this.getModel(this.data.page + 1)
    }
  },
  onShareAppMessage(res){
    return {
      title: '',
      path: '/pages/login/login',
      success: function (res) { 
      that.shareClick();
      }
    }
  }
});
