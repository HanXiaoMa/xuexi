var postsData=require("../../data/posts-data.js");
Page({

  /**
   * 页面的初始数据 - 单向的数据绑定
   */
  data: {
    // 小程序总是会读取data对象来做数据绑定
    posts_key:[]
  },
  /*
    target:指的是当前点击的组件 - 指的是图片
    currentTarget:指的是事件捕获的组件 - 指的是轮播图
  */
  // 点击轮播图片
  onSwiperItemTap:function(event){
    var postid = event.currentTarget.dataset.postid;//获取自定义属性的postid值
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postid
    });
  },
  // 点击轮播父级
  onSwiperTap:function(event){
    var postid = event.target.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postid
    });
  },
  onPostTap:function(event){
    //console.log(event);
    var postid=event.currentTarget.dataset.postid;//获取自定义属性的postid值
    //console.log(postid);
    wx.navigateTo({
      url:'post-detail/post-detail?id='+postid
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
      this.setData(); //好比把数据写在data中一样
    */
    this.setData({
      posts_key: postsData.postList
    });
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