var app = getApp();
var util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取movieId
    var movieId = options.id;
    // 获取到url
    var url = app.globalData.doubanBase + "/v2/movie/subject/" + movieId;
    // 请求数据的函数
    util.http(url, this.processDoubanData);
  },
  // 操作数据的函数
  processDoubanData: function (data) {
    //console.log(data);
    if (!data) {
      return;
    }
    // 处理导演的数据
    var director = {
      avatar: "",
      name: "",
      id: ""
    }
    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large

      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }
    // 取到详情页需要的数据
    var movie = {
      movieImg: data.images ? data.images.large : "",//海报图片
      country: data.countries[0],//国家
      title: data.title,//标题
      originalTitle: data.original_title,//别名
      wishCount: data.wish_count,//多少人想看
      commentCount: data.comments_count,//多少人评论
      year: data.year,//年份
      generes: data.genres.join("、"),//剧情的类型
      stars: util.convertToStarsArray(data.rating.stars),//星星组件的处理
      score: data.rating.average,//电影评分
      director: director,//上面处理过的导演信息
      casts: util.convertToCastString(data.casts),//演员名字
      castsInfo: util.convertToCastInfos(data.casts),//演员图文介绍
      summary: data.summary//简介
    }
    console.log(movie);
    // 更新数据
    this.setData({
      movie:movie
    });
  },
  // 查看图片
  viewMoviePostImg:function(e){
    var src=e.currentTarget.dataset.src;
    wx.previewImage({
      urls: [src],//当前预览图片的http列表
      current:src//当前显示图片的http链接
    })
  }

})