// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('start onload my message menu')
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
  
  },

  comment_but: function (event){
    console.log("评论...");
    wx.showToast({
      title: '评论',
    })
  },

  tices_my_but: function (event) {
    console.log("@我...");
    wx.showToast({
      title: '@我',
    })
  },

  thumbs_up_but: function (event) {
    console.log("点赞...");
    wx.showToast({
      title: '点赞',
    })
  },

  system_message_but: function (event) {
    console.log("系统通知...");
    wx.showToast({
      title: '系统通知',
    })
  },

  GetServerMessage: function(){ //获取服务器消息
    var that = this
    wx.request({
      url: 'https://www.lanbaoai.cn/XiaoManyao/login',
      data: {//这里写你要请求的参数
      },
      headers: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        // console.log('获取数据结束')
      },
      fail: function (error) {
        // fail
        console.log(error)
      }
    })
  }
})