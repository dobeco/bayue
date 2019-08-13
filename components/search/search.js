// components/search/search.js
import KeyWordModle from '../../models/keyword.js'
import BookModel from '../../models/book.js'
import {
  paginationBev
} from '../behavior/pagination.js'
const keyWordModel = new KeyWordModle();
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    q: '',
    loading: false,
    loadingCenter: false,
    searching: false,



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

    onDelete(event) {
      this._cloaseResult()

    },

    // 搜索
    onConfirm(e) {
      this._showResult();
      this.initpagination();
      const q = e.detail.value || e.detail.text;
      // 图书搜索
      bookModel.search(0, q).then(res => {
        console.log(res);
        this.setMoreData(res.books);
        this.setTotal(res.total);
        this.setTotal(res.total);
        this.setData({
          q
        });
        // 添加历史记录
        keyWordModel.addToHistory(q);
      })
    },

    _showResult() {
      this.setData({
        searching: true
      })
    },

    _cloaseResult() {
      this.setData({
        searching: false
      })

    },

    // 加载更多
    loadMore() {
      if (!this.data.q) {
        return false
      }
      // 同时发送两个请求 一次只能发送一次请求，必须等待第一次请求完成之后再发送第二个请求
      if (this._isLocked()) {
        return false
      }
      const length = this.getCurrentStart();
      if (this.hasMore()) {
        this._locked();
        bookModel.search(length, this.data.q).then(res => {
          this.setMoreData(res.books);
          this._unLocked();

        })
      }

    },

    // 锁 避免重复请求
    _isLocked() {
      return this.data.loading ? true : false;

    },
    // 加锁
    _locked() {
      return this.data.loading = true;
    },

    // 解锁 
    _unLocked() {
      return this.data.loading = false;
    }





  }
})