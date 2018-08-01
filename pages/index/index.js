var util = require('../../utils/util.js')
let str1 = JSON.stringify();
Page({
  onReady: function (e) {
  },
  data: {
    uhide: 0,
    movies: [
      { url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg' },
      { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg' },
      { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg' },
      { url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg' }
    ],
      
  },
  /**
* 生命周期函数--监听页面加载
*/
  onLoad: function (options) {
    var that = this;
    var data = {
      "datas": [
        {
          "id": 1,
          "imgurl": "../../images/linyichen.jpg",
          "name": "有一种尊重，叫做衣着体",
          "time": "2018-7-30"
        },
        {
          "id": 2,
          "imgurl": "../../images/linyichen.jpg",
          "name": "半生已过，学会放过",
          "time": "2018-7-30"
        },
        {
          "id": 3,
          "imgurl": "../../images/linyichen.jpg",
          "name": "我有故事，你有酒吗？",
          "time": "2018-7-30"
        },
        {
          "id": 4,
          "imgurl": "../../images/linyichen.jpg",
          "name": "晚安电台",
          "time": "2018-7-30"
        },
        {
          "id": 5,
          "imgurl": "../../images/linyichen.jpg",
          "name": "情感故事",
          "time": "2018-7-30"
        },
        {
          "id": 6,
          "imgurl": "../../images/linyichen.jpg",
          "name": "一千零一夜",
          "time": "2018-7-30"
        }
      ]
    };
    that.setData({
      FMlistInfoData: data.datas
    })

  },
  /**
  * 生命周期函数--监听页面卸载
  */
  onUnload: function () {

  },

  //轮播图的切换事件
  swiperChange: function (e) {
    //只要把切换后当前的index传给<swiper>组件的current属性即可
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //点击指示点切换
  chuangEvent: function (e) {
    this.setData({
      swiperCurrent: e.currentTarget.id
    })
  },

  //切换到播放界面
  toggleBtn: function (event) {
    wx.navigateTo({
      
      url: '../player/player',
      success: function (res) {
        // success 
      },
      fail: function () {
        // fail 
      },
      complete: function () {
        // complete 
      }
    })
  },
})