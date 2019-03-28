Page({
  data: {
      showFilters: false,
      modelList: [
        "/assets/images/model1.png",
        "/assets/images/model2.png",
        "/assets/images/model3.png",
        "/assets/images/model1.png",
        "/assets/images/model2.png",
        "/assets/images/model3.png",
        "/assets/images/model1.png",
        "/assets/images/model2.png",
        "/assets/images/model3.png"
      ],
      region: ['xx省', 'xx市', 'xx区'],
      customItem: '全部'
  },
  toggleFilters() {
      this.setData({
        showFilters: !this.data.showFilters
      });
  },
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  }
});