const app=getApp();
Page({
  data: {
    name: '',
    gender: ['请选择您的性别', '男', '女'],
    nation:['请选择您的国籍','中籍', '外籍', '混血'],
    birthday: '2012-09-01',
    phone: '',
    organize:[{id:0,name:'请选择机构'}],
    // organize: '',
    region: ['浙江省', '湖州市', '吴兴区'],
    address: '',
    height: '',
    weight: '',
    shoeSize: '',
    bust: '', //胸围
    waist: '', //腰围
    hipline: '', //臀围
    profile: '', //自我介绍
    genderIndex: 0,
    natIndex: 0,
    orgIndex:0,
    idcard_front:'', //父母身份证正面
    idcard_front_url:'',
    idcard_back:'', //父母身份证反面
    idcard_back_url:'',
    house_parent:'', //父母身户口本页
    house_parent_url:'',
    house_self:'', //子女户口本页
    house_self_url:'',
    agreeItems: [
      {name: true, value: '同意', checked: false}
    ],
    isAgree:true
  },
  onLoad() {
    this.getAuth();
  },
  getAuth(){
    let organizeList=[]
    app.get('get_auth',{
      type:2,
      token:"c1"
    }).then(res=>{
      console.log(res)
      let user=res.data.user
      organizeList=this.data.organize.concat(res.data.organize)
      this.setData({
        organize:organizeList, //机构picker
        id:user.id?user.id:0,
        name:user.name?user.name:'',
        genderIndex:user.gender?user.gender:0,
        natIndex:user.nation?user.nation:0,
        birthday:user.birthday?user.birthday:'',
        phone:user.phone?user.phone:'',
        orgIndex:user.organize_id?user.organize_id:0,
        region:user.province?[user.province,user.city,user.area]:['浙江省', '湖州市', '吴兴区'],
        address:user.address?user.address:'',
        height:user.height?user.height:'',
        weight:user.weight?user.weight:'',
        shoeSize:user.shoe_size?user.shoe_size:'',
        bust:user.bwh?user.bwh.split(',')[0]:'',
        waist:user.bwh?user.bwh.split(',')[1]:'',
        hipline:user.bwh?user.bwh.split(',')[2]:'',
        profile:user.profile?user.profile:'',
        idcard_front:user.idcard_front?user.idcard_front:'',
        idcard_front_url:user.idcard_front?user.img_domain+user.idcard_front:'',
        idcard_back:user.idcard_back?user.idcard_back:'',
        idcard_back_url:user.idcard_back?user.img_domain+user.idcard_back:'',
        house_parent:user.house_parent?user.house_parent:'',
        house_parent_url:user.house_parent?user.img_domain+user.house_parent:'',
        house_self:user.house_self?user.house_self:'',
        house_self_url:user.house_self?user.img_domain+user.house_self:'',
      })
    })
  },

  //调用验证函数
  formSubmit(e) {
    let params=e.detail.value;
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
    if (!params.phone) {
      app.showToast("请输入手机号")
      return false;
    }
    let phoneReg = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
    if (!phoneReg.test(params.phone)) {
      app.showToast("请输入正确的手机号")
      return false;
    }
    if (params.organize==0) {
      app.showToast("请选择机构")
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
    if (!this.data.idcard_front||!this.data.idcard_back) {
      app.showToast("请上传身份证图片")
      return false;
    }
    if (!this.data.house_parent||!this.data.house_self) {
      app.showToast("请上传户口本图片")
      return false;
    }
    this.saveAuth(params);
  },
  saveAuth(params){
    console.log(params)
    app.post('save_auth',{
      type:2,
      id:this.data.id,
      name:params.name,
      phone	:params.phone,
      province:params.region[0],
      city:params.region[1],
      area:params.region[2],
      address:params.address,
      profile:params.profile,
      gender: params.gender,
      nation: params.nation,
      birthday:params.birthday,
      organize_id:params.organize,
      height:params.height,
      weight:params.weight,
      shoe_size:params.shoeSize,
      bwh:params.bust+","+params.waist+","+params.hipline,
      idcard_front:this.data.idcard_front,
      idcard_back:this.data.idcard_back,
      house_parent:this.data.house_parent,
      house_self:this.data.house_self,
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
    uploadIdcardFront(){
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
                  idcard_front: data.data.name,
                  idcard_front_url: data.data.url
                })
              }
            })
        }
      })
    },
    uploadIdcardBack(){
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
                  idcard_back: data.data.name,
                  idcard_back_url: data.data.url
                })
              }
            })
        }
      })
    },
    uploadHouseParent(){
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
                  house_parent : data.data.name,
                  house_parent_url: data.data.url
                })
              }
            })
        }
      })
    },
    uploadHouseSelf(){
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
                  house_self : data.data.name,
                  house_self_url: data.data.url
                })
              }
            })
        }
      })
    },
    /*上传图片结束 */
})