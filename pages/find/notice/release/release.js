const app=getApp();
Page({
  data: {
    title:'',
    desc:'',
    name: '',
    gender: ['请选择所需模特性别', '男', '女'],
    nation:['请选择所需模特国籍','中籍', '外籍', '混血'],
    region: ['浙江省', '湖州市', '吴兴区'],
    address: '',
    height: '',
    startDate: '2019-09-01',
    endDate: '2019-09-02',
    genderIndex: 0,
    natIndex: 0,
    image:'',
    image_url:''
  },
  onLoad() {
    this.getNotice();
  },
  getNotice(){
    app.get('notice_edit',{
      id:2,
      token:"b1"
    }).then(res=>{
      console.log(res)
      let data=res.data
      this.setData({
        type:data.type,
        id:data.id?data.id:0,
        title:data.title,
        desc:data.desc,
        name:data.child_name?data.child_name:data.bus_name,
        genderIndex:data.gender,
        natIndex:data.nation,
        height:data.height,
        startDate:data.work_date.split(',')[0],
        endDate:data.work_date.split(',')[1],
        region:data.province?[data.province,data.city,data.area]:['浙江省', '湖州市', '吴兴区'],
        address:data.address,
        image:data.image,
        image_url:data.img_domain+data.image
        })
    })
  },

  //调用验证函数
  formSubmit(e) {
    let params=e.detail.value;
    if (!params.title) {
      app.showToast("请输入拍摄主题")
      return false;
    }
    if (!params.desc) {
      app.showToast("请输入拍摄主题")
      return false;
    }
    if (!params.name) {
      app.showToast("请输入姓名")
      return false;
    }
    let nameReg = /^[\u4E00-\u9FA5A-Za-z\s]+(·[\u4E00-\u9FA5A-Za-z]+)*$/;
    if (!nameReg.test(params.name)) {
      app.showToast("请输入正确的姓名")
      return false;
    }
    if (params.gender==0) {
      app.showToast("请选择性别")
      return false;
    }
    if (params.nation==0) {
      app.showToast("请选择国籍")
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
    if (!params.address) {
      app.showToast("请输入详细地址")
      return false;
    }
    if (!this.data.image_url) {
      app.showToast("请上传图片")
      return false;
    }
    this.saveNotice(params);
  },
  saveNotice(params){
    console.log(params)
    app.post('notice_save',{
      token:"b1",
      id:this.data.id?this.data.id:0,
      title:params.title,
      desc:params.desc,
      province:params.region[0],
      city:params.region[1],
      area:params.region[2],
      address:params.address,
      gender: params.gender,
      nation: params.nation,
      work_date:params.startDate+','+params.endDate,
      height:params.height,
      image:this.data.image,
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
  bindStartDateChange(e) {
    this.setData({
      startDate: e.detail.value
    })
  },
  bindEndDateChange(e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  bindRegionChange(e) {
    this.setData({
      region: e.detail.value
    })
  },
    uploadImage(){
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
                  image: data.data.name,
                  image_url: data.data.url
                })
              }
            })
        }
      })
    }
})