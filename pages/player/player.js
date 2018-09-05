//index.js
//获取应用实例

var app = getApp()
Page({
  data: {
    audioList: '',
    coverImg: null,
    audioIndex: 0,
    pauseStatus: true,
    listShow: false,
    timer: '',
    currentPosition: 0,
    duration: 0,
    dataPlay:null
  },
  onLoad: function (options) {
  
    var audioIndexNow = options.playIndex;
    console.log("接收到得参数是index="+options.playIndex);

    var playApp = getApp();
    var playImage = playApp.globalData.playImage;
    console.log("接收到得参数是image=" + playImage);
    
    console.log('onLoad')
    console.log(this.data.audioList.length)
     
    var that = this;
    var musiclist = app.globalData.musicList;
    that.setData({
      audioList: musiclist,
      coverImg: playImage,
      audioIndex: audioIndexNow
    })

    // wx.request({
    //   //url: 'http://192.168.1.20:9000/XiaoManyao/music?method=Albumlist&index=' + options.playIndex,
    //   url: 'https://www.lanbaoai.cn/XiaoManyao/music?method=Albumlist&index=' + options.playIndex,
    //   data: {
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     wx.hideLoading();
    //     var data = res.data; // 接口相应的json数据
    //     var musiclist = data.musiclist; // 接口中的data对应了一个数组，这里取名为 articles
    //     console.log(musiclist);

    //     that.setData({
    //       audioList: musiclist,
    //       coverImg: playImage
    //     })
    //   }
    // })

    //  获取本地存储存储audioIndex
    // var audioIndexStorage = wx.getStorageSync('audioIndex')
    // console.log(audioIndexStorage)
    // if (audioIndexStorage) {
    //   this.setData({ audioIndex: audioIndexStorage })
    // }
  },

  onReady: function (e) {
    console.log('onReady')
    // 使用 wx.createAudioContext 获取 audio 上下文 context
     this.audioCtx = wx.createAudioContext('audio')
  },
  bindSliderchange: function (e) {
    // clearInterval(this.data.timer)
    let value = e.detail.value
    let that = this
    console.log(e.detail.value)
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        console.log(res)
        let { status, duration } = res
        if (status === 1 || status === 0) {
          that.setData({
            sliderValue: value
          })
          wx.seekBackgroundAudio({
            position: value * duration / 100,
          })
        }
      }
    })
  },
  bindTapPrev: function () {
    console.log('bindTapPrev')
    let length = this.data.audioList.length
    let audioIndexPrev = this.data.audioIndex
    let audioIndexNow = audioIndexPrev
    if (audioIndexPrev === 0) {
      audioIndexNow = length - 1
    } else {
      audioIndexNow = audioIndexPrev - 1
    }
    this.setData({
      audioIndex: audioIndexNow,
      sliderValue: 0,
      currentPosition: 0,
      duration: 0,
    })
    let that = this
    setTimeout(() => {
      if (that.data.pauseStatus === true) {
        that.play()
      }
    }, 1000)
    wx.setStorageSync('audioIndex', audioIndexNow)
  },
  bindTapNext: function () {
    console.log('bindTapNext')
    let length = this.data.audioList.length
    let audioIndexPrev = this.data.audioIndex
    let audioIndexNow = audioIndexPrev
    if (audioIndexPrev === length - 1) {
      audioIndexNow = 0
    } else {
      audioIndexNow = audioIndexPrev + 1
    }
    this.setData({
      audioIndex: audioIndexNow,
      sliderValue: 0,
      currentPosition: 0,
      duration: 0,
    })
    let that = this
    setTimeout(() => {
      if (that.data.pauseStatus === false) {
        that.play()
      }
    }, 1000)
    wx.setStorageSync('audioIndex', audioIndexNow)
  },
  bindTapPlay: function () {
    console.log('bindTapPlay')
    console.log(this.data.pauseStatus)
    if (this.data.pauseStatus === true) {
      this.play()
      this.setData({ pauseStatus: false })
    } else {
      wx.pauseBackgroundAudio()
      this.setData({ pauseStatus: true })
    }
  },
  bindTapList: function (e) {
    console.log('bindTapList')
    console.log(e)
    this.setData({
      listShow: true
    })
  },
  bindTapLoop: function () {
    console.log('bindTapLoop')
    console.log(this.data.pauseStatus)

    if (this.data.loopStatus === true) {
      //this.play()
      this.setData({ loopStatus: false })
    } else {
      //wx.pauseBackgroundAudio()
      this.setData({ loopStatus: true })
    }
  },
  bindTapChoose: function (e) {
    console.log('bindTapChoose')
    console.log(e)
    this.setData({
      audioIndex: parseInt(e.currentTarget.id, 10),
      listShow: false
    })
    let that = this
    setTimeout(() => {
      if (that.data.pauseStatus === false) {
        that.play()
      }
    }, 1000)
    wx.setStorageSync('audioIndex', parseInt(e.currentTarget.id, 10))
  },
  play() {
    let { audioList, audioIndex } = this.data
    wx.playBackgroundAudio({
      dataUrl: audioList[audioIndex].url,
      title: audioList[audioIndex].musicname,
      // coverImgUrl: audioList[audioIndex].poster
      coverImgUrl:this.data.coverImg
    })
    let that = this
    let timer = setInterval(function () {
      that.setDuration(that)
    }, 1000)
    this.setData({ timer: timer })
  },
  setDuration(that) {
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        //console.log(res)
        let { status, duration, currentPosition } = res
        if (status === 1 || status === 0) {
          that.setData({
            currentPosition: that.stotime(currentPosition),
            duration: that.stotime(duration),
            sliderValue: Math.floor(currentPosition * 100 / duration),
          })
        }
      }
    })
  },
  stotime: function (s) {
    let t = '';
    if (s > -1) {
      // let hour = Math.floor(s / 3600);
      let min = Math.floor(s / 60) % 60;
      let sec = s % 60;
      // if (hour < 10) {
      //   t = '0' + hour + ":";
      // } else {
      //   t = hour + ":";
      // }

      if (min < 10) { t += "0"; }
      t += min + ":";
      if (sec < 10) { t += "0"; }
      t += sec;
    }
    return t;
  },
  onShareAppMessage: function () {
    let that = this
    return {
      title: 'light轻音乐：' + that.data.audioList[that.data.audioIndex].name,
      success: function (res) {
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '分享失败',
          icon: 'cancel',
          duration: 2000
        })
      }
    }
  }
})