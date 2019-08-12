// pages/book/book.js
import BookModel from '../../models/book.js'
let bookModel = new BookModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searchPanel: false,
    more: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    /*
    let promise = new Promise((resolve, reject)=> {
      wx.getSystemInfo({
        success: res =>resolve(res),
        fail: error => reject(error)
        
      })
    });

    promise.then(
      res=> console.log(res), 
      error=> console.log(error)
    );
    */

    bookModel.getHotList()
      .then(
        res => {
          console.log(res)
          this.setData({
            books:res
          })
        }
        
      )

  },


  onReady: function() {

  },

  onActivateSearch: function (event) {
    this.setData({
      searchPanel: true
    })
  },

  onCancel: function (event) {
    this.setData({
      searchPanel: false
    })
  },

  onShareAppMessage() {

  }

  

 


})