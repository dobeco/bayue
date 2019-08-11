// pages/classic/classic.js
import HTTP from '../../utils/http.js'
import  ClassicModel from '../../models/classic.js'
import LikeModel from '../../models/like.js'
let http = new HTTP();
let classModel = new ClassicModel();
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic:null,
    latest:true,
    first: false,
    likeCount: 0,
    likeStatus: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    classModel.getLatest(res => {
      console.log(res);
     
      this.setData({
        classic: res,
        likeCount:res.fav_nums,
        likeStatus: res.like_status
      })
    })

    console.log(likeModel)
 
 

  },
  onLike: function (event) {
    let like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel, this.data.classic.id, this.data.classic.type)
  },

  // 下一页 
  onPrevious: function() {
    this._updateClassic('previous')
  
  },
 
  // 上一页
  onNext: function () { 
    this._updateClassic('next')
  


  },
  _updateClassic: function (nextOrPrevious) {
    let index = this.data.classic.index;
    classModel.getClassic(index,nextOrPrevious, res => {
      //console.log(res)
      this._getLikeStatus(res.id,res.type)
      this.setData({
        classic: res,
        latest: classModel.islatest(res.index),
        first: classModel.isFirst(res.index)
      })

    })

  },
  
  _getLikeStatus:function(artID,category, callback) {
    likeModel.getClassicLikeStatus(artID, category, res => {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })

  }


})