const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userBanners:[],
    userInfo:{},
    isFollow: false,
  },
  onLoad(options){
    this.setData({id:options.id})
    this.getBanner();
    this.getUserInfo();
  },
  getBanner(){
    app.get('user_banner',{
      type:1,
      id: this.data.id,
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
      type:1, //商家
      id:this.data.id,
      token:app.token
    }).then(res=>{
      console.log(res)
      this.setData({
        userInfo: res.data
      })
    })
  },
  // 关注
  follow() {
    app.get('followed', {
      type: 1,
      id: this.data.id,
      token: app.token
    }).then(res => {
      console.log(res)
      app.showToast(res.msg)
      this.setData({
        isFollow: res.data.is_followed
      })
    })
  },
  // 跳转编辑
  eidt(){

  },
})