(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  KnitCount.Views.Counter = (function(_super) {

    __extends(Counter, _super);

    function Counter() {
      this.templateData = __bind(this.templateData, this);
      this["delete"] = __bind(this["delete"], this);
      this.decrement = __bind(this.decrement, this);
      this.increment = __bind(this.increment, this);
      this.initialize = __bind(this.initialize, this);
      Counter.__super__.constructor.apply(this, arguments);
    }

    Counter.prototype.tagName = 'li';

    Counter.prototype.className = 'row';

    Counter.prototype.templateName = 'counter';

    Counter.prototype.eventsNoTouch = {
      'click .increment': 'increment',
      'click .decrement': 'decrement',
      'click .delete': 'delete'
    };

    Counter.prototype.eventsTouch = {
      'touchstart .increment': 'increment',
      'touchstart .decrement': 'decrement',
      'touchstart .delete': 'delete'
    };

    Counter.prototype.initialize = function(settings) {
      Counter.__super__.initialize.apply(this, arguments);
      this.listenTo(this.model, 'change', this.render);
      return this.listenTo(this.parentView, 'change:editMode', this.render);
    };

    Counter.prototype.increment = function() {
      return this.model.increment();
    };

    Counter.prototype.decrement = function() {
      return this.model.decrement();
    };

    Counter.prototype["delete"] = function() {
      return this.model.destroy();
    };

    Counter.prototype.templateData = function() {
      var data;
      data = this.model.toJSON();
      data.editMode = this.parentView.editMode;
      return data;
    };

    return Counter;

  })(KnitCount.View);

}).call(this);
