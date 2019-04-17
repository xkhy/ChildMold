const app = getApp();
Page({
  data: {
    noticeList: {},
    startX: 0, //开始坐标
    startY: 0
  },
  onLoad: function(options) {
    this.getMyNotice();
  },
  getMyNotice() {
    app.get("my_notice", {
        page: 1, // TODO 分页
        token: app.token
      }).then(res => {
        console.log(res);
        let noticeList = res.data;
        noticeList.forEach(e => {
          e.isTouchMove = false; // 默认隐藏删除
        });
        this.setData({
          noticeList: noticeList
        });
      });
  },
  deleteNotice(id) {
    app.post("notice_del", {
      id:id,
      token: app.token
      }).then(res => {
        console.log(res);
        let noticeList = res.data;
        noticeList.forEach(e => {
          e.isTouchMove = false; // 默认隐藏删除
        });
        this.setData({
          noticeList: noticeList
        });
      });
  },
  toDetail(e){
    wx.navigateTo({
      url: `../detail?id=${e.currentTarget.dataset.id}`
    })  
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart(e) {
    //开始触摸时 重置所有删除
    this.data.noticeList.forEach(v=> {
      if (v.isTouchMove)
        //只操作为true的
        v.isTouchMove = false;
    });

    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      noticeList: this.data.noticeList
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
      that.data.noticeList.forEach((v,i)=> {
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
      noticeList: that.data.noticeList
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
    this.deleteNotice(e.currentTarget.dataset.id);
    this.data.noticeList.splice(e.currentTarget.dataset.index, 1);
  }
  // del(e) {
  //   this.data.noticeList.splice(e.currentTarget.dataset.index, 1);
  //   this.setData({
  //     noticeList: this.data.noticeList
  //   });
  // }
});
