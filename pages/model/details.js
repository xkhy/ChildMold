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
    this.getBanner();
    this.getUserInfo();
    this.getUserProduct();
  },
  getBanner(){
    app.get('user_banner',{
      type:2,
      id:this.data.id
    }).then(res=>{
      console.log(res)
      this.setData({
        userBanners: res.data
      })
    })
  },
  getUserInfo(){
    app.get('user_info',{
      type:2,
      id:this.data.id
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
      id: this.data.id
    }).then(res=>{
      console.log(res)
      this.setData({
        userProduct: res.data.imgs
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
      id: this.data.id
    }).then(res=>{
      console.log(res)
      if(res.status==500){
        wx.showToast({
          title: res.msg,
          icon:"none"
        })
        return
      }
      this.setData({
        isFollow: res.data.is_followed
      })
      
    })
  },
  // 跳转编辑
  eidt(){

  }
})