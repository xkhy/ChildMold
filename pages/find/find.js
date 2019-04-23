const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    find:1, // 1需求 2通告
    type:1, // 1全部 2关注 3附近
    findList:[],
    latitude:'',
    longitude:'',
    hasMore:true,
    page:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDemand();
  },
  getLocation(){
    wx.getLocation({
      type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
      success:(res=> {
        this.setData({
          latitude:res.latitude,
          longitude:res.longitude
        })
        if(this.data.find==1){
          this.getDemand();
        }else{
          this.getNotice();
        }
      })
    })
  },  
  changeFind(e){
    this.setData({
      find: e.currentTarget.dataset.find,
      findList:[],
      page:1,
      hasMore:true
    })
    if(this.data.type==3){
      this.getLocation();
    }else{
      if(this.data.find==1){
        this.getDemand();
      }else{
        this.getNotice();
      }
    }
  },
  changeType(e){
    this.setData({
      type: e.currentTarget.dataset.type,
      findList:[],
      page:1,
      hasMore:true
    })
    if(this.data.type==3){
      this.getLocation();
    }else{
      if(this.data.find==1){
        this.getDemand();
      }else{
        this.getNotice();
      }
    }
  },
  // 需求列表
  getDemand(){
    app.get('demand_index',{
      type:this.data.type,
      page:this.data.page,
      lng:this.data.type==3?this.data.longitude:'',
      lat:this.data.type==3?this.data.latitude:'',
      token:app.token
    }).then(res=>{
      console.log(res)
      if(res.status==200){
        if(res.data.length!=0){
          this.setData({
            findList: this.data.findList.concat(res.data)
          })
        }else{
          this.setData({
            hasMore:false
          })
        }
      }else{
        app.showToast(res.msg)
      }
    })
  },
  // 通告列表
  getNotice(){
    app.get('notice_index',{
      type:this.data.type,
      page:this.data.page,
      lng:this.data.type==3?this.data.longitude:'',
      lat:this.data.type==3?this.data.latitude:'',
      token:app.token
    }).then(res=>{
      console.log(res)
      if(res.status==200){
        if(res.data.length!=0){
          this.setData({
            findList: this.data.findList.concat(res.data)
          })
        }else{
          this.setData({
            hasMore:false
          })
        }
      }else{
        app.showToast(res.msg)        
      }
    })
  },
  toDetail(e){
    let id = e.currentTarget.dataset.id;
    let url="";
    if(this.data.find==1){
      url=`./demand/detail?id=${id}`
    } else{
      url=`./notice/detail?id=${id}` 
    }
    wx.navigateTo({
      url: url
    })
  },
  onReachBottom() {
    if(this.data.hasMore){
      this.setData({
        page:this.data.page+1
      })
      if(this.data.find==1){
        this.getDemand();
      }else{
        this.getNotice();   
      }
    }
    // this.setData({
    //   page:this.data.page+1
    // })
    // if(this.data.find==1){
    //   this.data.hasMore&&this.getDemand();
    // }else{
    //   this.data.hasMore&&this.getNotice();   
    // }
  }
})