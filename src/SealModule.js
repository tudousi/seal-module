SealModule.prototype.opts = {}
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
