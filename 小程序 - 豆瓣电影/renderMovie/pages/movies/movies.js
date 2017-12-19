/*
    RESTFUL API - JSON (现在流行的接口方式) - 是可以自描述的
    SOAP - XML (以前流行的接口方式)
*/
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    // search的数据
    searchResult: {},
    // 定义两个变量分别表示movie容器的显示和搜索页面的显示
    containerShow:true,
    searchShow:false
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取API接口路径
    // 根据页面我们只需要取三条数据,所以根据豆瓣API设置start和count数量
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";

    // 发送请求 - 异步是很难决定先后的
    // 怎样确定你调用的是哪一个数据,则需要在函数中传入区分的key值
    this.getMovieListData(inTheatersUrl, "inTheaters","正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon","即将上映");
    this.getMovieListData(top250Url, "top250","豆瓣Top250");
  },
  // 发送请求的函数
  getMovieListData: function (url, settedkey, categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      method: "GET",
      header: {
        "Content-type": "application/xml"
      },
      success: function (res) {
        console.log(res);
        that.processDoubanData(res.data, settedkey, categoryTitle);
      },
      fail: function (error) {
        console.log(error);
      }
    })
  },
  // 处理接收到的数据函数 - 目的是为了将数据使用setData的方式存放在data中去替换wxml中的假数据
  /*
      moviesDouban - 异步获取到的数据
      settedkey - 分类的key值,例如：inTheaters,comingSoon,top250
      categoryTitle  - 标题
  */
  processDoubanData: function (moviesDouban, settedkey, categoryTitle) {
    // 使用一个空数组来作为处理完数据的容器
    var movies = [];
    // 遍历一下我们要处理的数据
    for (var idx in moviesDouban.subjects) {
      // 找到title
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      // 处理title - 如果长度大于等于6,则显示...
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      // 先把用到的元素装到一个对象temp里面,最后再把它push到数组容器中去
      var temp = {
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id,
        stars: util.convertToStarsArray(subject.rating.stars)
      }
      movies.push(temp);

    }
    // 重置一下数据 - 注意需要区分一下是哪一个下面的电影,用到了一个小技巧(利用动态属性)
    var readyData = {};
    readyData[settedkey] = {
      categoryTitle: categoryTitle,
      movies: movies
    };
    this.setData(readyData);
    // console.log(readyData[settedkey]);
  },
  
  // 搜索框获得焦点时触发
  onBindFocus:function(event){
      /*
          思路：显隐搜索页面
          通过变量的true和false去判断
      */
      this.setData({
        containerShow:false,
        searchShow:true
      });
  },
  // 点击叉号关闭搜索页面,显示movie页面 
  onCancelImgTap:function(event){
    this.setData({
      containerShow: true,
      searchShow: false,
      // 关闭的时候将绑定的数据进行置空即可
      searchResult: {}
    });
  },
  // 执行搜索 
  onBindConfirm:function(event){
    // 首先获取你在输入框中输入的数据
    var text = event.detail.value;
    //console.log(text);
    // 获取searchUrl地址
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
    // 调用发送数据请求的函数
    this.getMovieListData(searchUrl,"searchResult","");
  },

  // 点击更多跳转更多电影页面
  onMoreTap: function (event) {
    var category = event.currentTarget.dataset.category;
    // 页面跳转 wx.navigateTo
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category
    });
  },

  // 点击内容进入详情页 
  onMovieTap:function(event){
    var movieId = event.currentTarget.dataset.movieid;
    //console.log(movieId);
    // 页面跳转 wx.navigateTo
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id='+movieId
    });
  }
})