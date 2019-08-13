
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: Boolean,
    count: {
      type: Number,
      value: 0
    },
    readOnly: {
      type: Boolean
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    yes_url: 'images/like.png',
    no_url: 'images/like@dis.png'
  

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function(e) {
      if(this.properties.readOnly){
        return 
      }
      let like = this.properties.like;
      let count = this.properties.count;
      count = like? count-1: count+1
      this.setData( {
        count,
        like: !like
      })
      // 激活
      let behavior = this.properties.like ? 'like' : 'cancel';
      this.triggerEvent('like', {behavior:behavior},{})

      
      
    


    }

  }
})
