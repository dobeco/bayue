import HTTP from '../utils/http.js'

class LikeModel extends HTTP {
  
  like(like_or_cancel, art_id, type) {
    let url = like_or_cancel === 'cancel' ? 'like/cancel' : 'like'
    this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: art_id,
        type: type
      },
      success: (data) => {
        console.log(data)
      }
    })
  }
}

export default LikeModel