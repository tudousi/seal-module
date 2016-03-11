;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jQuery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jQuery'));
  } else {
    root.SealModule = factory(root.jQuery);
  }
}(this, function($) {
var slice = Array.prototype.slice;
var hasProp = {}.hasOwnProperty;
SealModule.prototype.opts = {}
/**
* 基类构造函数
* 1：扩展参数。2：初始化所依赖类的实例。3：调用_init方法
*/
function SealModule(opts){
    var instances;
    this.opts = $.extend({}, this.opts, opts);
    if(!this.constructor._connectedClasses) {
        this.constructor._connectedClasses = [];
    }
    instances = (function(){
        var i;
        var len;
        var cls;
        var name;
        var results = [];
        var connected = this.constructor._connectedClasses;
        for(i = 0, len = connected.length; i < len; i++) {
            cls = connected[i];
            name = cls.pluginName.charAt(0).toLowerCase() + cls.pluginName.slice(1);    // 插件名称转首字符换为小写
            if(cls.prototype._connected) {  // 如果插件已经被实例化则当前插件引用this
                cls.prototype._module = this;
            }
            results.push(this[name] = new cls());
        }
        return results;
    }).call(this);
    if(this._connected) {
        this.opts = $.extend({}, this.opts, this._module.opts);
    } else {
        this._init();
        for(i = 0, len = instances.length; i < len; i++) {
            if(typeof instances[i]._init === 'function') {
                instances[i]._init();
            }
        }
    }
}
// child 继承 parent。属性继承和原型继承，还会增加函数__super-__指向父类原型
SealModule.inherit = function(child, parent) {
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
};
// 给类扩展静态属性和方法
SealModule.extend = function(obj) {
    var key;
    if(obj == null || (typeof obj !== 'object')) {
        return;
    }
    for(key in obj) {
        if(key !== 'extended' && key !== 'included') {
            this[key] = obj[key];
        }
    }
    return obj.extended ? obj.extended.call(this) : null;
};
// 扩展对象的原型方法
SealModule.include = function(obj) {
    var key;
    if(obj == null || (typeof obj !== 'object')) {
        return;
    }
    for(key in obj) {
        if(key !== 'extended' && key !== 'included') {
            this.prototype[key] = obj[key];
        }
    }
    return obj.included ? obj.included.call(this) : null;
};
// 给当前类添加它所依赖的其他类或插件
SealModule.connect = function(cls) {
    if(typeof cls !== 'function') {
        return;
    }
    if(!cls.pluginName) {
        throw new Error("SealModule.connect: cannot connect plugin without pluginName.");
        return;
    }
    cls.prototype._connected = true;
    if(!this._connectedClasses) {
        this._connectedClasses = [];
    }
    this._connectedClasses.push(cls);
    return this[cls.pluginName] = cls;
}
SealModule.prototype._init = function() {

};
/**
* 订阅消息
*/
SealModule.prototype.on = function() {
    var jo = null;
    var args = (arguments.length >= 1) ? slice.call(arguments, 0) : [];
    jo = $(this);
    jo.on.apply(jo, args);
    return this;
};
/**
* 只订阅一次消息
*/
SealModule.prototype.one = function() {
    var jo = null;
    var args = (arguments.length >= 1) ? slice.call(arguments, 0) : [];
    jo = $(this);
    jo.one.apply(jo, args);
    return this;
};
/**
* 取消订阅消息
*/
SealModule.prototype.off = function() {
    var jo = null;
    var args = (arguments.length >= 1) ? slice.call(arguments, 0) : [];
    jo = $(this);
    jo.off.apply(jo, args);
    return this;
};
/**
* 发布消息
*/
SealModule.prototype.trigger = function() {
    var jo = null;
    var args = (arguments.length >= 1) ? slice.call(arguments, 0) : [];
    jo = $(this);
    jo.trigger.apply(jo, args);
    return this;
};
/**
* 发布消息
*/
SealModule.prototype.triggerHandler = function() {
    var jo = null;
    var args = (arguments.length >= 1) ? slice.call(arguments, 0) : [];
    jo = $(this);
    return jo.triggerHandler.apply(jo, args);
};
SealModule.prototype._t = function() {
    var ref = this.constructor;
    var args = (arguments.length >= 1) ? slice.call(arguments, 0) : [];
    return ref._t.apply(ref, args);
};
/**
* args1 => "key" Message
* args2 => "replace value" tudousi
*/
SealModule._t = function() {
    var key;
    var args;
    var langStr;             // 目标语言
    key = arguments[0];
    args = (arguments.length > 1) ? slice.call(arguments, 1) : [];

    if(!this.locale || !this.i18n[this.locale]) {
        return "";
    }
    langStr = parseDot(this.i18n[this.locale], key);
    // 对占位符用参数进行替换
    langStr = langStr.replace(/(%s)/g, function(r1, r, offset) {
        return args.shift();
    });
    return langStr;
};
/**
* 根据字符串找到对象的值  "foo.bar"
* obj 一个对象
* key 可以是一个直接的对象key，也可以是对象.访问的书写形式
*/
var parseDot = function(obj, key) {
    if(obj.hasOwnProperty(key)) {
        return obj[key];
    }
    if(typeof key === 'string') {
        return parseDot(obj, key.split('.'));
    } else if(key.length === 0) {
        return obj;
    } else {
        if(obj.hasOwnProperty(key[0])) {
            return parseDot(obj[key[0]], key.slice(1));
        } else {
            return obj[key.join('.')] = key.join('.');
        }
    }
}

SealModule.i18n = {};
SealModule.locale = "zh-CN";

return SealModule;
}));
