const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'',
    tempImgs:[],
    imgs:[],
    maxCount:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type:app.user.type,
      maxCount:app.user.type==1?3:9
    })
    wx.setNavigationBarTitle({
      title: this.data.type==1?"我的图库":"我的作品"
    })
    this.getProduct()
  },
  getProduct(){
    app.get("my_product",{
      token:app.token
    }).then(res=>{
      console.log(res)
      let product= res.data.imgs
      product.forEach(e=>{
        e.url= res.data.img_domain+e.name
      })
      this.setData({
        imgs:product
      })
    })
  },
  uploadImg(){
    let that=this
    wx.chooseImage({
      count: this.data.maxCount,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        let temp=that.data.tempImgs.concat(tempFilePaths)
        that.setData({
          tempImgs :temp
        })
        let tempImgs=[];
        if(that.data.imgs.length>=that.data.maxCount){
          app.showToast("最多可上传9张")
          return
        }
        tempFilePaths.forEach(element => {
          wx.uploadFile({
            url: app.base_url+'upload_img',
            filePath: element,
            name: 'image',
            header: {
              "Content-Type": "multipart/form-data"
            },
            success(res) {
              let data = JSON.parse(res.data)
              console.log(data)
              let imgObj ={
                id:0,
                name:data.data.name,
                url:data.data.url,
                is_show:false
              }
              let uploadImgs = that.data.imgs;
              if(uploadImgs.length>=that.data.maxCount){
                uploadImgs.splice(uploadImgs.length-1,1)
              }
              uploadImgs.push(imgObj)
              console.log(that.data.imgs)
              that.setData({
                imgs:uploadImgs
              })
            }
          })
        });
      }
    })
  },
   /*图片预览*/
   previewImage: function (e) {
    var preUlrs = [];
    this.data.imgs.map(
      function (value, index) {
        preUlrs.push(value.url);
      }
    );
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: preUlrs // 需要预览的图片http链接列表
    })
  },
  /*图片删除*/
  deleteImage: function (e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index; //获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success:res => {
        if (res.confirm) {
          imgs.splice(index, 1);
        } else if (res.cancel) {
          return false;
        }
        this.setData({
          imgs:imgs
        });
      }
    })
  },
  // 长按触发操作面板
  showActionSheet(e){
    let index = e.currentTarget.dataset.index
    console.log(index)
    let imgs=this.data.imgs
    wx.showActionSheet({
      // 判断是否已经设为默认了
      itemList: imgs[index].is_show?['取消设为封面']:['设为封面'],
      success:res=> {
        console.log(res.tapIndex)
        // 设为默认
        const setShow=0;
        if(res.tapIndex==setShow){
          // 找到数组中的该对象，把字段is_show取反
          // 检测当前设为默认的图片是否超过了3张
          let showImgs=this.data.imgs.filter((item)=>{
            return item.is_show==true
          })
          // 当已经设置3张时，可以取消设置封面，但是继续设置就会警告
          if(showImgs.length==3){
            let has_show = imgs[index].is_show? 1:0
            if(has_show){
              imgs[index].is_show=false
            }else{
              app.showToast("最多可设置3张展示图")
            }
          }else{
              imgs[index].is_show = !imgs[index].is_show
          }
          this.setData({
            imgs: imgs
          })
        }
      }
    })
  },  
  save(){
    let saveImgs=this.data.imgs
    saveImgs.forEach(e=>{
      e=JSON.stringify(e)
    })
    console.log(saveImgs)
    app.post("save_product",{
      json:JSON.stringify(this.data.imgs),
      token:app.token
    }).then(res=>{
      console.log(res)
      app.showToast(res.msg)
      setTimeout(()=>{
        wx.navigateBack({
          delta: 1
        })
      },1000)
    })
  }
})