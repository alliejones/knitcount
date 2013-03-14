(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  KnitCount.Views.CreateCounterView = (function(_super) {

    __extends(CreateCounterView, _super);

    function CreateCounterView() {
      this.templateData = __bind(this.templateData, this);
      this.saveCounter = __bind(this.saveCounter, this);
      this.addCounter = __bind(this.addCounter, this);
      this.toggleFormField = __bind(this.toggleFormField, this);
      this.toggleUseLinkedCounter = __bind(this.toggleUseLinkedCounter, this);
      this.toggleUseMaxValue = __bind(this.toggleUseMaxValue, this);
      CreateCounterView.__super__.constructor.apply(this, arguments);
    }

    CreateCounterView.prototype.id = 'add_counter_options';

    CreateCounterView.prototype.templateName = 'createCounter';

    CreateCounterView.prototype.initialize = function(settings) {
      CreateCounterView.__super__.initialize.apply(this, arguments);
      return this.unlinkedCounters = settings.unlinked_counters;
    };

    CreateCounterView.prototype.eventsAll = {
      'change input[name="use_max_value"]': 'toggleUseMaxValue',
      'change input[name="use_linked_counter"]': 'toggleUseLinkedCounter'
    };

    CreateCounterView.prototype.eventsTouch = {
      'touchstart .add_counter': 'addCounter',
      'touchstart .add_counter_cancel': 'goToProject'
    };

    CreateCounterView.prototype.eventsNoTouch = {
      'click .add_counter': 'addCounter',
      'click .add_counter_cancel': 'goToProject'
    };

    CreateCounterView.prototype.goToProject = function() {
      return KnitCount.router.navigate("project/" + (this.model.get('project_id')), {
        trigger: true
      });
    };

    CreateCounterView.prototype.toggleUseMaxValue = function(e) {
      return this.toggleFormField(e.target, '#max_value_input');
    };

    CreateCounterView.prototype.toggleUseLinkedCounter = function(e) {
      return this.toggleFormField(e.target, '#linked_counter_input');
    };

    CreateCounterView.prototype.toggleFormField = function(checkbox, fieldContainer) {
      var input;
      checkbox = checkbox instanceof jQuery ? checkbox : $(checkbox);
      input = this.$(fieldContainer);
      if (checkbox.is(':checked')) {
        return input.removeClass('hidden');
      } else {
        return input.addClass('hidden');
      }
    };

    CreateCounterView.prototype.addCounter = function() {
      this.saveCounter();
      return this.goToProject();
    };

    CreateCounterView.prototype.saveCounter = function() {
      var id, linked_counter_id, maxValue, name;
      id = KnitCount.generateID('counters');
      maxValue = this.$('input[name="max_value"]').val();
      name = this.$('input[name="name"]').val();
      linked_counter_id = this.$('select[name="linked_counter_id"]').val();
      this.model.set({
        id: id,
        name: name,
        value: 0,
        max_value: maxValue > 0 ? +maxValue : null,
        linked_counter_id: linked_counter_id !== "" ? +linked_counter_id : null
      });
      KnitCount.counters.add(this.model);
      return this.model.save();
    };

    CreateCounterView.prototype.templateData = function() {
      return {
        model: this.model.toJSON(),
        unlinkedCounters: this.unlinkedCounters.toJSON(),
        blah: 'some stuff'
      };
    };

    return CreateCounterView;

  })(KnitCount.View);

}).call(this);
