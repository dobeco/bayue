import HTTP from '../utils/http-p.js'

class KeyWordModle extends HTTP {
  key = 'q';
  max = 10;
  getHistory() {
    const words = wx.getStorageSync(this.key);
    if (!words) {
      return []
    }
    return words;

  };

  getHot() {
    return this.request({
      url: '/book/hot_keyword'
    })
  };
  addToHistory(keyword) {
    let words = this.getHistory();
    const has = words.includes(keyword)
    if (!has) {
      // 如果超过最大长度，删除最后一个 出栈
      const length = words.length;
      if (length >= this.maxLength) {
        words.pop();
      }
      words.unshift(keyword);
      wx.setStorageSync(this.key, words)
    }


  }
}

export default KeyWordModle