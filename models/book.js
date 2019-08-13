
import HTTP from '../utils/http-p.js'

 class BookModel extends HTTP {

  // 热门书籍
  getHotList() {
    return this.request({
      url: 'book/hot_list',
    })
  };
  
  // 获取书籍收藏数量
  getMyBookCount() {
    return this.request({
      url: 'book/favor/count',
    })
  };
   
   // 获取书籍详情
   getDetail(bid) {
     return this.request({
       url: `book/${bid}/detail`
     })
    
    
   };

   // 图书搜索
   search(start, q) {
     return this.request({
       url: 'book/search?summary=1',
       data: {
         q:q,
         start:start
       }
     })

   }

   
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