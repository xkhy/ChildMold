let utils=require("../../../../utils/util.js");
const app=getApp();
Page({
  data: {
    desc:'',
    name: '',
    gender: ['请选择所需模特性别', '男', '女'],
    nation:['请选择所需模特国籍','中籍', '外籍', '混血'],
    region: ['浙江省', '湖州市', '吴兴区'],
    address: '',
    height: '',
    startDate: utils.getDateStr(null,0),
    endDate: utils.getDateStr(null,1),
    genderIndex: 0,
    natIndex: 0,
    image:'',
    image_url:''
  },
  onLoad(options) {
    this.getDemand(options.id);
  },
  getDemand(id){
    app.get('demand_edit',{
      id:id,
      token:app.token
    }).then(res=>{
      console.log(res)
      let data=res.data
      this.setData({
        id:data.id,
        desc:data.desc,
        name:data.bus_name,
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
    if (!params.desc) {
      app.showToast("请输入需求说明")
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
    app.post('demand_save',{
      token:app.token,
      id:this.data.id?this.data.id:0,
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