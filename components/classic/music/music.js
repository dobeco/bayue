// components/classic/music/music.js
import classicBeh from '../class-beh.js'
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    /*
    img: String,
    content: String
    */
 
  },

  /**
   * 组件的初始数据
   */
  data: {
    pauseSrc: 'images/player@waittting.png',
    playSrc: 'images/player@playing.png'

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
