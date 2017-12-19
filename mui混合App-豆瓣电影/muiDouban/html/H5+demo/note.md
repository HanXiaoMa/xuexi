## H5+ API
### 1、介绍及获取设备信息
#### 1.1 H5+介绍
		是运行在手机端的强化web引擎,除了支持h5外,还支持更多扩展的js api,使得js的能力不输于原生
#### 1.2 H5+和mui的联系
		mui是h5+的一套App前端UI框架
#### 1.3 获取设备信息
   + plus.device.imei 国际移动设备身份码
   + plus.device.imsi 国际移动用户识别码
   + plus.device.model 设备的型号
   + plus.device.vendor 设备的生产厂商
   + plus.device.uuid 设备的唯一标识
  
#### 1.4 获取OS底层系统信息
   + plus.os.language 系统语言信息
   + plus.os.version 系统版本信息
   + plus.os.name 系统的名称
   
#### 1.5 获取应用可显示区域的信息
   + plus.display.resolutionHeight/Width 应用可使用的屏幕高度/宽度逻辑分辨率

#### 1.6 获取和设置屏幕亮度
   + plus.screen.getBrightness() 获取亮度0-1之间的数值
   + plus.screen.setBrightness(0.5) 进行设置
   
#### 1.7 屏幕方向
   + plus.screen.lockOrientation("portrait-secondary"); 竖屏反方向
   + plus.screen.lockOrientation("portrait-primary"); 竖屏正方向
   + plus.screen.lockOrientation("landscape-secondary"); 横屏方向
   + plus.screen.lockOrientation("landscape-primary"); 横屏正方向
   
-------------------------------------------------------------------------------------

### 2、拨打电话、保持屏幕唤醒、设备震动
#### 2.1 拨打电话
	参数：
		number  - string  - 必须 -  要拨打的电话号码
		confirm	- boolean - 可选 - 是否需要用户确认后开始拨打电话,设置为true,打开系统拨打电话界面,false则无需确认直接拨打电话
		
	无返回值
	平台支持情况：
		Android 2.2+ | IOS 5.1+【会忽略confirm参数,直接调用拨打电话】
	调用的方法：
		plus.device.dial('18854256256',true);

#### 2.2 保持屏幕唤醒
        参数：
        lock - boolean - 必须 - 设置程序是否一直保持唤醒状态
    
	调用的方法：
		plus.device.setWakelock(lock);
	
	获取程序后是否一直要保持屏幕常亮状态：isWakelock()
	
#### 2.3 设备震动
	参数：
		milliseconds - number - 必选 - 设备震动持续时间,单位为ms,默认为500ms
	调用的方法：
		plus.device.vibrate(500);

---------------------------------------------------------------------------------------

### 3、网络状态及网络状态获取
   + plus.networkinfo.getCurrentType() 获取设备当前连接的网络类型,0-网络状态未知,1-未连接网络,2-有线网络,3-无线网络WiFi,4-2G,5-3G,6-4G

----------------------------------------------------------------------------------------

### 4、事件相关(窗口事件)
#### 4.1 addEventListener 添加事件监听函数
		document.addEventListener(event,callback,capture);
		参数：
			event(DOMString) - 必选 - 添加要监听的事件类型,可选的一些事件常量如下：
				- plusready 扩展API加载完成事件
				- pause 运行环境从前台切换到后台事件
				- resume 运行环境从后台切换到前台事件
				- netchange 设备网络状态变化事件
				- newindent 新意图事件
				- plusscrollbottom 窗口滚动到底部事件
				- error 页面加载错误事件
			callback - 必选 - 回调函数
			capture - 可选 - 事件捕获顺序,可忽略
			
------------------------------------------------------------------------------------------

### 5、NativeUI系统原生界面管理
#### 5.1 actionSheet 弹出系统选择按钮框
	语法：plus.nativeUI.actionSheet(Style,Callback);
	参数：
		Style - 选择框按钮显示的样式
		Callback - 选择框关闭后的回调函数

#### 5.2 alert 弹出系统提示对话框
	语法：plus.nativeUI.alert(message,Callback,title,buttonCapture);
	参数：
		message - String - 必选 - 对话框上需要显示的内容
		Callback - 关闭后的回调函数
		title - String - 可选 - 对话框上显示的标题
		buttonCapture - String - 必选 - 按钮上显示的内容
		
#### 5.3 confirm 弹出系统确认对话框
	语法：plus.nativeUI.confirm(message,Callback,title,buttons);
	参数：
		message - String - 必选 - 确认对话框上显示的内容
		Callback - 回调函数
		title - String - 可选 - 确认对话框上显示的标题
		buttons - ArrayString - 可选 - 确认对话框上显示的按钮
		
#### 5.4 loading 等待对话框
	语法：plus.nativeUI.showWaiting()/closeWaiting();
	改造：
		plus.nativeUI.showWaiting('加载中...',{
			padding:'10px',
			loading:{
				display:'inline'
			}
		});
	
#### 5.5 prompt 弹出系统输入对话框
	语法：plus.nativeUI.prompt(message,Callback,title,tips,buttons);
	注意：
	       可通过event.index（Number类型）获取用户关闭输入对话框点击按钮的索引值，索引值从0开始
               通过event.value（String类型）获取用户输入的内容，如果没有输入则返回空字符串。
               
#### 5.6 toast 显示自动消失的提示信息
	语法：plus.nativeUI.toast(message);
	参数：
		message - 显示要提示的内容
	
--------------------------------------------------------------------------------------------------

### 6、storage本地数据存储
#### 6.1 概念
		管理本地数据存储区,用于应用数据的保存和读取
#### 6.2 getLength 获取应用存储区内保存的键值对个数
		var total = plus.storage.getLength();
#### 6.3 setItem 修改或者添加键值对到本地存储区中
		plus.storage.setItem('name','szr');
#### 6.4 getItem 获取存储的值
		plus.storage.getItem('name');
#### 6.5 removeItem 删除存储的值
		plus.storage.removeItem('name');
#### 6.6 clear 清除所有的存储数据
		plus.storage.clear();

--------------------------------------------------------------------------------------------------
