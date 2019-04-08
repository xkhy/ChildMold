Component({
  //下面是组件的属性列表
  options: {
    multipleSlots: true //在组件定义时的选项中启用多slot支持
  },
  properties: {
    tabTitle: {
      type: Object,
      value: []
    }
  },
  //组件的初始数据
  data: {
    num: 0
  },
  //组件的方法列表
  methods: {
    toggle: function (e) {
      if (this.data.num === e.currentTarget.dataset.index) {
        return false;
      } else {
        this.setData({
          num: e.currentTarget.dataset.index
        })
      }
    }
  }




})