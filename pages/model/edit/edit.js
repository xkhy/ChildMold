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
      token:app.token
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
    let phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (!phoneReg.test(params.phone)) {
      app.showToast("请输入正确的手机号")
      return false;
    }
    if (!params.address) {
      app.showToast("请输入详细地址")
      return false;
    }
    if (!params.height) {
      app.showToast("请输入身高")
      return false;
    }
    let heightReg = /^([1-9][0-9]{1,2})$/;
    if (!heightReg.test(params.height)) {
      app.showToast("请输入正确的身高")
      return false;
    }
    if (!params.weight) {
      app.showToast("请输入体重")
      return false;
    }
    let weightReg = /^(0(\.\d{1}){0,1}|[1-8]\d{1,3}(\.\d{1}){0,1}|9\d{1,2}(\.\d{1}){0,1}|999(\.0){0,1}|.{0})$/;
    if (!weightReg.test(params.weight)) {
      app.showToast("请输入正确的体重")
      return false;
    }    
    if (!params.shoeSize) {
      app.showToast("请输入鞋码")
      return false;
    }
    let shoeSizeReg = /^([1-5][0-9])$/;
    if (!shoeSizeReg.test(params.shoeSize)) {
      app.showToast("请输入正确的鞋码")
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
      height:params.height,
      weight:params.weight,
      shoe_size:params.shoeSize,
      bwh:params.bust+','+params.waist+','+params.hipline
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
              formData:{
                token:app.token,
              },
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