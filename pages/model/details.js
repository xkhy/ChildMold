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
    current: 'tab1',
    type:1
  },
  onLoad(){
    this.getBanner();
    this.getUserInfo();
  },
  getBanner(){
    app.get('user_banner',{
      type:2,
      id:2
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
      id:2
    }).then(res=>{
      console.log(res)
      this.setData({
        userInfo: res.data
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

  },
  // 跳转编辑
  eidt(){

  }
})