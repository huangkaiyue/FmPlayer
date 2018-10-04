// pages/user/user.js
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '',
    userCode: null,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  tapName: function (event) {
    console.log(event)
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
  onLoad: function () {
    var that = this;
  
    if (app.globalData.userInfo) {
      
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    app.globalData.unionId = wx.getStorageSync("unionId");
    if (app.globalData.unionId==''){
      console.log("wx getStorage not save unionId");
      that.getweixinData();
    }else{
      app.globalData.bindPhone = wx.getStorageSync("bindPhone");
      console.log("wx getStorage :" + app.globalData.unionId);
    }    
  },
  //-------------- onload --------------


  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  personalChick:function(e){
    console.log("personalChick ");
    wx.navigateTo({
      url: './userinfo/userinfo',
    })
  },

  bindDevice:function(e){
    console.log("bindDevice ");
    wx.navigateTo({
      url: './bindEquipment/bindEquipment',
    })
  },

  activityClick: function(e){
    console.log("暂无活动");
    wx.navigateTo({
      url: './userActivity/userActivity',
    })
  },
  //获取unionId /openid
  getweixinData:function() {
    var that = this
    var code = app.globalData.userCode;
    var encry = app.globalData.encryData;
    console.log("getweixinData code : " + code);
    console.log("getweixinData encry : " + encry);
    // 请封装自己的网络请求接口，这里作为示例就直接使用了wx.request.
    wx.request({
      url: app.globalData.serverUrl +'weixinAuthInter',
      data: { msgtype: "getunionId", usercode: code, userencryData: encry },
      method: "post",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var data = res.data; // 接口相应的json数据
        app.globalData.unionId = data.unionId;
        app.globalData.bindPhone = data.phone;
        console.log(res.data);
        wx.setStorageSync('unionId', data.unionId),
        wx.setStorageSync('bindPhone', data.phone)
      },
    })
  }
})