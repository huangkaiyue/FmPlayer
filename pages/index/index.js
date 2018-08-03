var util = require('../../utils/util.js')
let str1 = JSON.stringify();
Page({
  onReady: function (e) {
  },
  data: {
    uhide: 0,
    movies: [
      { url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg' },
      { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg' },
      { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg' },
      { url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg' }
    ],
    totalDataCount: 0, // 总数据条数
    currentPage: 0,
    articles: [] // 存放所有的文章  
  },
  
  /**
* 生命周期函数--监听页面加载
*/
  onLoad: function (options) {
    var that = this
    //  加载网络数据 
    that.loadNetworkData();
    that.loadMoreData();
        // 加载本地数据
    // that.loadlocalData();
  },

  loadNetworkData: function(){
    var that = this //拿界面属性
    var currentPage = 0;
    var tips = "加载第" + (currentPage + 1) + "页";
    console.log("load page " + (currentPage + 1));
    wx.showLoading({  //显示正在加载控件
      title: tips,
    })
    // 请封装自己的网络请求接口，这里作为示例就直接使用了wx.request.
    wx.request({
      url: 'http://192.168.1.20:9000/XiaoManyao/music?method=Album',
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
          totalDataCount: totalDataCount
        })
      }
    
    })
  },

  loadMoreData: function () {
    var that = this
    var currentPage = that.data.currentPage; // 获取当前页码
    currentPage+=1;
    var tips = "加载第" + (currentPage + 1) + "页";
    console.log("load page " + (currentPage + 1));
    wx.showLoading({
      title: tips,
    })
    // 请封装自己的网络请求接口，这里作为示例就直接使用了wx.request.
    wx.request({
      url: 'http://192.168.1.20:9000/XiaoManyao/music?method=Album',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading();
        var data = res.data; // 接口相应的json数据
        var Album = data.Album; // 接口中的data对应了一个数组，这里取名为 articles
        var totalDataCount = Album.length;
        console.log(Album);
        that.setData({
          ["dataArray[" + currentPage + "]"]: Album,
          currentPage: currentPage,
          totalDataCount: totalDataCount
        })
      }
    })
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

  //切换到播放界面
  toggleBtn: function (event) {
    wx.navigateTo({
      
      url: '../player/player',
      success: function (res) {
        // success 
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