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
    })
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
  onPost: function (event) {
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
      .then( res => {
        wx.showToast({
          title: '+1',
          icon: 'none'
        });
         this.data.comments.unshift({
          content:comment,
          nums:1
        })

        this.setData({
          comments: this.data.comments,
          posting:false
        })

     

      })  
    

 
  },







})