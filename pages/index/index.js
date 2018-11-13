var util = require('../../utils/util.js')
var app = getApp();
Page({

  onReady: function (e) {
  },
  data: {
    uhide: 0,
    push_picture: [                                                                          
      { url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg' },
      { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg' },
      { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg' },
      { url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg' }
    ],
    totalDataCount: 0, // 总数据条数
    currentPage: 0, 
    likestatus:true
    
  },
  
/**
* 生命周期函数--监听页面加载
*/
  onLoad: function (options) {
    this.loadNetworkData();//  加载网络数据
  },

  loadNetworkData: function(){
    var that = this //拿界面属性
    var currentPage = 1;
    var tips = "加载第" + (currentPage) + "页";
    console.log("load page " + (currentPage));
    wx.showLoading({  //显示正在加载控件
      title: tips,
    })
    
    // 请封装自己的网络请求接口，这里作为示例就直接使用了wx.request.
    wx.request({
      url: app.globalData.serverUrl +'music?method=moreAlbum&page=' + currentPage,
      data: {     //服务器指定要求上传数据
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {  //res.data 请求数据 res.statusCode 响应
        wx.hideLoading();
        
        var data = res.data; // 接口相应的json数据
        var Album = data.Album; // 接口中的Album对应了一个数组，这里取名为 Album
        var totalDataCount = Album.length;
  
        console.log(Album);
        that.setData({        //渲染界面
          ["dataArray[" + currentPage + "]"]: Album,
          currentPage: currentPage,
          totalDataCount: totalDataCount,
          
        })
      },
      fail: function (res) {
        app.loadNetworkFailedTips('加载用户数据失败，请检查网络');
      }

    })
  },

  loadMoreData: function () {
    var that = this
    var currentPage = that.data.currentPage; // 获取当前页码
    currentPage+=1;
    var tips = "正在加载";
    console.log("load page " + (currentPage));
    wx.showLoading({
      title: tips,
    })
    // 请封装自己的网络请求接口，这里作为示例就直接使用了wx.request.
    wx.request({
    
      url: app.globalData.serverUrl +'music?method=moreAlbum&page='+currentPage,
      data: {     //服务器指定要求上传数据
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading();
        var data = res.data; // 接口相应的json数据
        var Album = data.Album; // 接口中的data对应了一个数组
        var totalDataCount = Album.length;
        var index = Album.index;
       
        wx:if(totalDataCount == 0){
          console.log("数据加载完成.....");
          currentPage -=1;
          that.setData({
            currentPage: currentPage,
          })
          return;
        }
        console.log(Album);
        that.setData({
          ["dataArray[" + currentPage + "]"]: Album,
          currentPage: currentPage,
          totalDataCount: totalDataCount,
        })
      },
      fail: function (res) {
        console.log('request server  failed'),
          wx.hideLoading();
          wx.showToast({
          title: '请检查网络',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    var that = this
    that.loadMoreData();
  
  },

  /**
  * 生命周期函数--监听页面卸载
  */
  onUnload: function () {
    
  },

  //轮播图的切换事件
  swiperChange: function (e) {
    //只要把切换后当前的index传给<swiper>组件的current属性即可
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //点击指示点切换
  chuangEvent: function (e) {
    this.setData({
      swiperCurrent: e.currentTarget.id
    })
  },

  //跳转到搜索页
  suo:function(e){
    wx.navigateTo({
      url: '../search/search',
    })
  },

  bindLike:function(event){
      console.log(this.data.likestatus);

      if (this.data.likestatus === true){
        //this.play()
        this.setData({ likestatus: false })
      }
      console.log(this.data.likestatus);
  },

  //切换到播放界面
  toggleBtn: function (event) {
    
    var playIndex = event.currentTarget.id;
    var viewDataSet = event.currentTarget.dataset;
    var viewlogo = viewDataSet.logo;
    var ablName = viewDataSet.name;
    var ablMessage = viewDataSet.message;
  
    var playApp = getApp();
    playApp.globalData.playImage = viewlogo;
    playApp.globalData.albName = ablName;
    playApp.globalData.ablMessage = ablMessage;
    
    //playImage
    wx.navigateTo({
      
      //url: '../player/player?playIndex=' + playIndex,
      url: './musiclist/musiclist?playIndex=' + playIndex,
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
  
})