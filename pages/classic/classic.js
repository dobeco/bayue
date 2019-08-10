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

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    classModel.getLatest(res => {
      console.log(res);
      this.setData({
        classic: res
      })
    })

    console.log(likeModel)
 
 

  },
  onLike: function (event) {
    let like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel, this.data.classic.id, this.data.classic.type)
  },


})