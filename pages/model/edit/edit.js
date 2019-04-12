const app=getApp();
Page({
  data: {
    phone: '',
    region: [],
    address: '',
    height:'',
    weight:'',
    shoeSize:'',
    bust: '', //胸围
    waist: '', //腰围
    hipline: '', //臀围
    profile: '', //自我介绍
  },
  onLoad() {
    this.getUser();
  },
  getUser(){
    app.get('user_edit',{
      token:"c1"
    }).then(res=>{
      console.log(res)
      let user=res.data
      this.setData({
        phone:user.phone,
        region:[user.province,user.city,user.area],
        address:user.address,
        profile:user.profile,
        height:user.height,
        weight:user.weight,
        shoeSize:user.shoe_size,
        bust: user.bwh.split(',')[0],
        waist:user.bwh.split(',')[1],
        hipline: user.bwh.split(',')[2],
        profile: user.profile,
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
      token:'c1',
      phone	:params.phone,
      province:params.region[0],
      city:params.region[1],
      area:params.region[2],
      address:params.address,
      profile:params.profile,
      height:params.height,
      weight:params.weight,
      shoe_size:params.shoeSize,
      bwh:params.bust+','+params.waist+','+params.hipline
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