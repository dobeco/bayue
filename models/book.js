
import HTTP from '../utils/http-p.js'

 class BookModel extends HTTP {


  getHotList() {
    return this.request({
      url: 'book/hot_list',
    })
  };

  getMyBookCount() {
    return this.request({
      url: 'book/favor/count',
    })
  };

   getDetail(bid) {
     return this.request({
       url: `book/${bid}/detail`
     })
    
    
   };

   getLikeStatus(bid) {
    return  this.request({
       url: `/book/${bid}/favor`
     })
   
   };

   // 获取评论列表
   getComments(bid, comment) {
     return this.request({
       url: 'book/' + bid + '/short_comment',
     })
   }

   //添加评论
   postComment(bid, comment) {
     return this.request( {
       url: 'book/add/short_comment',
       method: 'POST',
       data: {
         book_id: bid,
         content: comment
       }
     
     })
   }


}

export default BookModel;