const app = getApp();
Page({
  data: {
    keyword: "",
    heightMin: "",
    heightMax: "",
    gender: "",
    region: ["xx省", "xx市", "xx区"],
    // customItem: "全部",
    showFilters: false,
    modelList: []
  },
  onLoad() {
    this.modelSearch();
  },
  search() {
    this.modelSearch();
  },
  confirm() {
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
        page: 1,
        keyword: this.data.keyword,
        gender: this.data.gender,
        height: heightMin+","+heightMax,
        city: this.data.region[1] != "xx市" ? this.data.region[1] : ""
      }).then(res => {
        console.log(res);
        this.setData({
          modelList: res.data,
          showFilters: false
        });
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
  }
});
