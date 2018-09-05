// pages/index/musiclist/musiclist.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    audioList: '',
    coverImg: null,
    ablName: null,
    ablMessage: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("接收到得参数是index=" + options.playIndex);

    var playApp = getApp();
    var playImage = playApp.globalData.playImage;
    var ablmMessage = playApp.globalData.ablMessage;
    var ablmName = playApp.globalData.albName;

    console.log("ablName: "+ablmName);
    console.log("ablName2: " + playApp.globalData.albName);
    console.log("ablMessage: " + ablmMessage);
    console.log('onLoad');
    console.log(this.data.audioList.length);

    var that = this;
    wx.request({
      //url: 'http://192.168.1.20:9000/XiaoManyao/music?method=Albumlist&index=' + options.playIndex,
      url: 'https://www.lanbaoai.cn/XiaoManyao/music?method=Albumlist&index=' + options.playIndex,
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading();
        var data = res.data; // 接口相应的json数据
        var musiclist = data.musiclist; // 接口中的data对应了一个数组，这里取名为 articles
        app.globalData.musicList = musiclist;
        console.log(musiclist);
        that.setData({
          audioList: musiclist,
          coverImg: playImage,
          ablMessage: ablmMessage,
          ablName: ablmName
        })
      }
    })

  },

  playallChick:function(event){
    console.log("播放全部");
    wx.navigateTo({
      url: '../../player/player',
    })
  },

  checkChick: function (event){
    var that = this;
    var viewDataSet = event.currentTarget.dataset;
    var curUrl = viewDataSet.url;
    var playApp = getApp();
    var index = viewDataSet.index;
    console.log("index: " + index);

    playApp.globalData.musicCurrentUrl = curUrl;
    console.log("curUrl: "+curUrl)
   
    wx.navigateTo({
      url: '../chooselist/chooselist?Index='+index,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
  
  }
})