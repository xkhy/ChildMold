const app=getApp();
Page({
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
  /*图片预览*/
  previewImage(e) {
    let preUlrs = []
     this.data.userProduct.map(e=> {
        preUlrs.push(e.image);
      }
    );
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: preUlrs // 需要预览的图片http链接列表
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
      app.showToast(res.msg)
      res.status==200&&this.setData({
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