const utils=require("../../../../utils/util.js");
const app=getApp();
Page({
  data: {
    type:'',
    id:0,
    name: '',
    title:'',
    desc:'',
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
    if(options.id){
      this.getNotice(options.id);
    }else{
      this.addNotice();
    }
  },
  // 获取发布者的信息渲染到表单上，无需填写
  addNotice(){
   app.get('notice_add',{
     token:app.token
   }).then(res=>{
     console.log(res)
     let data=res.data
     this.setData({
       type:data.type,
       name:data.name,
       genderIndex:data.gender?data.gender:0,
       natIndex:data.nation?data.nation:0,
       height:data.height?data.height:''
     })
   })
  }, 
  getNotice(id){
    app.get('notice_edit',{
      id:id,
      token:app.token
    }).then(res=>{
      console.log(res)
      let data=res.data
      this.setData({
        type:data.type,
        id:data.id,
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
      app.showToast("请输入拍摄内容")
      return false;
    }
    if(this.data.type==1){
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
      token:app.token,
      id:this.data.id,
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
      res.status==200&&setTimeout(() => {
       wx.navigateBack({
         delta: 1
       })
      // let pages = getCurrentPages();//获取页面栈
      // console.log(pages)
      //   if (pages.length > 1) {
      //   //上一个页面实例对象
      //   let prePage = pages[pages.length - 2];
      // console.log(prePage)
      //   //调用上一个页面的onShow方法
      //   prePage.changeData()
      //   } 
      }, 1000);
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
                  image: data.data.name,
                  image_url: data.data.url
                })
              }
            })
        }
      })
    }
})