const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userBanners:[],
    userInfo:{},
    imgUrls: [
      "../../assets/images/model_banner.png",
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
  },
  onLoad(){
    this.getBanner();
    this.getUserInfo();
  },
  getBanner(){
    app.get('user_banner',{
      type:1,
      id:1
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
      id:1
    }).then(res=>{
      console.log(res)
      this.setData({
        userInfo: res.data
      })
    })
  },
  // 关注
  follow(){

  },
  // 跳转编辑
  eidt(){

  },
})