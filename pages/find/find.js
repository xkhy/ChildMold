const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    find:2,
    type:1,
    findList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDemand();
  },
  changeFind(e){
    this.setData({
      find: e.currentTarget.dataset.find
    })
  },
  changeType(e){
    this.setData({
      type: e.currentTarget.dataset.type
    })
    this.getDemand();
  },
  getDemand(){
    app.get('demand_index',{
      type:this.data.type,
      page:1
    }).then(res=>{
      console.log(res)
      this.setData({
        findList:res.data
      })
    })
  },
})