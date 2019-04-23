const app = getApp();
Page({
  data: {
    keyword: "",
    heightMin: "",
    heightMax: "",
    gender: "",
    region: ["xx省", "xx市", "xx区"],
    showFilters: false,
    modelList: [],
    page:1,
    hasMore:true
  },
  onLoad() {
    this.modelSearch();
  },
  search() {
    this.setData({
      modelList: [],
      page:1,
      hasMore:true
    })
    this.modelSearch();
  },
  confirm() {
    this.setData({
      modelList: [],
      page:1,
      hasMore:true
    })
    this.modelSearch();
  },
  reset() {
    this.setData({
      keyword: "",
      heightMin: "",
      heightMax: "",
      gender: "",
      region: ["xx省", "xx市", "xx区"]
    });
  },
  // 筛选搜索
  modelSearch() {
    let heightMin= this.data.heightMin?this.data.heightMin:0;
    let heightMax= this.data.heightMax?this.data.heightMax:0;
    app.get("child_search", {
        page: this.data.page,
        keyword: this.data.keyword,
        gender: this.data.gender,
        height: heightMin+","+heightMax,
        city: this.data.region[1] != "xx市" ? this.data.region[1] : "",
        token:app.token
      }).then(res => {
        console.log(res);
        if(res.status==200){
          if(res.data.length!=0){
            this.setData({
              modelList:  this.data.modelList.concat(res.data),
              showFilters: false
            })
          }
          else{
            this.setData({
              hasMore:false
            })
          }
        }else{
          app.showToast(res.msg)
        }
      });
  },
  getHeightMin(e){
    this.setData({
      heightMin: e.detail.value
    });
  },
  getHeightMax(e){
    console.log(e.detail.va)
    this.setData({
      heightMax: e.detail.value
    });
  },
  getKeyword(e) {
    this.setData({
      keyword: e.detail.value
    });
  },
  changeGender(e) {
    console.log(e.currentTarget.dataset.gender);
    this.setData({
      gender: e.currentTarget.dataset.gender
    });
  },
  toggleFilters() {
    this.setData({
      showFilters: !this.data.showFilters
    });
  },
  bindRegionChange(e) {
    console.log("picker发送选择改变，携带值为", e.detail.value);
    this.setData({
      region: e.detail.value
    });
  },
  toModel(e) {
    wx.navigateTo({
      url: `/pages/model/detail?id=${e.currentTarget.dataset.id}`
    });
  },
  onReachBottom() {
    if(this.data.hasMore){
      this.setData({
        page:this.data.page+1
      })
      this.modelSearch();
    }
  }
});
