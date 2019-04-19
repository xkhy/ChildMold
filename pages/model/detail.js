const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userBanners:[],
    userInfo:{},
    userProduct: [],
    isFollow:false,
    type:1 //tab栏
  },
  onLoad(options){
    this.setData({
      id:options.id
    })
  },
  onShow(){
    this.getBanner();
    this.getUserInfo();
    this.getUserProduct();
  },
  getBanner(){
    app.get('user_banner',{
      type:2,
      id:this.data.id,
      token:app.token
    }).then(res=>{
      console.log(res)
      this.setData({
        userBanners: res.data
      })
    })
  },
  getUserInfo(){
    app.get('user_info',{
      type:2, //童模
      id:this.data.id,
      token:app.token
    }).then(res=>{
      console.log(res)
      this.setData({
        userInfo:res.data,
        isFollow:res.data.is_follow
      })
    })
  },
  getUserProduct(){
    app.get('user_product',{
      id: this.data.id,
      token:app.token
    }).then(res=>{
      console.log(res)
      this.setData({
        userProduct: res.data.imgs?res.data.imgs:[]
      })
    })
  },
  changeType(e){
    this.setData({
      type: e.currentTarget.dataset.type
    })
  },
  // 关注
  follow(){
    app.get('followed',{
      type:2,
      id: this.data.id,
      token:app.token
    }).then(res=>{
      console.log(res)
      // if(res.status==500){
      //   app.showToast(res.msg)
      //   return
      // }
      wx.showToast({
        title: res.msg,
        icon:"none"
      })
      this.setData({
        isFollow: res.data.is_followed
      })
    })
  },
  // 跳转编辑
  toEdit(){
    let url=  this.data.type==1?'./edit/edit':'../user/photo/photo';
    wx.navigateTo({
      url: url
    })
  }
})