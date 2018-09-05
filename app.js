//app.js

App({
  onLaunch: function() {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log("测试登陆");
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

  //获取unionId /openid
  getServerUserData: function () {
    var that = this
    console.log("获取unionId,openid");
    var code = app.globalData.userCode;
    var encry = app.globalData.encryData;
    console.log("test code : " + code);
    console.log("test encry : " + encry);
    // 请封装自己的网络请求接口，这里作为示例就直接使用了wx.request.
    wx.request({

      url: 'https://192.168.1.20:9000/XiaoManyao/weixinAuthInter',
      // url: 'https://www.lanbaoai.cn/XiaoManyao/weixinAuthInter',
      data: { msgtype: "getunionId", usercode: code, userencryData: encry },
      method: "post",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var data = res.data; // 接口相应的json数据
        app.globalData.unionId = data.unionId;
        console.log(data);

      },
    })
  },

  globalData: {
    userInfo: null,
    playImage: null,
    userCode: null,
    encryData: null,
    unionId: null,
    bindPhone:null,
    ablName: null,
    ablMessage: null,
    musicCurrentUrl: null,
    devsn: null,
    musicList: ''
  }
})