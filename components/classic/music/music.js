// components/classic/music/music.js
import classicBeh from '../class-beh.js'
let mMgr = wx.getBackgroundAudioManager()
Component({
  behaviors: [classicBeh],
  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
    playing: false

  },


  attached: function() {
    this._recoverStatus();
    this._monitorSwitch();

  },

  methods: {
    onPlay: function() {
      if (!this.data.playing) {
        this.setData({
          playing: true
        });

        mMgr.src = this.properties.src;
        mMgr.title = this.properties.title;

      } else {
        this.setData({
          playing: false
        });
        mMgr.pause();
      }

    },
    
    // 页面切换播放图标问题
    _recoverStatus: function() {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return;
      }
      if(mMgr.src === this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },

    _monitorSwitch: function() {
      mMgr.onPlay( ()=> {
        this._recoverStatus()

      });
      mMgr.onPause(() => {
        this._recoverStatus()

      });
      mMgr.onStop(() => {
        this._recoverStatus()

      })
    }


  }
})