// pages/user/bindEquipment/bindEquipment.js
var app = getApp();
Page({
  data: {     //页面的初始数据
    usrPhone: '',
    ServerPhone: '',
    weixinUrl: app.globalData.serverUrl +'weixinAuthInter',
    inputDevTxt: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (app.globalData.bindPhone!=""){
      this.setData({
        inputDevTxt: app.globalData.bindPhone
      })
      that.getDevListData(app.globalData.bindPhone);
    }else{
      console.log("not bind user phone " );
    }
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
    console.log("close bind devices menu ...");
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
    
  devsnInput: function (e) {//获取用户输入手机号
  var that =this
    this.setData({
      usrPhone: e.detail.value,
    })
    //console.log(this.data.usrPhone)
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var phoneMobile = this.data.usrPhone;
    if (phoneMobile.length === 0) {
      wx.showToast({
        title: '输入的手机号为空',
        icon: 'none',
        duration: 1500
      });
      return;
    } else if (phoneMobile.length < 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'none',
        duration: 1500
      });
      return;
    } else if (!myreg.test(phoneMobile)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 1500
      });
      return;
    }
    wx.showToast({
      title: '正在绑定',
      icon: 'none',
      duration: 1500
    });

    console.log("start upload: " + this.data.usrPhone),
    wx.request({
      url: app.globalData.serverUrl + 'weixinAuthInter',
      data: { msgtype: "bindsn", unionId: app.globalData.unionId, phone: this.data.usrPhone },
      method: "post",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        app.globalData.bindPhone = this.data.usrPhone;
        wx.setStorageSync('bindPhone', app.globalData.bindPhone);
        that.setData({
          
        })
      },
    })
  },
  //获取unionId /openid
  getDevListData: function (phoneNumberStr) {
    var that = this
    var unionId = app.globalData.unionId;
    var phone = phoneNumberStr;

    // var unionId = 'oXuHx5FURQodw9XRMim76BB7Pquk';
    // var phone = '13688999416';

    wx.request({
      url: app.globalData.serverUrl +'weixinAuthInter',
      data: { msgtype: "scandev", unionId: unionId, phone: phone },
      method: "post",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        console.log(res.data.devsn);
        
        that.setData({
          names: res.data.devsn
        })
      },
    })
  }
})