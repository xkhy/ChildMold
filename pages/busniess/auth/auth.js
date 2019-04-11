const app=getApp();
Page({
  data: {
    name: '',
    phone: '',
    region: ['浙江省', '湖州市', '吴兴区'],
    address: '',
    bizlicense:'', //营业执照
    bizlicense_url:'',
    agreeItems: [
      {name: true, value: '同意', checked: false}
    ],
    isAgree:true
  },
  onLoad() {
    this.getAuth();
  },
  getAuth(){
    app.get('get_auth',{
      type:1,
      token:"b1"
    }).then(res=>{
      console.log(res)
      let user=res.data.user
      this.setData({
        name:user.name?user.name:'',
        phone:user.phone?user.phone:'',
        region:user.province?[user.province,user.city,user.area]:['浙江省', '湖州市', '吴兴区'],
        address:user.address?user.address:'',
        profile:user.profile?user.profile:'',
        bizlicense:user.bizlicense?user.bizlicense:'',
        bizlicense_url:user.bizlicense?user.img_domain+user.bizlicense:'',
      })
    })
  },

  //调用验证函数
  formSubmit(e) {
    let params=e.detail.value
    // console.log(e.detail.value)
    // const params = e.detail.value
    if (!params.name) {
      app.showToast("请输入姓名")
      return false;
    }
    let nameReg = /^[\u4E00-\u9FA5A-Za-z\s]+(·[\u4E00-\u9FA5A-Za-z]+)*$/;
    if (!nameReg.test(params.name)) {
      app.showToast("请输入正确的姓名")
      return false;
    }
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
    if (!this.data.bizlicense) {
      app.showToast("请上传营业执照图片")
      return false;
    }
    this.saveAuth(params);
  },
  saveAuth(params){
    console.log(params)
    app.post('save_auth',{
      type:1,
      name:params.name,
      phone	:params.phone,
      province:params.region[0],
      city:params.region[1],
      area:params.region[2],
      address:params.address,
      profile:params.profile,
      bizlicense:this.data.bizlicense
    }).then(res=>{
      console.log(res)
      app.showToast(res.msg)
    })
  },

  bindGenderChange(e) {
    this.setData({
      genderIndex: e.detail.value
    })
  },
  bindNatChange(e) {
    this.setData({
      natIndex: e.detail.value
    })
  },
  bindBirthdayChange(e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  bindOrgChange(e){
    this.setData({
      orgIndex: e.detail.value
    })
  },
  bindRegionChange(e) {
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
    /*上传图片开始 */
    uploadBizlicense(){
      let that=this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          const tempFilePaths = res.tempFilePaths[0]
          console.log(tempFilePaths)
            wx.uploadFile({
              url: app.base_url+'upload_img',
              filePath: tempFilePaths,
              name: 'image',
              header: {
                "Content-Type": "multipart/form-data"
              },
              success(res) {
                let data = JSON.parse(res.data)
                console.log(data.data)
                that.setData({
                  bizlicense: data.data.name,
                  bizlicense_url: data.data.url
                })
              }
            })
        }
      })
    },
    /*上传图片结束 */
})