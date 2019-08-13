const paginationBev = Behavior({
  properties: {},
  data: {
    dataArray: [],
    total: null,
    noneResult: false,
    loading: false
  },

  methods: {

    setMoreData(dataArray) {

      let tempArray = this.data.dataArray.concat(dataArray);
      this.setData({
        dataArray: tempArray
      })

    },

    // 是否加载更多数据
    hasMore() {
      if (this.data.dataArray.length >= this.data.total) {
        return false
      } else {
        return true
      }
    },

    setTotal(total) {
      // 设置total值
      this.data.total = total;
      if (total === 0) {
        this.setData({
          noneResult: true
        })
      }

    },
    getCurrentStart() {
      return this.data.dataArray.length;
    },

    // 锁 避免重复请求
    isLocked() {
      return this.data.loading ? true : false;

    },
    // 加锁
    locked() {
      this.setData({
        loading: true
      })
    },

    // 解锁 
    unLocked() {
      this.setData({
        loading: false
      })

    },

    // 初始化页码
    initpagination() {
      this.setData({
        dataArray: [],
        noneResult: false,
        loading: false
      })
      this.data.total = null;

      /**
       * 什么时候使用setData?
       * 在代码中 total没必要使用setData，但是也可以用setData改变total的值
       * 什么时候使用：只有data里的数据有在wxml中有应用，即绑定了data里面的值的时候。如果没有使用setData,小程序是不会通知wxml去重新计算绑定的data里面的值
       * 如果data里的数据不在wxml里面使用，用不用setData都无所谓
       * 
       */
    },


  }
})

export {
  paginationBev
}