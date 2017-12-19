var app = getApp();
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 设置导航栏标题
    navigateTitle: "",
    // 设置请求的url地址
    requestUrl: "",
    // 设置电影集合,用来保存所获取的电影
    movies: {},
    // 当前从多少数据开始,但是需要进行累加
    totalCount: 0,
    // 设置是否是空的
    isEmpty: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取相应标题
    var category = options.category;
    // 设置到data中
    this.data.navigateTitle = category;

    // 通过不同的category使用switch case去设置不同数据的url
    var dataUrl = "";
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    // 设置到data中存储起来
    this.data.requestUrl = dataUrl;
    // 请求数据函数
    util.http(dataUrl, this.processDoubanData);
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function (event) {
    var refreshUrl = this.data.requestUrl + "?star=0&count=20";
    this.data.movies = {};
    this.data.isEmpty = true;
    this.data.totalCount = 0;
    util.http(refreshUrl, this.processDoubanData);
    // wx.startPullDownRefresh();
    wx.showNavigationBarLoading();
  },
  // 处理数据函数
  processDoubanData: function (moviesDouban) {
    // 和movie.js中的处理一致,都是把需要的数据
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp);
    }

    // 为了解决新加载的数据合并的问题
    var totalMovies = {};
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies);
    } else {
      totalMovies = movies;
      this.data.isEmpty = false;//不是第一次加载的了
    }

    // 设置数据
    this.setData({
      movies: totalMovies
    });
    // 把数量累加
    this.data.totalCount += 20;
    // 关闭顶部加载状态
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  // 滚动加载数据
  onScrollLower: function (event) {
    //console.log("加载更多");
    var nextUrl = this.data.requestUrl +
      "?start=" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processDoubanData);
    //console.log(this.data.totalCount);
    // 设置顶部加载的状态
    wx.showNavigationBarLoading();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 设置导航栏标题
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var nextUrl = this.data.requestUrl +
      "?start=" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processDoubanData);
    // 设置顶部加载的状态
    wx.showNavigationBarLoading();
  },

  // 点击内容进入详情页 
  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    //console.log(movieId);
    // 页面跳转 wx.navigateTo
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})