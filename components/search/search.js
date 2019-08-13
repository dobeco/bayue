// components/search/search.js
import KeyWordModle from '../../models/keyword.js'
import BookModel from '../../models/book.js'
const keyWordModel = new KeyWordModle();
const bookModel = new BookModel()

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
    historyWords: [],
    hotWords: [],
    dataArray: [],
    finished: false,
    q: '',
    loading: false,
    loadingCenter: false,
    searching: false


  },

  attached() {
    const historyWords = keyWordModel.getHistory();
    this.setData({
      historyWords
    })

    keyWordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })

    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event) {
      this.triggerEvent('cancel', {}, {})
    },

    onDelete (event) {
      this.setData({
        searching: false
      })
      
    },
  

    onConfirm(e) {
      this.setData({
        searching:true
      })
      const q = e.detail.value || e.detail.text;
      // 图书搜索
      bookModel.search(0, q)
        .then(res => {
          console.log(res);
          this.setData({
            dataArray: res.books,
            q:q
          });
          // 添加历史记录
          keyWordModel.addToHistory(q);
        })



    },

 

  }
})