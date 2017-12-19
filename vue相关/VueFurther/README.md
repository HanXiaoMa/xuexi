# Vue Study Note


## 一、初识Vue
### 1、Vue简介
#### 1.1 Vue的概念
	是目前最流行的前端MVC框架
#### 1.2 Vue的作者
	尤雨溪(华人),前谷歌员工
#### 1.3 Vue的官网
	https://cn.vuejs.org
#### 1.4 Vue的优势
   + 简洁 - HTML模板 + Vue实例 + JSON数据
   + 轻量 - 17kb,性能好
   + 设计思想 - 视图与DOM分离,无需操作DOM
   + 社区 - 大量的中文资料和开源案例


### 2、MVC框架
#### 2.1 什么是框架
	封装与业务无关的重复代码,形成框架
#### 2.2 框架的优势
	使用框架提高开发效率
#### 2.3 什么是MVC (见1-1 初识vue.html)
	分为三部分：
   + 模型(Model) - data
   + 视图(View) - HTML
   + 控制器(Controller) - Vue实例


### 3、表达式的概述及使用
#### 3.1 什么是表达式
    使用双大括号来包裹js代码构成表达式
#### 3.2 表达式用来干什么
    将双大括号中的数据替换成对应的属性值进行展示
#### 3.3 双大括号语法
    也叫作模板语法,Mustache语法
#### 3.4 表达式中可以写入哪些内容 (见1-2 表达式.html)
   + Json数据
   + 数字
   + 字符串
   + 表达式


### 4、事件及this指针
#### 4.1 事件
      var vm=new Vue({
          el:'#box',
          data:{},
          // 定义事件
          methods:{
              // 函数名:fuunction(){代码块}
          }
      });
#### 4.2 this
      var vm=new Vue({
          el:'#box',
          data:{},
          methods:{
            fn:function(){
              // this关键字,代表Vue实例
              console.log(this);
            }
          }
      });

---------------

## 二、指令
### 1、指令的基本概念
    指令是指带有v-前缀的特有属性
### 2、指令的用途
    在表达式的值进行改变时,将某些行为应用到DOM上
### 3、指令的书写规范
   + 书写位置：任意HTML元素的开始标签内
   + 注意：一个开始标签内可写入多个指令,多个指令间使用空格分隔

### 4、常见指令
#### 4.1 v-show
	作用：控制切换一个元素的显示和隐藏
	语法：v-show=表达式
	解析：
		- 根据表达式结果的真假,确定是否显示当前元素
		- true表示显示该元素,false表示隐藏该元素 
		- 本质上是控制display的值
#### 4.2 v-on
    作用：为HTML元素绑定事件监听
    语法：v-on:事件名称="函数名称"
    简写语法：@事件名称="函数名称"
    注：函数定义在methods配置项中

#### 4.3 v-model
    作用：将用户的输入同步到视图上
    语法：v-model=变量
    注：v-model指令必须绑定在表单元素上
    扩展：绑定在复选框上
        type:checkbox
        v-model与bool值绑定,true为选择,false为取消选择

#### 4.4 v-for
    作用：遍历data中的数据,并在页面进行数据的展示
    语法：v-for="(item,index) in arr"
        item - 表示每一次遍历得到的元素
        index - 表示item的索引,可选参数

#### 4.5 v-bind
    作用：绑定HTML元素的属性
    语法：v-bind:属性名="表达式"
    注：
        - 绑定一个属性：<img v-bind:src="myUrl" />
        - 绑定多个属性：<img v-bind="{src:myUrl,title:msg}" />

#### 4.6 v-text
    作用：更新元素的textContent
    语法：v-text="msg"
    注：与双大括号语法类似

#### 4.7 v-if
    作用：根据表达式结果控制一个元素显示或者移除
    语法：v-if="表达式"
    注：
        - 表达式结果为true,则显示这个元素
        - 表达式结果为false,则移除这个元素
    和v-show的区别：
        v-if 原理：如果表达式结果为false,元素隐藏是因为元素没有被渲染到页面中
        v-show 原理：通过控制元素的display属性来控制一个元素的显示和隐藏
    实现效果相近的：
        表达式 - 相当于字符串拼接的效果
        v-text - 相当于innerHTML

#### 4.8 v-else
    和v-if/v-else-if指令配合使用,见api文档

#### 4.9 v-cloak
    防止数据加载速度慢时,页面上闪出双大括号
    使用方法：
    [v-cloak]{
        display:none;
    }
    <h3 v-cloak>{{item}}</h3>


----------------


## 三、交互及实例的生命周期
### 1、交互的基本概念
#### 1.1 前后端的概念
    任何一个程序都有前端(浏览器)和后端(服务器)
#### 1.2 前后端交互原理
    数据库<----数据---->后台<----数据---->前台
#### 1.3 交互的应用场景
    从后端获取一些数据,将其进行展示和计算;
    将用户在页面中提交的数据发送给后端


### 2、vue交互
#### 2.1 vue-resource
    vue交互需要借助vue-resource.js($http)完成,语法是使用Promise语法规范
#### 2.2 常用交互类型
  + get
      语法：
        this.$http.get('url',{params:{key1:val1,key2:val2}}).then(function(res){SUCCESS},function(res){ERROR}); 
  + post
      语法：
        this.$http.post('url',{},{emulateJSON:true}).then(function(res){SUCCESS},function(res){ERROR}));
  + jsonp
      语法：
        this.$http.jsonp('url',{params:{key1:val1,key2:val2}},{emulateJSON:true}).then(function(res){SUCCESS},function(res){ERROR}));

#### 2.3 什么时候使用什么请求
  + get - 参数拼接到url上,保密性的信息不要使用,对文件大小有限制不要使用
  + post - 允许传递数据大小 
  + 使用哪一种请求方式是由后台人员决定的,在接口文档中会进行详细的标注,使用什么请求方式


### 3、过滤器
#### 3.1 作用
    在不改变的情况下,输出前端需要的格式数据
#### 3.2 过滤器的定义方法
    Vue.filter('sum',function(val){
        return val+4;
    });
#### 3.3 过滤器的调用
    {{msg | sum }}

#### 3.4 注意事项
   + 定义过滤器,必须放在Vue实例化前面
   + 在没有冲突的前提下,过滤器可以串联 


### 4、实例的生命周期
#### 4.1 什么是实例的生命周期
    实例在被创建前经过的一系列初始化的过程
#### 4.2 什么是生命周期钩子
    在生命周期中被自动调用的函数
#### 4.3 生命周期钩子的用途
    为我们提供执行自定义逻辑的机会
#### 4.4 钩子函数有哪些
   + beforeCreate
   + created
   + beforeMount
   + mounted
   + beforeUpdate
   + updated
   + beforeDestroy
   + destroyed 


### 5、事件修饰符
#### 5.1 概念
    v-on指令提供了事件修饰符来处理DOM事件的细节
#### 5.2 按键修饰符
    .enter .up .down .ctrl .space ... ...
#### 5.3 阻止事件默认行为修饰符
    .prevent (up,a,form,右键... ...)
#### 5.4 阻止事件冒泡修饰符
    .stop
    事件的执行机制：
    根===>元素1===>元素2===>事件源(target)
    先捕获(从根-事件源)后冒泡(从事件源-根)
#### 5.5 注意
    修饰符是可以串联使用的


------------


## 四、组件
### 1、什么是组件
#### 1.1 组件的概念
    自定义控件
#### 1.2 组件的用途
    可以封装可重用的代码,扩展html标签的功能
#### 1.3 组件的本质
    自定义标签

### 2、组件的分类
#### 2.1 全局组件
    1) 作用域：不同作用域内均可使用
    2) 语法：
        Vue.component('名称',{
            template:'模版'
        });
    3) 定义位置：创建实例前定义全局组件
    4) template的设置：
      - template:'html代码'
      - template:'#tagIdName'
    5) 组件的调用方法
      <组件名></组件名>
    6) 数据的定义：
        data(){
          return{
            
          }
        }
        组件中定义数据,需要避免引用赋值,是以函数返回值的形式定义数据的
#### 2.2 局部组件
    1) 作用域：只在定义该组件的作用域内使用
    2) 语法：
        new Vue({
          el:'#box',
          components:{
            'Hello':{
              template:'<h3>I am a HelloWorld component</h3>',
              data(){
                return{
                  
                }
              }
            }
          }
        });

### 3、Props
#### 3.1 props的作用
    用来声明它期待获得的数据
#### 3.2 props的本质
    为元素属性
#### 3.3 props的声明
   + Js中
      props:['message','',... ...]
   + HTML中
      <组件 message="val"></组件> 

#### 3.4 props的使用
   + 与data一样,可以用在模板中
   + 可以在vm实例中像this.message这样使用

### 4、Slot
#### 4.1 slot的作用
    用来混合父组件的内容与子组件自己的模版
#### 4.2 slot语法
##### 4.2.1 在子组件模版中：
      <div>
          <h2>子组件的标题</h2>
          <slot>
            只有在没有要分发的内容时才会显示
          </slot>
      </div>
##### 4.2.2 在父组件模板中
      <div>
          <h2>父组件的标题</h2>
          <my-component>
              <p>这是一些初始的内容</p>
              <p>这是一些后续的内容</p>
          </my-component>
      </div>
#### 4.3 具名slot
   + slot元素可以用一个特殊属性name来配置如何分发内容
   + 多个slot可以有不同的名字
   + 具名slot将匹配内容片段中有对应slot特性的元素

##### 4.3.1 语法
            <slot name="img1"></slot>
      匹配：<img src="" alt="" slot="img1">

### 5、父子组件
#### 5.1 语法
    components:{
      'parents':{
        template:'',
        components:{
          'child':{
            template:''
          }
        }
      }
    }
#### 5.2 注意事项
   + 父子组件间作用域相互独立
   + 子组件只能在父组件的模板中进行调用

### 6、事件监听
#### 6.1 抛出自定义事件监听语法
      this.$emit('event',val);//参数1：自定义事件的名称,参数2(可选参数)：通过自定义事件传递的值
      $emit:实例方法,用来触发事件监听
#### 6.2 接收自定义事件监听语法
      <component @event="fn"></component>
      fn:function(val){
        // val 为自定义事件传出的值
      }
#### 6.3 原则
      谁触发的监听,由谁去接收监听

-----------------

## 五、项目环境配置及单文件组件
### 1、项目环境配置
#### 1.1 安装node 
      https://nodejs.org
#### 1.2 安装vue-cli 
      cnpm install vue-cli -g
#### 1.3 安装webpack
      cnpm install webpack -g
#### 1.4 创建项目
      vue init webpack myvue 
#### 1.5 切换到项目目录
      cd myvue
#### 1.6 安装启动模块
      cnpm install
#### 1.7 启动项目
      npm run dev

### 2、项目目录结构分析
#### 2.1 build
      配置了webpack的基本配置,开发环境配置及生产环境配置
#### 2.2 config
      配置了路径端口值等
#### node_modules
      为依赖的模块
#### src
      放置组件和入口文件
#### static
      放置静态资源文件
#### index.html
      项目入口文件

### 3、单文件组件
#### 3.1 定义 .vue文件
      HTML：
        <template>
          <div>
              <h3>123</h3>
          </div>
        </template>
      Js:
        <script>
          export default{
            组件配置项
          }
        </script>
      CSS:
        <style>
          设置自己的样式
        </style>


-------------


## 六、路由配置
### 1、路由的作用
    根据url锚点路径,在容器中加载不同的模块,进而完成spa的开发
### 2、路由的原理
    利用锚点进行切换,页面不会刷新
### 3、路由功能引入
    官网推荐使用vue-router.js库来引入路由功能模块
### 4、路由配置方法
#### 4.1 一级路由配置方法
   + 引入vue-router库文件
   + 创建路由所需模块(使用Vue.extand()方法来创建模块)
   + 分配路由路径
      routes:[{path:'/home',components:Home}]
   + 创建路由对象
      var router=new VueRouter({
        // 分配路由的路径
      });

#### 4.2 router-link/view的应用
    使用路由去完成跳转,就不再使用a标签了
        1)<router-link></router-link>,在两对尖括号中添加文本,url地址设置在一个to的属性下面
        to = 路由配置时,routes数组中的path信息,需要填写在此处 
        2)<router-view></router-view>,是用来占位的

#### 4.3 二级路由配置方法
   + children:[{path:'film',component:Film}]

### 5、路由重定向
#### 5.1 路由对象
    $router
#### 5.2 路由跳转方法
    $router.push('url')
#### 5.3 默认路由设置
    redirect

### 6、路由传参
#### 6.1 传递参数
    通过点击不同的link进行传递,将二级路由的路径信息进行传递
    <router-link to="/news/001">新闻001</router-link>
#### 6.2 接收参数
    通过$route(注意区分)
    $route.params.id

-------------

## 七、项目框架搭建步骤解析
### 1、依赖vue-cli和webpack创建项目模板,安装依赖，启动项目
    vue init webpack douban | cnpm install | npm run dev 
### 2、建立页面目录及pages创建主页面组件
    例如：主页面组件：Home/home.vue Group/group.vue... ...
    主页面又是由不同的小组件组成的,可以放置在components或者pages中
### 3、配置路由信息
    在router目录下修改index.js文件,引入组件进行相关路由的配置
### 4、开发公共部分组件

--------------

## 八、项目结构分析
### 1、项目入口
    index.html(div#app)
### 2、全局vue组件
    App.vue(template#app) - 在里面写入公共部分(底部导航+router-view)
### 3、配置路由
    router/index.js