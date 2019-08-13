const paginationBev = Behavior({
  properties: {},
  data: {
    dataArray: [],
    total: 0
  },

  methods: {

    setMoreData(dataArray) {
      let tempArray = this.data.dataArray.concat(dataArray);
      this.setData({
        dataArray: tempArray
      })

    },

    hasMore() {
      if (this.data.dataArray.length >= this.data.total) {
        return false
      } else {
        return true
      }
    },

    setTotal(total) {
      return this.data.total = total;
    },
    getCurrentStart() {
      return this.data.dataArray.length;
    }
  }
})

export {
  paginationBev
}