(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  KnitCount.Models.Counter = (function(_super) {

    __extends(Counter, _super);

    function Counter() {
      this.decrement = __bind(this.decrement, this);
      this.increment = __bind(this.increment, this);
      Counter.__super__.constructor.apply(this, arguments);
    }

    Counter.prototype.increment = function() {
      return this.set('value', this.get('value') + 1);
    };

    Counter.prototype.decrement = function() {
      var value;
      value = this.get('value') - 1;
      if (value >= 0) {
        return this.set('value', value);
      }
    };

    return Counter;

  })(Backbone.Model);

  KnitCount.Collections.Counters = (function(_super) {

    __extends(Counters, _super);

    function Counters() {
      Counters.__super__.constructor.apply(this, arguments);
    }

    Counters.prototype.model = KnitCount.Models.Counter;

    Counters.prototype.sync = function(method, model, options) {
      if (method === 'read') {
        return this.reset([
          {
            id: 1,
            name: 'Counter One',
            value: 6,
            project_id: 1
          }, {
            id: 2,
            name: 'Counter Two',
            value: 0,
            project_id: 1
          }, {
            id: 3,
            name: 'Counter Three',
            value: 0,
            project_id: 2
          }, {
            id: 4,
            name: 'Counter Four',
            value: 1,
            project_id: 3
          }, {
            id: 5,
            name: 'Counter Five',
            value: 32,
            project_id: 1
          }
        ]);
      }
    };

    return Counters;

  })(Backbone.Collection);

}).call(this);
