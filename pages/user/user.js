// pages/user/user.js
var app = getApp()
Page({
  data: {
    zhihu: null,
  },

  onLoad: function (options) {
    console.log('start onload user menu')
    var that = this
    wx.request({
      url: 'http://news-at.zhihu.com/api/4/news/latest',
      data: {//这里写你要请求的参数
      },
      headers: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          "zhihu": res.data.stories
        })
      }
    })
  },
})