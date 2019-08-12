// pages/book-detail/book-detail.js
import BookModel from '../../models/book.js'
import LikeModel from '../../models/like.js'


const bookModel = new BookModel();
const likeModel = new LikeModel();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    likeStatus: false,
    likeCount: 0,
    comments: [],
    noComment: true,
    posting: false, // 是否打开评论面板
    book: null,



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.bid)
    const bid = options.bid;
    const detail = bookModel.getDetail(bid);
    const comments = bookModel.getComments(bid);
    const likeStatus = bookModel.getLikeStatus(bid);

    wx.showLoading({
      title: '加载中',
    })
    // 使用Promise.all() 处理并发请求,等待所有请求完成后才触发回调函数 rece竞争 任何一个字promise完成率先触发回调函数，不会等待，相互竞争，谁先完成了就马上执行回调函数，res将携带的是竞争成功的这个请求的回调结果
    Promise.all([detail, comments, likeStatus])
      .then(res => {
        console.log(res);
        this.setData({
          book: res[0],
          comments: res[1].comments,
          likeStatus: res[2].like_status,
          likeCount: res[2].fav_nums
        });
        wx.hideLoading()
      })
    /*
    detail.then(res => {
      console.log(res);
      this.setData({
        book: res
      })
    });

    comments.then(res => {
      console.log(res);
      this.setData({
        noComment: res.comments == false ? true : false,
        comments: res.comments
      })
    });

    likeStatus.then(res => {
      console.log(res);
      this.setData({
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      })
    })*/
  },

  // 喜欢
  onLike(event) {
    let like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel, this.data.book.id, 400)
  },

  onFakePost() {
    this.setData({
      posting: true
    })
  },
  onCancel() {
    this.setData({
      posting: false
    })
  },

  //
  onPost: function(event) {
    let comment = event.detail.value || event.detail.text
    console.log(this.data.book.id)
    if (!comment) {
      return
    }
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }

    bookModel.postComment(this.data.book.id, comment)
      .then(res => {
        wx.showToast({
          title: '+1',
          icon: 'none'
        });
        this.data.comments.unshift({
          content: comment,
          nums: 1
        })

        this.setData({
          comments: this.data.comments,
          posting: false
        })



      })



  },







})