// pages/index/chooselist/chooselist.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexCur: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var index = options.Index;
    console.log("111111111111111111: " + index);

    that.setData({
      indexCur:index

    })
   
  },

  playChick:function(){
    var that = this;
    console.log("播放 ");

    var playIndex = this.data.indexCur;
    console.log("playIndex: " + this.data.indexCur);
    wx.navigateTo({

      url: '../../player/player?playIndex=' + playIndex,
      success: function (res) {
        console.log(res);
      },
      fail: function () {
        // fail 
      },
      complete: function () {
        // complete 
      }
    })
  },

  pushChick:function(e){
    console.log("推送");
    var that = this;
    var setunionId = app.globalData.unionId;
    var setdevsn = app.globalData.devsn;
    //var setdevsn = "070001834000002";
    var myformId = e.detail.formId;
    var playurl = app.globalData.musicCurrentUrl;
    console.log("playurl: " + playurl);
    console.log("formId: " + myformId);

    wx.request({
      url: app.globalData.serverUrl+'weixinAuthInter',
      data: { 
        msgtype: "pushMsg", 
        dir: "wxToDev", 
        unionId: setunionId,
        devsn: setdevsn,
        formId: myformId,
        msgbody: [
          {
            type: "play",
            url: playurl
          }
        ]
        },
      method: "post",
      header: {
        'content-type': 'application/json'
      },

      success: function (res) {
        console.log(res);
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      },

      fail: function (res) {
        wx.showToast({
          title: '失败',
          icon: 'success',
          duration: 2000
        })
      },
    })
  },

  downloadChick:function(e){
    console.log("下载");

    var that = this;
    var setunionId = app.globalData.unionId;
    var setdevsn = app.globalData.devsn;
    //var setdevsn = "070001834000002";
    var myformId = e.detail.formId;
    var playurl = app.globalData.musicCurrentUrl;
    console.log("playurl: " + playurl);
    console.log("formId: "+ myformId);
    
    wx.request({
      url: app.globalData.serverUrl+'weixinAuthInter',
      data: {
        msgtype: "pushMsg",
        dir: "wxToDev",
        unionId: setunionId,
        devsn: setdevsn,
        formId: myformId,
        msgbody: [
          {
            type: "down",
            url: playurl
          }
        ]
      },
      method: "post",
      header: {
        'content-type': 'application/json'
      },

      success: function (res) {
        console.log(res);
        
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      },

      fail:function(res){
        wx.showToast({
          title: '失败',
          icon: 'success',
          duration: 2000
        })
      },
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