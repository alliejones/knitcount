(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  KnitCount.Views.Counter = (function(_super) {

    __extends(Counter, _super);

    function Counter() {
      this.decrement = __bind(this.decrement, this);
      this.increment = __bind(this.increment, this);
      Counter.__super__.constructor.apply(this, arguments);
    }

    Counter.prototype.tagName = 'li';

    Counter.prototype.templateName = 'counter';

    Counter.prototype.events = {
      'click .increment': 'increment',
      'click .decrement': 'decrement'
    };

    Counter.prototype.initialize = function() {
      Counter.__super__.initialize.apply(this, arguments);
      return this.listenTo(this.model, 'change', this.render);
    };

    Counter.prototype.increment = function() {
      return this.model.increment();
    };

    Counter.prototype.decrement = function() {
      return this.model.decrement();
    };

    return Counter;

  })(KnitCount.View);

}).call(this);
