// pages/player/player.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   * http://fdfs.xmcdn.com/group9/M08/A1/4A/wKgDZldzNWzRoXyzACZofeFKKKc093.mp3
   * http://www.lanbaoai.cn:8080/XiaoManyao/XiaomanyaoFile/liangliang.mp3
   */
  data: {
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '开心一刻',
    author: '林克维茨电台',
    src: 'http://192.168.1.20:9000/XiaoManyao/XiaomanyaoFile/liangliang.mp3',
    slider_value: 0, //设置初始滑块位置为0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.audioCtx.seek(0);//设置音频初始位置为0
    // this.getAudioDetail();//获取一品
    // this.audioListen();
    var getval = app.playurl;
    console.log('start onload user menu' + getval)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('myAudio')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.audioCtx.pause();//退出页面时，暂停音频
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
})