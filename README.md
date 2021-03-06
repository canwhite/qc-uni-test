# qc-uni-test
uni-app的使用

## 原生小程序 VS uni-app小程序

1.----------属性插值------------- 
>小程序：属性插值是双括号之内有乾坤  
>prop = "{{name}}"  
>uni-app：更贴近vue的写法，双引号之间有乾坤，直接字符串给了  
>prop = "name"  

2.----------事件触发------------- 
>小程序：一般实bind+事件类型拼接出事件，估计是通过bind监听做的事件调度  
>bindtap="clickMe"  
>uni-app：vue的写法，v-on:click或者语法糖@click获取  
>@click="clickMe"

3.----------数据请求------------- 
>小程序：wx.request  
>uni-app：uni.request

4.----------状态管理------------- 
>小程序：globalData 和 wx.set  
```
//--(1)globalData--  
const globalData = getApp().globalData;  
console.log(globalData.name)   
```
```
//--(2)wx.setStorage 和wx.getStorageSync
wx.setStorage({ key: 'myname', data: "qc"})
const name = wx.getStorageSync('myname')

````
>uni-app:用vuex那一套就可以  

5.----------路由相关------------- 
>两者路由相似,区别在于引用的类的区别  
>一个是wx，一个是uni  
>引用方法如下，相同 
* navigateTo  
* navigateBack  
* redirectTo
* switchTab 
* reLaunch



6.----------组件相关-------------   
> 小程序
```
//(1)新建组件 js文件的代码
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {}
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function(){}
  }
})

//(2)在page里边引入的时候注意：
{
  "usingComponents": {
    "component-tag-name": "path/to/the/custom/component"
  }
}

//(3)page里wxml中
<view>
  <!-- 组件事件触发 -->
  <button bindtap="showComponent">组件调用</button>
  <!-- 以下是对一个自定义组件的引用 -->
  <component-tag-name id="myComponent" inner-text="Some text"></component-tag-name>
</view>

/*
(4)关于自定义事件  

方法一：

a.给组件一个id 如上
b.在onReady挂载好节点之后绑定实例
this.myComponent = this.selectComponent('#myComponent')
c.在需要触发的时候
showComponent: function () {
    let myComponent = this.myComponent
    myComponent.customMethod()  // 调用自定义组件中的方法
}

方法二：

类似于emit和on
a.组件内部button触发事件handleTap
<button type="primary" size="mini" bindtap="handleTap" data-index="{{index}}">传值</button>
b.组件内handleTap的实现

// 从父组件接收的data 会自动同步到 子组件的data 对象里面
properties: {
    data: {
        type: Array,
        value: []
    }
},

// methods里
handleTap(e) {
      let { index } = e.currentTarget.dataset;
      let data = this.data.data;
      // 自定义一个事件，并且传值
      this.triggerEvent('myevent',{params: data[index]},{})
    },


c.在父组件的使用和触发

<view>
	<list bindmyevent="myevent" data="{{list}}" class="list"></list>
</view>

Page({
	data: {
        list:[{
                title: '1',
                content: '1的内容'
            },{
                title: '2',
                content: '2的内容'
            }]
	},
	myevent(e) {
	    // 这里就是子组件传过来的内容了
		console.log(e.detail.params)
	}
})

d.总结
triggerEvent和bind+事件名类似于emit和on

*/
```
>uni-app:vue的那一套就可以了
>当然本身也有emit和on这种方式
```
子组件或者兄弟组件click事件里
uni.$emit('choosePath',item)

父组件或者兄弟组件监听
onLoad() {
			
	//开启监听选择收货地址事件
	uni.$on('choosePath',(res)=>{
		this.path = res;
	})
},

```


7.----------动态样式------------- 

>小程序：还是双括号之间有乾坤

```
<!-- style和这个类似 -->
<view class="{{select==1?'active':'unactive'}}">
  我是内容
</view>

```

> uni-app：vue的那一套
```
<!-- 动态样式 -->
<view :class="'box' + 1">test</view>
<!-- class的对象形式和数组形式 -->
<view :class="{box111:true}"></view>
<view :class="['box111','box222']"></view>
<view :class="[{box111:true},'box222']"></view>
    
<view :style="{width:'100px',height:'100px',background:'red'}" ></view>
<!-- 数组形式也可可以 -->
<view :style="[{width:'100px',height:'100px',background:'green'}]" ></view>

```


8.----------wxs-------------  
>首先导出的文件是一致的，但是在引入的时候有区别  
```
function my_slice(str,a,b){
  return str.slice(a,b);
}
module.exports = {
  my_slice: my_slice
}

```
>小程序引入 ：用标签引入，指定src和module
```
<wxs src="../../wxs/string.wxs" module="tools" />
<view>
  {{tools.my_slice("123456789",0,5)}}
</view>
```

>uni-app引入 ：用script引入，指定src、module和lang="wxs"
```
<script module="tools" lang="wxs" src="../../wxs/string.wxs"></script>
<view style="background: green;"> {{tools.my_slice("123456789",0,5)}}</view>

```
