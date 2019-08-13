import HTTP from '../utils/http.js'

class ClassicModel extends HTTP {
  constructor() {
    super()
  }

  getLatest(callback) {
    this.request({
      url: 'classic/latest',
      success: res => {
        callback(res);
        this._setlatestIndex(res.index);
        let key = this._getKey(res.index);
        wx.setStorageSync(key, res)

      }
    })
  };
  // 获取期刊
  getClassic(index, nextOrPrevious, cab) {
    // 缓存处理
    // 确认key
    let key = nextOrPrevious === 'next' ? this._getKey(index + 1) : this._getKey(index - 1)

    let classic = wx.getStorageSync(key);
    if (!classic) {
      this.request({
        url: 'classic/' + index + '/' + nextOrPrevious,
        success: res => {
          wx.setStorageSync(this._getKey(res.index), res)
          cab(res)
        }
      })

    } else {
      cab(classic)
    }



  }

  // 上一期
  getNext() {
    this.request({
      url: 'classic/' + index + '/next',
      success: res => {
        cab(res)
      }
    })

  };


  // 是否第一期
  isFirst(index) {
    return index === 1 ? true : false;
  };
  // 是否最新一期
  islatest(index) {
    let latestIndex = this._getlatestIndex();
    return latestIndex === index ? true : false;


  };

  getMyFavor(success) {
    let params = {
      url: 'classic/favor',
      success: success
    }
    this.request(params)
  };


  _setlatestIndex(index) {
    wx.setStorageSync('latest', index)
  };

  _getlatestIndex() {
    let index = wx.getStorageSync('latest');
    return index;
  };
  _getKey(index) {
    let key = 'classic-' + index;
    return key;

  }



}

export default ClassicModel