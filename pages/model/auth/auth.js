Page({
  data: {
    gender: ['请选择您的性别', '男', '女'],
    nationality:['请选择您的国籍','中籍', '外籍', '混血'],
    birthday: '2012-09-01',
    region: ['浙江省', '湖州市', '吴兴区'],
    address: '',
    height: '',
    weight: '',
    shoeSize: '',
    bust: '',
    waist: '',
    hipline: '',
    intro: '',
    genderIndex: 0,
    natIndex: 0,
    agreeItems: [
      {name: true, value: '同意', checked: false}
    ],
    isAgree:true

  },

  bindGenderChange(e) {
    console.log('性别发送选择改变，携带值为', e.detail.value)
    this.setData({
      genderIndex: e.detail.value
    })
  },
  bindNatChange(e) {
    console.log('国籍发送选择改变，携带值为', e.detail.value)
    this.setData({
      natIndex: e.detail.value
    })
  },
  bindBirthdayChange(e) {
    console.log('生日发送选择改变，携带值为', e.detail.value)
    this.setData({
      birthday: e.detail.value
    })
  },
  bindRegionChange(e) {
    console.log('地区发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  toggleAgree:function(e){
    let items = this.data.agreeItems;
    items[0].checked = !(items[0].checked);
    items[0].name = !(items[0].name);
    this.setData({
      agreeItems: items,
      isAgree: items[0].name
    });
  },
  agreeChange(e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.data.isAgree = e.detail.value;
    console.log(this.data.isAgree);
    if(this.data.isAgree) {

    }
  },
  formSubmit: function (e) {
    // console.log('form发生了submit事件，提交数据：', e.detail.value)
    // wx.request({
    //   url: '',
    //   data: {
    //     'nickname': e.detail.value.nickname,
    //     'password': e.detail.value.password,
    //   },
    //   method:'POST',
    //   header: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  }
})