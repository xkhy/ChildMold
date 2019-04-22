const app=getApp();
Page({
  data: {
    phone: '',
    region: ['浙江省', '湖州市', '吴兴区'],
    address: '',
    profile:''
  },
  onLoad() {
    this.getUser();
  },
  getUser(){
    app.get('user_edit',{
      token:app.token
    }).then(res=>{
      console.log(res)
      let user=res.data
      this.setData({
        phone:user.phone,
        region:[user.province,user.city,user.area],
        address:user.address,
        profile:user.profile
      })
    })
  },

  //调用验证函数
  formSubmit(e) {
    let params=e.detail.value
    if (!params.phone) {
      app.showToast("请输入手机号")
      return false;
    }
    let phoneReg = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
    if (!phoneReg.test(params.phone)) {
      app.showToast("请输入正确的手机号")
      return false;
    }
    if (!params.address) {
      app.showToast("请输入详细地址")
      return false;
    }
    this.updateUser(params);
  },
  updateUser(params){
    console.log(params)
    app.post('user_update',{
      token:app.token,
      phone	:params.phone,
      province:params.region[0],
      city:params.region[1],
      area:params.region[2],
      address:params.address,
      profile:params.profile,
    }).then(res=>{
      console.log(res)
      app.showToast(res.msg)
      if(res.status==200){
        setTimeout(()=>{
          wx.navigateBack({
            delta: 1
          }) 
        },1000) 
      }
    })
  },
  bindRegionChange(e) {
    this.setData({
      region: e.detail.value
    })
  }
})