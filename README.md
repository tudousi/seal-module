# seal-module
其他类的基础模块，其他的类需要继承此类

    * 提供了类的静态属性和原型的扩展
    * 提供了事件订阅和发布功能
    * 提供了国际化功能

## DEMO

用你的自定义类继承这个模块类似于这样```extend(Pen, SealModule);```后，就可使用SealModule的方法。基础的使用代码如下

```
var hasProp = {}.hasOwnProperty;
var extend = function(child, parent) {
    for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key];
    }
    function ctor() {
        this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
}
function Knife() {}                                         // 你自己的类
Knife.pluginName = "Knife";                                 // 必须提供一个插件名称
function Pen() {
    Pen.__super__.constructor.apply(this, arguments);       // 调用SealModule构造方法初始化
}
extend(Pen, SealModule);                                    // 继承SealModule
Pen.connect(Knife);                                         // 给Pen添加一个插件类Knife
var p = new Pen;                                            // 实例化你的对象
// do something
// p.xxx
```

## API:

### `SealModule.extend`

静态方法`extend`可以让Pen扩展它的静态方法，用法如下。

```
var extendMixin = {
    color: "gray",
    type: "2b"
};
Pen.extend(extendMixin);
Pen.color;      // gray
```

### `SealModule.include`

静态方法`include`可以让Pen扩展它的原型方法，用法如下。

```
var prototypeMixin = {
    price: 3
};
Pen.include(prototypeMixin);
var p = new Pen;
p.price;        // 3
```

### `SealModule.connect`

静态方法`connect`可以给Pen添加一个或多个依赖的插件或类，用法如下。

如果给Pen添加了一个插件Knife后，当new一个Pen实例为p，在构造函数中它会自动创建Knife实例，暴露在p实例的属性中 `p.Knife`

```
function Knife() {

}
Knife.prototype._init = function() {
    console.log('Knife init');
}
Knife.pluginName = "Knife";
Pen.connect(Knife);
var p = new Pen();
p.Knife;            // 一个Knife的实例
```

### `object.on`

on 是基于jquery的事件监听方法

一个继承了SealModule对象的实例拥有一个`on`方法，给当前对象实例添加一个事件监听。

```
var p = new Pen;
p.on('sealmodule.on', function(e, date) {
    // do someting
    name = date.name;
});
```

### `object.one`

one 是基于jquery的事件监听方法

一个继承了SealModule对象的实例拥有一个`one`方法，给当前对象实例添加一个事件监听，这个事件只执行一次。

```
var p = new Pen;
p.one('sealmodule.on', function(e, date) {
    // do someting
    name = date.name;
});
```

### `object.off`

off 是基于jquery的事件监听方法

一个继承了SealModule对象的实例拥有一个`off`方法，给当前对象实例解绑事件监听。

```
var p = new Pen;
p.off('sealmodule.on');
```

### `object.trigger`

trigger 是基于jquery的事件监听方法

一个继承了SealModule对象的实例拥有一个`trigger`方法，触发一个事件。

```
var p = new Pen;
p.trigger('sealmodule.on', {name: 'tudousi'});
```

### `_t`

对字符串进行国际化，可以只传递一个字符串进行简单的翻译，也可以传入参入对 `%s` 占位符进行替换，用法如下。

关于国际化的配置参见文件 [i18n](https://github.com/tudousi/seal-module/blob/master/test/js/i18n.js)

```
// 用法1，参数只是一个字符串
// 'Hello': "你好"
function Pen() {
    Pen.__super__.constructor.apply(this, arguments);
}
extend(Pen, SealModule);
Pen.prototype.translate = function() {
    console.log(this._t('Hello'));
}

// 用法2，可以用参数替换占位符 %s
// "Message": "你有 %s 条消息，未读 %s 条消息"
function Pen() {
    Pen.__super__.constructor.apply(this, arguments);
}
extend(Pen, SealModule);
Pen.prototype.translate = function() {
    console.log(this._t('Message', 100, 32));
}

// 用法3，可以使用嵌套对象
/*
"info": {
    "name": "jiangzhu"
}
*/
function Pen() {
    Pen.__super__.constructor.apply(this, arguments);
}
extend(Pen, SealModule);
Pen.prototype.translate = function() {
    console.log(this._t('info.name'));
}

// 用法4，可以直接使用静态方法进行翻译
Pen._t('Hello');
```
