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
