(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  KnitCount.Models.Counter = (function(_super) {

    __extends(Counter, _super);

    function Counter() {
      this.linkedCounterUpdate = __bind(this.linkedCounterUpdate, this);
      this.decrement = __bind(this.decrement, this);
      this.increment = __bind(this.increment, this);
      this.initialize = __bind(this.initialize, this);
      Counter.__super__.constructor.apply(this, arguments);
    }

    Counter.prototype.initialize = function() {
      Counter.__super__.initialize.apply(this, arguments);
      return this.listenTo(KnitCount.dispatcher, 'counter:rollover', this.linkedCounterUpdate);
    };

    Counter.prototype.increment = function() {
      var maxValue, newValue;
      newValue = this.get('value') + 1;
      maxValue = this.get('max_value');
      if ((maxValue != null) && newValue > maxValue) {
        this.set('value', 1);
        return KnitCount.dispatcher.trigger('counter:rollover', this);
      } else {
        return this.set('value', newValue);
      }
    };

    Counter.prototype.decrement = function() {
      var value;
      value = this.get('value') - 1;
      if (value >= 0) {
        return this.set('value', value);
      }
    };

    Counter.prototype.linkedCounterUpdate = function(updatedCounter) {
      if ((this.get('linked_counter_id') != null) && this.get('linked_counter_id') === updatedCounter.get('id')) {
        return this.increment();
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
            project_id: 1,
            max_value: 10,
            linked_counter_id: null
          }, {
            id: 2,
            name: 'Counter Two',
            value: 0,
            project_id: 1,
            max_value: 3,
            linked_counter_id: null
          }, {
            id: 3,
            name: 'Counter Three',
            value: 0,
            project_id: 2,
            max_value: null,
            linked_counter_id: null
          }, {
            id: 4,
            name: 'Counter Four',
            value: 1,
            project_id: 3,
            max_value: null,
            linked_counter_id: null
          }, {
            id: 5,
            name: 'Linked to One',
            value: 2,
            project_id: 1,
            max_value: null,
            linked_counter_id: 1
          }, {
            id: 6,
            name: 'Linked to Two',
            value: 2,
            project_id: 1,
            max_value: 2,
            linked_counter_id: 2
          }
        ]);
      }
    };

    return Counters;

  })(Backbone.Collection);

}).call(this);
