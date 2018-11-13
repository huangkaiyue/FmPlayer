//app.js
App({
  onLaunch: function () {
    var that = this;

    that.globalData.unionId = wx.getStorageSync("unionId");
    if (that.globalData.unionId == '') {
      console.log("wx getStorage not save unionId");
      // that.getweixinData();
    } else {
      that.globalData.bindPhone = wx.getStorageSync("bindPhone");
      console.log("wx getStorage :" + that.globalData.unionId);
    }   

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        that.globalData.userCode = res.code;
        console.log("code: " + that.globalData.userCode);
      },

      fail: res => {
        toast.show({
          content: '微信登陆失败'
        });
      }
    });

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {

          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {

              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo
              that.globalData.encryData = res.encryptedData;
              console.log("encryData: " + that.globalData.encryData);


              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  loadNetworkFailedTips:function(showStr){
    wx.hideLoading();
    console.log('request server  failed'),
      wx.showToast({
      title: showStr,
        icon: 'none',
        duration: 2000
      })  
  },

  globalData: {
    userInfo: null,
    playImage: null,
    userCode: null,
    encryData: null,
    unionId: null,
    bindPhone: null,
    ablName: null,
    ablMessage: null,
    musicCurrentUrl: null,
    devsn: null,
    musicList: '',
    serverUrl: 'http://192.168.1.20:9000/XiaoManyao/'
    // serverUrl: 'https://www.lanbaoai.cn/XiaoManyao/'
  }
})