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
function Knife() {

}
Knife.pluginName = "Knife";

var extendMixin = {
    color: "gray",
    type: "2b"
};
var prototypeMixin = {
    price: 3
};
function Pen() {
    Pen.__super__.constructor.apply(this, arguments);
}
extend(Pen, SealModule);
Pen.prototype._init = function() {
    console.log('init');
};
Pen.extend(extendMixin);
Pen.include(prototypeMixin);
Pen.connect(Knife);

// test begin
describe('module base function', function() {
    var p = new Pen;
    var eventDate;
    var onres;
    var name;
    onres = p.on('sealmodule.on', function(e, date) {
        // do someting
        name = date.name;
    });

    // i18n
    debugger;
    //p._t("Message", "tudousi");
    //p._t("info.name", "tudousi");
    p._t("info.age", "tudousi");
    it("module extend", function() {
        expect(Pen.__super__).toBe(SealModule.prototype);
    });
    it('Object extend function', function() {
        expect(Pen.color).toBe(extendMixin.color);
    });
    it('Object include function', function() {
        expect(Pen.prototype.price).toBe(prototypeMixin.price);
    });
    it('Object connect function', function() {
        expect(Pen.Knife).toBe(Knife);
    });
    it("new Object _init function execute", function() {
        var _init = null;
        Pen.prototype._init = function a() {
            _init = 'ok';
        };
        new Pen;
        expect(_init).toBe('ok');
    });
    it("object on function", function() {
        expect(onres).toBeDefined();
    });
    it('object trigger function', function() {
        p.trigger('sealmodule.on', {name: "tudousi"});
        expect(name).toBe('tudousi');
    });
});
