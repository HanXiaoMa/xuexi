## 组件
### 1.0 全局组件
    Vue.component('my-component',{
        template:''
    })

### 2.0 局部组件
    var Child={
        template:''
    }
    new Vue({
        el:'#app',
        components:{
            'my-child-component':Child
        }
    })

### 3.0 组件的data必须是函数
    data(){
        return{

        }
    }

### 4.0 父子组件之间的关系
    props down,events up
    意思就是说：父组件props向下传递数据给子组件,子组件通过events给父组件发送消息


### 5.0 组件props
#### 5.0.1 说明
    组件实例的作用域是孤立的,这意味着不能在子组件的模板内直接引用父组件的数据,要让子组件使用父组件中的数据,我们需要通过子组件的props选项
#### 5.0.2 声明和使用

    Vue.component('child',{
        // 声明props
        props:['message'],
        // 就像data一样,props可以用在模板内,也可以在vm实例中像this.message一样使用
        template:'<div>{{message}}</div>'
    })

    // :message动态绑定
    <child :message="flag"></child>

### 6.0 单向数据流
    防止子组件修改prop的两种手段
#### 6.0.1 定义一个局部变量,并且用prop的值初始化它
    props:['increament'],
    data(){
        return {
            counter:this.increament
        }
    }
#### 6.0.2 定义一个计算属性,处理prop的值并返回
    props:['size'],
    computed:{
        normalSize:function(){
            return this.size.trim().toLowercase();
        }
    }

### 7.0 props验证
    我们可以为组件的props指定验证规格
    Vue.component('example',{
        props:{
            // 基础类型检测
            PropA:Number,
            // 多种类型
            PropB:[String,Number],
            // 必传且为字符串
            PropC:{
                type:String,
                required:true
            },
            // 数字,有默认值
            propD:{
                type:Number,
                default:100
            }
        }
    });

### 8.0 生命周期
+ beforeCreate
+ created
+ beforeMount
+ mounted
+ beforeUpdate
+ updated
+ beforeDestroy
+ destroyed

### 9.0 组件中的自定义事件
#### 9.0.1 自定义事件
    使用v-on绑定自定义事件
        每一个Vue实例都实现了事件接口,如：
        使用v-on(eventName)监听事件(父组件)
        使用$emit(eventName)触发事件(子组件)

#### 9.0.2 给组件绑定原生事件
    在某个组件的根元素上监听一个原生事件,可以使用.native修饰v-on
    <my-component v-on:click.native=""></my-component>

#### 9.0.3 Prop属性的双向绑定(V>2.3) - 违背了单向数据流,通常不会这么用
    在需要传递prop的后面加上修饰符.sync
    <comp :foo.sync="bar"></comp>
    当子组件需要更新foo时,它需要显式的触发一个更新事件
    this.$emit("update:foo",newValue);

#### 9.0.4 定制组件的v-model
    默认情况下,一个组件的v-model会使用value属性和input事件,但是诸如单选框和复选框之类的输入类型可能把value属性用作了别的目的,model选项可以回避这样的冲突

### 10.0 非父子组件间的通讯
    有时候两个组件间也需要通讯,当然是非父子组件间的;在简单的场景下,可以使用一个空的vue实例作为中央事件总线
    例如：
        var bus = new Vue();
        // 触发组件A中的事件
        bus.$emit("id-selected",1);
        // 在组件B创建的钩子中监听事件
        bus.$on('id-selected',function(id){
            // ...
        });

### 11.0 slot内容分发
    为了让组件可以组合,我们需要一种方式来混合父组件的内容与子组件自己的模板
    使用特殊的slot元素作为原始内容的插槽
#### 11.0.1 单个slot
    例：
    <div>
        <h3>123</h3>
        <slot></slot>
    </div>
    <my-component>
        <p>456</p>
        <p>789</p>
    </my-component>

#### 11.0.2 具名slot
    定义：<slot name="szr"></slot>
    使用：<h1 slot="szr">Title</h1>
    例：
    <div class="container">
        <header>
            <slot name="header"></slot>
        </header>
        <main>
            <slot></slot>
        </main>
        <footer>
            <slot name="footer"></slot>
        </footer>
    </div>
    <layout>
        <h1 slot="header">Header</h1>
        <p>123</p>
        <p>456</p>
        <h1 slot="footer">Footer</h1>
    </layout>