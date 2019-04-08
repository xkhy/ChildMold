const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:1,
    tempImgs:[],
    imgs:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let title="";
    if(this.data.type==1){
      title="我的图库"
    }else{
      title="我的作品"
    }
    wx.setNavigationBarTitle({
      title: title
    })
  },
  uploadImg(){
    let that=this
    wx.chooseImage({
      count: 9,
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
              let imgs=that.data.imgs.concat(data.data)
              that.setData({
                imgs:imgs
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
        preUlrs.push(value);
      }
    );
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: preUlrs // 需要预览的图片http链接列表
    })
  },
  /*图片删除*/
  deleteImage: function (e) {
    var that = this;
    var files = that.data.files;
    var index = e.currentTarget.dataset.index; //获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          files.splice(index, 1);
        } else if (res.cancel) {
          return false;
        }
        that.setData({
          files,
          isCanAddFile: true
        });
      }
    })
  },
  // 长按触发操作面板
  showActionSheet(e){
    console.log(e.currentTarget.dataset.id)
    let json = this.data.imgs
    wx.showActionSheet({
      itemList: ['选为默认', 'B', 'C'],
      success(res) {
        console.log(res.tapIndex)
        const is_show=0;
        if(res.tapIndex==is_show){
          // 找到数据中的该对象，加一个字段is_show:true

        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },  
  save(){
    app.post("save_product",{
      json:JSON.stringify(this.data.imgs)
    }).then(res=>{
      console.log(res)
    })
  }
})