Page({
  data: {
    array: ['男', '女'],
    index: 0,
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部'
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value+""+this.data.array[e.detail.value])
    this.setData({
      index: e.detail.value
    })
  },
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  formSubmit(e) {
    console.log(e.detail.value)
  }
})