var postsData = require("../../../data/posts-data.js");
var app = getApp();
Page({
  data: {
    // 设置是否播放音乐
    isPlayingMusic:false,
    // 当前的postId
    currentpostId:""
  },
  onLoad: function (option) {
    //console.log(option);
    // 1、获取详情页面的数据
    // 获取到从列表页面url传过来的id值
    var postId = option.id;
    this.data.currentpostId = postId;//设置当前的postId
    // 通过id值去数据中获取相应的数据
    var postData = postsData.postList[postId];
    // 更新数据
    this.setData({
      postData: postData
    });

    //拓展：缓存-设置
    //wx.setStorageSync('key', 'data');
    // wx.setStorageSync('key', {
    //   game:'feng'
    // });

    //2、用户收藏功能 - 获取
    /*
        缓存的结构
        var postsCollected = {
          postId:true,
          postId:false,
          postId:false
        }
    */
    // 获取缓存数据
    var postsCollected = wx.getStorageSync('postsCollected');
    if (postsCollected) {
      var postcollected = postsCollected[postId];//拿到了是否收藏的状态,true或者false
      // 需要进行数据的更新操作 - 设置一个collected进行得到状态并存储在data中
      this.setData({
        collected: postcollected
      });
    } else {
      // 如果没有缓存就把缓存的数据置为空
      var postsCollected = {};
      // 然后把收藏的状态置为FALSE
      postsCollected[postId] = false;
      // 把缓存设置上去
      wx.setStorageSync('postsCollected', postsCollected);
    }

    // 点击播放图标和总控开关都会触发这个函数,为了保持两者的状态同步
    // 通过判断app中的公共变量去设置当前页面的变量的true和false值
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId){
      // 如果为真,就表示正在被播放,就把isPlayingMusic设置为true
      this.setData({
        isPlayingMusic:true
      });
    }
    this.setMusicMonitor();
  },
  onCollectionTap: function (event) {
    //拓展：缓存-获取
    // var game=wx.getStorageSync('key');
    // console.log(game);

    // 2、用户收藏功能 - 设置
    this.getPostsCollectedSyc();
  },
  // 异步 - 会立刻的走完,不会让UI出现停滞
  getPostsCollectAsy:function(){
    var that = this;
    wx.getStorage({
      key: 'postsCollected',
      success: function(res) {
        var postsCollected = res.data;
        var postcollected = postsCollected[that.data.currentpostId];//拿到现在的收藏状态
        postcollected = !postcollected;//取反,收藏变为未收藏
        //更新缓存
        postsCollected[that.data.currentpostId] = postcollected;

        // 交互操作
        that.showModal(postsCollected, postcollected);
      },
    })
  },
  // 同步 - 如果执行的非常慢的话,整个的UI会在这卡主
  getPostsCollectedSyc:function(){
    //点击进行收藏
    var postsCollected = wx.getStorageSync('postsCollected');//获取缓存数据
    var postcollected = postsCollected[this.data.currentpostId];//拿到现在的收藏状态
    postcollected = !postcollected;//取反,收藏变为未收藏
    //更新缓存
    postsCollected[this.data.currentpostId] = postcollected;

    // 交互操作
    this.showModal(postsCollected, postcollected);
  },
  showModal: function (postsCollected, postcollected) {
    var that = this;
    // 交互操作 modal
    wx.showModal({
      title: '收藏',
      content: postcollected?'收藏该文章':'取消收藏该文章',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#333',
      confirmText: '确认',
      confirmColor: '#405f80',
      success:function(res){
        if(res.confirm){
          //重新设置缓存
          wx.setStorageSync('postsCollected', postsCollected);
          // 需要进行数据的更新操作
          that.setData({
            collected: postcollected
          });
        }
      }
    })
  },
  showToast: function (postsCollected, postcollected) {
    var that = this;
    //重新设置缓存
    wx.setStorageSync('postsCollected', postsCollected);
    // 需要进行数据的更新操作
    that.setData({
      collected: postcollected
    });
    // 交互操作 toast
    wx.showToast({
      title: postcollected ? "收藏成功" : "取消成功",
      duration: 2000
    });
  },
  onShareTap: function (event) {
    // 拓展：缓存-清除
    //wx.removeStorageSync('key');
    // wx.clearStorageSync();//清除全部缓存

    // 分享操作 actionsheet
    wx.showActionSheet({
      itemList: [
        "分享给微信好友",
        "分享到朋友圈",
        "分享到QQ",
        "分享到微博"
      ],
      itemColor:'#405f80',
      success:function(res){
        console.log(res.tapIndex);//点击的是哪一个
      }
    })
  },
  // 3、音乐播放 - 图片同步问题
  // 音乐播放会出现一个问题,就是在点击出现的小tool的play按钮时不会和头部的图片状态同步
  // 在退出当前详情页后,再进入时,音乐是播放的,但是头部的图标却是与当前播放状态不符的
  // 在解决完点击返回后还是播放状态后，还有一个问题，就是在你再进入其他详情页的时候，会发现其他的详情页的音乐也是处于一个播放状态
  // 点击图片的暂停，不会从上次开始的地方继续，而是重新播放；而是总控开关是好的 - 是在真机的状态下是OK的
  setMusicMonitor:function(event){
    var that = this;
    wx.onBackgroundAudioPlay(function(){
      that.setData({
        isPlayingMusic: true
      });
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = that.data.currentpostId;
    });
    wx.onBackgroundAudioPause(function(){
      that.setData({
        isPlayingMusic: false
      });
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    });
    wx.onBackgroundAudioStop(function(){
      that.setData({
        isPlayingMusic: false
      });
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    });
  },
  // 3、音乐播放 - 需要主动去关闭,如果不主动去关闭它,音乐播放是不会主动去停止的
  onMusicTap:function(event){
    var currentPostId = this.data.currentpostId;//获取当前的postId
    var postData = postsData.postList[currentPostId];//根据postId获取相应的数据
    // 定义一个变量表示音乐是否播放
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic){
      wx.pauseBackgroundAudio();//暂停音乐
      // 改变一下isPlayingMusic的状态
      this.setData({
        isPlayingMusic:false
      });
    }else{
      wx.playBackgroundAudio({//开启音乐
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImgUrl
      });
      this.setData({
        isPlayingMusic:true
      });
    } 
  }
})