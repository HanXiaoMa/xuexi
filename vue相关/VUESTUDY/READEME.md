## 一、Vue简介
### 1、vue.js是什么
    - 官网:vuejs.org
    - 版本:v1.0,v2.0
    - 是一个前端的框架,用来构建用户前端视图的框架;轻量级的前端MVVM框架(Model-View-ViewModel),其实简单的说就是数据的双向绑定;核心的思想是数据驱动+组件化开发
    - 通过简单的API就可以实现'响应式的数据绑定'和'组合的视图组件'
    - 相比较angular而言,学习曲线相对平缓一些,更加容易上手,也更加小巧

### 2、vue和angular的一些区别
#### 2.1 angular
    - 上手比较难
    - 指令(以ng-xxx开头)
    - 所有属性和方法都存在作用域$scope中
    - Google维护
#### 2.2 vue
    - 更加简单易学
    - 指令(以v-xxx开头)
    - HTML+Json+Vue实例进行数据存储
    - 个人维护(尤雨溪：目前就职于阿里巴巴)

#### 2.3 共同点
    - 都不兼容低版本的IE

## 二、起步
### 1、下载核心库vue.js
    - bower info vue
    - npm init --yes/cnpm install vue --save-dev
    - vue2.0和vue1.0相比,是加入了虚拟DOM(页面更新的时候速度会更快)

### 2、Hello world实例
#### js:   
    new Vue({
        el:'#app',//指定要关联的元素(选择器)
        data:{//用来存储数据
            msg:'Hello world'
        }
    });
    
#### html:
    <div id="app">
        {{msg}}
    </div>

### 3、安装vue-devtools插件
## 三、常用的指令
### 1、什么是指令? - 用来扩展html标签的功能
### 2、vue中常用的指令
    - v-model (双向数据绑定,一般用于表单元素)
    - v-for (对数组或者对象集合进行循环操作)
    - v-on (进行事件的绑定v-on:click)
    - v-show / v-if (用来显示或者隐藏元素 v-show是通过display来进行操作的,v-if是每次删除后再重新创建)

## 四、事件和属性
### 1、事件
#### 1.1 事件简写
    v-on:click => 简写：@click
#### 1.2 事件对象$event
    包含一些事件相关的信息,比如：事件源,事件类型,偏移量
#### 1.3 事件冒泡
    阻止事件冒泡
        a) 原生JS的方式,依赖于事件对象的 e.stopPropagation();
        b) vue方式,不依赖于事件对象 @click.stop
#### 1.4 事件默认行为
    阻止默认行为
        a) 原生JS的方式,依赖于事件对象 e.preventDefault();
        b) vue方式,不依赖于事件对象 @click.prevent

#### 1.5 键盘事件
    @keypress,@keyup,@keyup
    自定义键位别名 Vue.config.keyCodes={a:65};

### 2、属性
#### 2.1 属性绑定和属性简写
    v-bind 用于属性绑定 :[attr]

#### 2.2 class和style属性
    2.2.1 class 
        在绑定时语法相对来说比较复杂
        <!--方式1：通过普通变量的形式-->
            <p :class="a">11111</p>
        <!--方式2：通过数组的形式同时引用多个-->
            <p :class="[a,b]">22222</p>
        <!--方式3：以json的形式进行 [这种方式是最常用的]-->
            <p :class="{aa:false,bb:false,cc:true}">3333</p>
            <p :class="{aa:num>0}">444</p>
        <!--方式4：变量引用json形式-->
            <p :class="hello">555</p>
    2.2.2 style
        <span :style="x">1111111111</span>
        <span :style="[x,y]">2222222222</span>


## 五、模板
### 1、简介
    vue.js使用基于HTML的模板语法,可以将页面中的DOM绑定到vue中的数据
    模板就是{{}},用来进行数据绑定,显示在页面中,也称为Mustache语法

### 2、数据绑定的方式
    a) 双向绑定 v-model
    b) 单向绑定
        方式1：{{}},可能会出现闪烁问题,可以使用v-cloak解决
        方式2：使用指令 v-text[等价于{{}}]、v-html  [区别在于v-html能够识别html标签]

### 3、其他指令
    v-once 数据只绑定一次
    v-pre 不编译,直接原样显示


## 六、过滤器
### 1、简介
    用来过滤模型数据,在渲染显示之前进行数据处理和筛选
    语法：{{data | filter1(params) | filter2(params)}}

### 2、关于内置过滤器
    vue1.0内置了很多过滤器,有一些跟angular是一样的
    vue2.0把所有的内置过滤器都删掉了
        如何解决：
        a) 使用第三方工具库,如：loadash,date-fns(日期的),accounting.js(货币格式化的)
        b) 可以自定义过滤器

### 3、自定义过滤器
    分类：
    3.1 全局过滤器 Vue.filter(ID,callback);
    3.2 局部过滤器 filters

## 七、发送ajax请求
### 1、简介
    vue本身是不支持发送ajax请求的,在vue1.0建议使用vue-resource(不更新不维护了),在vue2.0中建议使用axios(基于promise语法的Http请求客户端,用来发送请求)

### 2、使用axios发送ajax请求 - https://github.com/mzabriskie/axios
#### 2.1 安装并引入 bower/cnpm
#### 2.2 基本用法
    axios([options])
    axios.get(url[,options]);
        传参方式：
            1.通过url传参
            2.通过params选项传参
    axios.post(url,data,[options]);
        axios默认发送数据时，数据格式是Request Payload，并非我们常用的Form Data格式，
        所以参数必须要以键值对形式传递，不能以json形式传参
        传参方式：
            1.自己拼接为键值对
            2.使用transformRequest，在请求发送前将请求数据进行转换
            3.如果使用模块化开发，可以使用qs模块进行转换

     axios本身并不支持发送跨域的请求，没有提供相应的API，作者也暂没计划在axios添加支持发送跨域请求，所以只能使用第三方库

### 3、使用vue-resource发送跨域请求
#### 3.1 安装vue-resource并引入 
#### 3.2 基本用法
    使用this.$http发送请求  
        this.$http.get(url, [options])
        this.$http.head(url, [options])
        this.$http.delete(url, [options])
        this.$http.jsonp(url, [options])
        this.$http.post(url, [body], [options])
        this.$http.put(url, [body], [options])
        this.$http.patch(url, [body], [options]) 

## 八、Vue生命周期
### 1、Vue实例从创建到销毁的过程,称为生命周期
    beforeCreate - 组件实例刚刚创建,还未进行数据观测和事件的配置
    created - 组件实例创建完成,并且进行数据的观测和事件的配置
    beforeMount - 模板编译之前,还没有挂载
    mounted - 模板编译之后,已经挂载了,此时才会渲染完成,才能看到页面上数据的展示
    beforeUpdate - 组件更新之前
    updated - 组件更新完成
    beforeDestroy - 组件销毁之前
    destroyed - 组件销毁之后

### 2、$destroy() - 数据销毁方法


## 九、计算属性
### 1、基本用法
    也是用来存储数据的,但是具有以下几个特点：
        a) 数据可以进行逻辑处理操作
        b) 对计算属性中的数据进行监视

### 2、计算属性和方法的区别
#### 2.1 将计算属性的get函数定义为一个方法也可以实现类似的功能
#### 2.2 区别
        a:计算属性是基于它的依赖进行更新的,只有在依赖发生改变时才会发生变化
        b:计算属性是有缓存的,只要他所依赖的属性没有改变,多次访问计算属性得到的值是之前缓存的计算结果,不会多次执行
#### 2.3 计算属性的组成 get和set
        分别用来获取计算属性和设置计算属性,默认只有get,需要set的话,得自己添加


## 十、vue实例的属性和方法
### 1、属性
    $el - 获取vue实例关联的元素 - 是一个DOM对象
    $data - 获取数据对象的
    $options - 获取自定义属性
    $refs - 获取页面中所有添加ref属性的元素
### 2、方法
    $mount() - 手动的挂载vue实例
    $destroy() - 销毁实例,销毁之后就不能用了
    $nextTick(callback) - DOM还没更新完,Vue实现响应式并不是数据发生改变之后DOM立即变化,需要按照一定的策略进行DOM更新,需要时间 - 等待DOM执行完之后再执行下面的代码

    $set(obj,key,value) - 使用vue实例的$set方法可以为对象添加属性,可以进行实时监控
    $delete(obj,key)
    $watch(data,callback,options) - 用来观测数据的变化

## 十一、自定义指令与过渡
### 1、自定义全局指令
    使用全局方法Vue.directive(id,指令的定义对象)
### 2、自定义局部指令
    directives

## 十二、过渡
### 1、简介
    Vue在插入,更新或者移除DOM时,提供多种不同方式的应用过渡效果
    其实本质上还是使用css3动画：transition,animation

### 2、基本用法
    使用了transition组件,将要执行动画的元素包含在组件内
    <transition></transition>

### 3、钩子函数 - 对应的执行方法
    @before-enter="beforeEnter" 
    @enter="enter" 
    @after-enter="afterEnter" 
    @before-leave="beforeLeave" 
    @leave="leave" 
    @after-leave="afterLeave"

### 4、结合第三方动画库 - animate.css
    enter-active-class="animated bounceInLeft" 
    leave-active-class="animated fadeOut"

### 5、多元素动画
    <transition-group></transition-group>


## 十三、组件component
### 1、什么是组件？
    组件是vue.js最强大的功能之一,组件可以扩展html元素,封装可重用的代码
    组件是自定义元素(对象)

### 2、定义组件的方式
    方式1：先创建组件构造器,然后由组件构造器创造组件
    方式2：直接创造组件

### 3、组件的分类
    (1)全局组件
    (2)局部组件

### 4、引用模版
    将组件的内容放到template中,去引用它,必须是有且只有一个元素

### 5、动态组件 - 多个组件使用同一个挂载点,然后动态的在他们之间进行切换
    <component :is=""></component>

    keep-alive - 使用keep-alive可以缓存非活动组件,可以保留状态,避免重新渲染,默认每次切换都会销毁非活动组件,重新渲染

### 6、组件间的数据传递
#### 1) 父子组件 - 在一个组件内部,又定义了另一个组件
        <1>子组件只能在父组件的内部使用
        <2>默认情况下,子组件无法访问父组件中的数据,每个组件实例的作用域是独立的

#### 2) 组件间数据的传递
        子组件访问父组件中的数据
            a) 在调用子组件时,绑定想要获取的父组件中的数据
            b) 在子组件内部,使用props选项声明获取的数据,即接收来自父组件的数据

            注：
                组件中的数据共有3钟形式：data,props,computed;
                父组件通过props向下传递数据给子组件

        父组件访问子组件的数据
            a) 在子组件中使用vm.$emit(事件名,数据)触发一个自定义的事件,事件名自定义
            b) 父组件在使用子组件的地方监听子组件触发的事件,并在父组件中定义方法,用来获取数据

            注：
                子组件通过事件给父组件发送消息,实际上就是子组件把自己的数据发送给父组件

### 7、单向数据流
    props是单向绑定的,当父组件的属性发生变化时,将传导给子组件,但是不会反过来;而且不允许子组件直接修改父组件的数据,会直接报错的
    解决方式：
        方式1：如果子组件想把它作为局部数据来使用,可以将数据存入另一个变量中再进行操作,不影响父组件中的数据
        方式2：如果子组件想修改数据并且同步更新到父组件,有两个方法：
            <1> 使用.sync(1.0支持,2.0不支持,2.3版本又开始支持了),需要显示的触发一个更新事件
            <2> 可以将父组件中的数据包装成对象,然后再子组件中修改对象的属性,因为对象是引用类型的,指向的是同一个内存空间

### 8、非父子组件间的通讯
    可以通过空的vue实例作为中央事件总线(事件中心),用它来触发事件和监听事件
    var Event=new Vue();
    Event.$emit(事件名,数据);
    Event.$on(事件名,data=>{});

### 9、slot内容分发
    本意：位置、槽
    作用：获取组件中的原内容,类似于angular中的transclude指令



## 十四、vue-router路由
### 1、简介
    使用vue.js开发SPA(单页面应用 - Single Page  Application)
    根据不同的url地址,显示不同的内容,但显示同一个页面中,称之为"单页面应用"

    查看一下vue-router的版本 bower info vue-router

### 2、基本用法
    a) 布局
    b) 配置路由

### 3、路由嵌套和参数的传递
    参数传递的两种形式：
        (1)查询字符串：loginname=tom&pwd=123   -- 获取参数 {{$route.query}}
        (2)rest风格的url：regist/tom/123  -- 获取参数：{{$route.params}}

### 4、路由实例的方法
    a) router.push() - 用来添加路由的,功能上于router-link是一样的
    b) router.replace() - 替换路由,不会产生历史记录

### 5、结合animate.css做动画处理

## 十五、单文件组件
### 1、.vue文件
    是vue.js自定义的一种文件格式,一个.vue的文件就是一个单独的组件,在文件内封装了一个组件相关的代码：
    html,css,js

    总结：一个.vue文件由三个部分组成的：
    <template>
        html
    </template>,
    <style>
        css
    </style>,
    <script>
        js
    </script>

### 2、vue-loader
    浏览器本身并不认识.vue结尾的文件,所以就必须对.vue文件进行加载和解析,就需要vue-loader;类似于这样的加载器还有很多,例如：html-loader,css-loader/style-loader,babel-loader......

    需要注意的是：vue-loader本身是基于webpack的

### 3、webpack
    是一个前端资源模板化加载器和打包工具,它能够把各种资源都作为模块来使用和处理,实际上webpack也是通过不同的loader将这些资源加载后打包,然后输出打包后的文件

    简单来说：webpack就是一个模块加载器,所有资源都可以作为模块来加载,最后打包输出

    webpack有一个核心的配置文件：webpack.config.js,必须要放置在项目的根目录下


### 4、实例Demo步骤
#### 4.1 首先创建一个目录结构
    webpack-demo
        |-index.html 页面
        |-main.js  入口文件
        |-App.vue .vue文件
        |-package.json 工程文件
        |-webpack.config.js webpack的配置文件
        |-.babelrc Babel的配置文件

#### 4.2 编写App.vue
#### 4.3 需要安装相关的模块
    cnpm install vue --save-dev

    cnpm install webpack -g
    cnpm install webpack-dev-server -g

    cnpm install vue-loader --save-dev
    cnpm install vue-html-loader --save-dev
    cnpm install css-loader --save-dev
    cnpm install vue-style-loader --save-dev
    cnpm install file-loader --save-dev

    cnpm install babel-loader --save-dev
    cnpm install babel-core --save-dev
    cnpm install babel-preset-env --save-dev //根据配置的运行环境,自动的去启用babel插件

    cnpm install vue-template-compiler --save-dev //用来预编译模板的

    合并安装：cnpm install -D webpack webpack-dev-server vue-loader vue-html-loader css-loader vue-style-loader file-loader babel-loader babel-core babel-preset-env  vue-template-compiler

#### 4.4 编写入口文件main.js
#### 4.5 编写webpack.config.js文件
#### 4.6 编写.babelrc文件
#### 4.7 改package.json
#### 4.8 运行测试 npm run dev

## 十六、vue-cli脚手架工具
### 1、简介
    是vue的脚手架,快速的生成项目结构
    本身集成了多个项目的模板：
        simple 很少简单
        webpack 进行代码规范的检查(ESLint)和单元测试
        webpack-simple 简化版的,区别在于没有代码检查和单元测试

### 2、实例及步骤
#### 2.1 安装vue-cli
    cnpm install vue-cli -g
    vue --version
    vue list
#### 2.2 初始化项目,生成项目模板
    vue init webpack-simple CliDemo
#### 2.3 进入项目目录,安装依赖,跑项目
    cd CliDemo
    cnpm install
    npm run dev ===> 启动测试服务
    npm run build ===> 将项目进行打包输出


## 十七、模块化开发
### 1、vue-router模块化
    cnpm install vue-router -S
#### 1.1、编辑main.js
#### 1.2、编辑App.vue
#### 1.3、创建router.config.js
### 2、axios模块化
    cnpm install axios -S

    使用axios的两种方式：
        (1)需要在每一个组件中去引入axios
        (2)在main.js中全局引入axios,并添加到vue原型上去 Vue.prototype.$http = axios;

### 3、为自定义组件添加事件 .native

## 十八、ElementUI
### 1、简介
    是饿了么团队提供的一套基于vue2.0的组件库,可以快速的搭建网站
    ElementUI - PC - http://element.eleme.io/#/zh-CN
    MintUI - Mobile
### 2、快速上手
#### 2.1 安装依赖
    cnpm install element-ui -S

#### 2.2 在main.js中引入并使用组件
    import ElementUI from 'element-ui'
    import 'element-ui/lib/theme-default/index.css'
    Vue.use(ElementUI)
    使用这种方式引入了ElementUI所有的组件

#### 2.3 在webpack.config.js中添加loader
    css样式和字体图标都要由相应的loader来加载,默认没有style-loader模块,需要单独安装
        cnpm install style-loader --save-dev

## 十九、自定义全局组件(插件)
    全局组件与普通的区别在于可以在main.js中使用vue.use进行全局引入,然后在其它组件中都可以使用了,
    例如：vue-router就是一个全局组件;而普通的插件每一次使用时都要引入,例如:axios
    具体做法看相关实例：componentUseDemo

## 二十、Vuex
### 1、简介
    Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
    简单来说：用来集中管理数据的,类似于react中的redux,都是基于Flux的前端状态管理框架

### 2、基本用法
#### 2.1 安装依赖 cnpm install vuex -S
#### 2.2 创建store.js文件
#### 2.3 在main.js中进行导入,并配置store选项
#### 2.4 编辑store.js文件
    Vuex的核心是Store(仓库),相当于是一个容器,一个store容器中可以包含以下属性或者方法：
        state     定义属性(状态、数据)
        getters   是用来获取属性的
        actions   定义方法(动作)
        commit    用来提交变化的,修改数据的唯一方式就是显示的提交mutations
        mutations 定义变化

        注意：不能直接去修改数据,必须显示提交变化,目的是为了追踪到状态的变化

#### 2.5 编辑App.vue
    在子组件中访问store对象的两种方式：
        1> 通过this.$store访问
        2> 通过mapGetters、mapActions访问,vuex提供了两个方法：
            mapGetters - 用来获取属性(数据)
            mapActions - 用来获取方法(动作)

### 3、分模块组织vuex
    |-src
        |-store
            |-index.js
            |-getters.js
            |-mutations.js
            |-actions.js
            |-modules  //分为多个模块,每个模块都可以拥有自己的state,getters,mutations,actions
                |-shopcart.js
                |-goods.js

## 二十一、综合
### 1、准备工作
#### 1.1 初始化项目
    vue init webpack itany
    cd itany
    cnpm install
    cnpm install less-loader -D
    cnpm install vuex -S
    cnpm install axios -S
    npm run dev

#### 1.2 项目资源
    data.json
    reset.css

#### 1.3 创建目录结构

#### 1.4 配置API接口,模拟后台的数据
    使用express框架,启动一个node服务器

#### 1.5 测试接口

### 2、项目整体开发