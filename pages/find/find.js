const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    find:1,
    type:1,
    findList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getModel();
  },
  changeFind(e){
    this.setData({
      find: e.currentTarget.dataset.find
    })
    this.getModel();
  },
  changeType(e){
    this.setData({
      type: e.currentTarget.dataset.type
    })
    this.getModel();
  },
  getModel(){
    app.get('my_demand',{
      type:1,
      page:1
    }).then(res=>{
      console.log(res)
      this.setData({
        findList:res.data
      })
    })
  },
})