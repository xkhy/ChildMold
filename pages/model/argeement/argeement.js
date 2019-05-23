var WxParse = require('../../../wxParse/wxParse.js');
const app=getApp();
Page({
  data:{
    // agreement: ''
  },
  onLoad:function(options){
    this.getAgreement();
  },
  getAgreement(){
    var that = this;
    app.get('agreement', {
      token: app.token
    }).then(res => {
      console.log(res)
      if(res)
      // that.setData({
      //   agreement: res.data.agreement
      // })
      WxParse.wxParse('article', 'html', res.data.agreement, that, 5);
    })
  }
})