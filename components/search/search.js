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
      this.initpagination();
      this.triggerEvent('cancel', {}, {})

    },

    onDelete(event) {
      this.initpagination();
      this._cloaseResult();


    },

    // 搜索
    onConfirm(e) {
      this._showResult();
      this._showLoadingCenter();
      this.initpagination();
      const q = e.detail.value || e.detail.text;
      this.setData({
        q
      });
      // 图书搜索
      bookModel.search(0, q).then(res => {
        console.log(res);
        this.setMoreData(res.books);
        this.setTotal(res.total);
        this.setTotal(res.total);
      
        // 添加历史记录
        keyWordModel.addToHistory(q);
        this._hideLoadingCenter();
      })
    },

    // 加载中
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },

    _showResult() {
      this.setData({
        searching: true
      })
    },

    _cloaseResult() {
      this.setData({
        searching: false,
        q: ''
      })

    },

    // 加载更多
    loadMore() {
      if (!this.data.q) {
        return false
      }
      // 同时发送两个请求 一次只能发送一次请求，必须等待第一次请求完成之后再发送第二个请求
      if (this.isLocked()) {
        return false
      }
      const length = this.getCurrentStart();
      if (this.hasMore()) {
        this.locked();
        bookModel.search(length, this.data.q).then(res => {
          this.setMoreData(res.books);
          this.unLocked(); // 请求成功后解锁

        }, () => {
          /* 在断网情况下加载更多发送一次请求，在恢复网络后，一般情况下是能再发送请求的， 
          但是在断网后发送请求产生错误后，恢复网络后也不会发送请求了， 所以在请求失败的时候也要解锁
          */
          this.unLocked()
        })
      }

    },







  }
})