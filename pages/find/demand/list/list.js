const app = getApp();
Page({
  data: {
    demandList: [],
    startX: 0, //开始坐标
    startY: 0,
    hasMore:true
  },
  onLoad: function(options) {
    this.getMyDemand();
  },
  getMyDemand(pageNo=1) {
    app.get("my_demand", {
        page: pageNo,
        token: app.token
      }).then(res => {
        console.log(res);
        let demandList = res.data;
        if(demandList.length!=0){
          demandList.forEach(e => {
            e.isTouchMove = false; // 默认隐藏删除
          });
          this.setData({
            page:pageNo,
            demandList: this.data.demandList.concat(demandList)
          });
        }else{
          this.setData({
            hasMore:false
          })
        }
      });
  },
  deleteDemand(id) {
    app.post("demand_del", {
      id:id,
      token: app.token
      }).then(res => {
        console.log(res);
        app.showToast(res.msg)
      });
  },
  toEdit(e){
    wx.navigateTo({
      url: `../release/release?id=${e.currentTarget.dataset.id}`
    })
  },
  toRelease(){
    wx.navigateTo({
      url: `../release/release`
    })  
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart(e) {
    //开始触摸时 重置所有删除
    this.data.demandList.forEach(v=> {
      if (v.isTouchMove)
        //只操作为true的
        v.isTouchMove = false;
    });
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      demandList: this.data.demandList
    });
  },

  //滑动事件处理

  touchmove(e) {
    var that = this,
      index = e.currentTarget.dataset.index, //当前索引
      startX = that.data.startX, //开始X坐标
      startY = that.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = that.angle(
        { X: startX, Y: startY },
        { X: touchMoveX, Y: touchMoveY }
      );
      that.data.demandList.forEach((v,i)=> {
      v.isTouchMove = false;
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX)
          //右滑
          v.isTouchMove = false;
        //左滑
        else {
          v.isTouchMove = true;
        }
      }
    });
    //更新数据
    that.setData({
      demandList: that.data.demandList
    });
  },
  /**
    * 计算滑动角度
    * @param {Object} start 起点坐标
    * @param {Object} end 终点坐标
    */

  angle(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y;

    //返回角度 /Math.atan()返回数字的反正切值

    return (360 * Math.atan(_Y / _X)) / (2 * Math.PI);
  },

  //删除事件
  del(e){
    this.deleteDemand(e.currentTarget.dataset.id);
    this.data.demandList.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      demandList: this.data.demandList
    });
  },
  onReachBottom() {
    if(this.data.hasMore){
      this.getMyDemand(this.data.page + 1)
    }
  }
});
