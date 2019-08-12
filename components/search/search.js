// components/search/search.js
import KeyWordModle from '../../models/keyword.js'
const keyWordModel = new KeyWordModle();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: []

  },

  attached() {
    const historyWords = keyWordModel.getHistory();
    this.setData({
      historyWords
    })
      },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel: function (event) {
      this.triggerEvent('cancel', {}, {})
    },

    onConfirm(e) {
      const words = e.detail.value;
      keyWordModel.addToHistory(words)
    }

  }
})
