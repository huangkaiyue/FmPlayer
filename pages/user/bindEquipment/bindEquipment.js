// pages/user/bindEquipment/bindEquipment.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: "",
    showData: '点我扫一扫',
    motto: '绑定设备',
    backStatus: true,
    names:'',
    usrPhone:'',
    ServerPhone:'',
    //weixinUrl:'https://www.lanbaoai.cn/XiaoManyao/weixinAuthInter'
    weixinUrl: 'http://192.168.1.20:9000/XiaoManyao/weixinAuthInter'
  },

  //获取用户输入手机号
  devsnInput: function (e) {
    this.setData({
      usrPhone: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (app.globalData.bindPhone!=""){
      that.scandevUser();
    }else{
      console.log("not bind user phone " );
    }
    that.devsnInput.value='123';
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  //查询设备列表
  scandevUser:function(){
    var that = this;
    var setunionId = app.globalData.unionId;
    console.log("unionId : " + setunionId);
    wx.request({

      url: that.data.weixinUrl,
      data: { msgtype: "scandev", unionId: setunionId},
      method: "post",
      header: {
        'content-type': 'application/json'
      },

      success: function (res) {
        console.log("1111111111111查询设备列表1111111111111111");
        console.log(res);
        console.log(res.data.devsn);
       
        that.setData({
          names: res.data.devsn
        })
      },
    })      

  },

 //点击扫描二维码
  click: function () {
    var that = this;
    var show;
    var sdata;
    wx.scanCode({
      success: (res) => {
        this.sdata = "设备号:" + res.result;
        app.globalData.usrPhone = res.result;
        
        that.setData({
          show: this.show,
          showData:this.sdata,
          usrPhone: this.sdata
        })
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '失败',
          icon: 'success',
          duration: 2000
        })
      },
      complete: (res) => {
      }
    })
  },

//点击绑定设备
  btnClick: function (res) {
    var that = this;
    console.log("绑定设备");
    console.log("手机号：" + this.data.usrPhone);
    console.log("backStatus: " + that.data.backStatus)
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var phoneMobile= this.data.usrPhone;
    if (phoneMobile.length === 0) {
      wx.showToast({
        title: '输入的手机号为空',
        icon: 'none',
        duration: 1500
      });
      return false;
    } else if (phoneMobile.length < 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'none',
        duration: 1500
      });
      return false;
    } else if (!myreg.test(phoneMobile)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 1500
      });
      return false;
    }
    if (that.data.backStatus === true) {
      console.log("绑定设备");
      var setunionId = app.globalData.unionId;
      var phoneNum = this.data.usrPhone;
      //var setdevsn = "070001834000002";
      console.log("unionId : " + setunionId);
      console.log("phoneNum: " + phoneNum);
      console.log(res.detail.formId)
      wx.request({

        url: data.weixinUrl,
        data: { msgtype: "bindsn", unionId: setunionId, phone: phoneNum },
        method: "post",
        header: {
          'content-type': 'application/json'
        },

        success: function (res) {
          
          console.log(res);
          console.log("绑定: " + res.data.devsn);
          that.scandevUser();
        },
      })

      that.setData({
        backStatus: false,
        motto: "取消绑定"
      })
    } else if (that.data.backStatus === false) {
      console.log("取消绑定");
      var setunionId = app.globalData.unionId;
      var phone = this.data.usrPhone;
      console.log("unionId : " + setunionId);
      console.log("phone: " + phone);
      wx.request({

        url: data.weixinUrl,
        data: { msgtype: "delete", unionId: setunionId, phone: phone },
        method: "post",
        header: {
          'content-type': 'application/json'
        },

        success: function (res) {

          console.log(res);
          that.scandevUser();
        },
      })
      that.cancelBind();
      that.setData({
        backStatus: true,
        motto: "绑定设备"
      })
    }
  },

  cancelBind:function(){
    console.log("cancelBind:")
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