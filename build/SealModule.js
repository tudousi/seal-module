;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jQuery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jQuery'));
  } else {
    root.SealModule = factory(root.jQuery);
  }
}(this, function($) {
SealModule.prototype.opts = {}
function SealModule(){}
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
// 给类扩展原型方法
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
// 给类链接插件或者扩展功能
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
SealModule.prototype.on = function() {

};
SealModule.prototype.one = function() {

};
SealModule.prototype.off = function() {

};
SealModule.prototype.trigger = function() {

};
SealModule.prototype.triggerHandler = function() {

};
SealModule.prototype._t = function() {

};
SealModule._t = function() {

};
SealModule.i18n = function() {

};
SealModule.locale = "zh-CN";

return SealModule;
}));
