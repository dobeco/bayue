// components/epsoide/epsoide.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      observer: function (newVal, oldVal, changedPath) {
        if (newVal < 10) {
          this.setData({
            _index: '0' + newVal
          })
        }
      }
    }
  },


  /**
   * 组件的初始数据
   */
  data: {
    year: 0,
    months: [
      '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月',
      '十二月'
    ],
    _index: '',
    month: ''
 

  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  ready: function () {
    let date = new Date()
    let month = date.getMonth()
    let year = date.getFullYear()
    this.setData({
      month: this.data.months[month],
      year
    })
  },
})
