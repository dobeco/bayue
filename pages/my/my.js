import ClassicModel from '../../models/classic.js'
import BookModel from '../../models/book.js'

let classicModel = new ClassicModel()
let bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: null,
    classics: [],
    myBooksCount: 0


  },
  onLoad: function() {
    // 查看是否授权
    this.userAuthorized();
    this.getMyFavor();
    this.getMyBookCount()

  },

  userAuthorized() {
    const that = this;
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: (res) => {
              console.log(res.userInfo)
              that.setData({
                authorized: true,
                userInfo: res.userInfo
              })
            }
          })
        } else {
          that.setData({
            authorized: false,
         
          })
        }
      }
    })

  },

  onGetUserInfo: function(event) {
    let userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        authorized: true,
        userInfo: userInfo
      })
    }
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },

  getMyFavor() {
    classicModel.getMyFavor(res=> {
      console.log(res)
      this.setData({
        classics: res
      })

    })
  },
  getMyBookCount() {
    bookModel.getMyBookCount().then(res=> {
      console.log(res)
      this.setData({
        myBooksCount: res.count
      })
    })
  },



})