// 1、处理星星评分函数 接收传入的星星数stars 形式: [1,1,1,0,0]
function convertToStarsArray(stars) {
  // 利用字符串截取只获取第一个数字 3、4、5
  var num = stars
    .toString()
    .substring(0, 1);
  // 定义一个空数组作为容器用来接收内容
  var array = [];
  // 进行循环遍历
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    } else {
      array.push(0);
    }
  }
  // 返回数组array
  return array;
}

// 2、异步请求数据
function http(url, callBack) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "application/xml"
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function (error) {
      console.log(error);
    }
  })
}

// 3、处理电影详情演员部分使用/给拼接起来
function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2); //把最后的斜杠给去除掉
}

// 4、处理电影详情页演员图文的函数
function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars
        ? casts[idx].avatars.large
        : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

// 需要导出模块
module.exports = {
  convertToStarsArray: convertToStarsArray,
  http: http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos
}