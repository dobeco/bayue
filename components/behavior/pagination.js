const paginationBev = Behavior({
  properties: {},
  data: {
    dataArray: [],
    total: null
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
      return this.data.total = total;
    },
    getCurrentStart() {
      return this.data.dataArray.length;
    },
    // 初始化页码
    initpagination() {
      this.data.dataArray = [];
      this.data.total = null

    }
  }
})

export {
  paginationBev
}