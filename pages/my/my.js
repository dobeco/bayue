import ClassicModel from '../../models/classic.js'
import  BookModel from '../../models/book.js'

let classicModel = new ClassicModel()
let bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onGetUserInfo: function(event) {
    let userInfo = event.detail.userInfo
    console.log(userInfo)
  
  },
})