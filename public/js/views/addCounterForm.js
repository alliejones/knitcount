(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  KnitCount.Views.AddCounterForm = (function(_super) {

    __extends(AddCounterForm, _super);

    function AddCounterForm() {
      this.templateData = __bind(this.templateData, this);
      this.teardown = __bind(this.teardown, this);
      this.addCounter = __bind(this.addCounter, this);
      this.toggleFormField = __bind(this.toggleFormField, this);
      this.toggleUseLinkedCounter = __bind(this.toggleUseLinkedCounter, this);
      this.toggleUseMaxValue = __bind(this.toggleUseMaxValue, this);
      AddCounterForm.__super__.constructor.apply(this, arguments);
    }

    AddCounterForm.prototype.id = 'add_counter_options';

    AddCounterForm.prototype.templateName = 'addCounterForm';

    AddCounterForm.prototype.events = {
      'change input[name="use_max_value"]': 'toggleUseMaxValue',
      'change input[name="use_linked_counter"]': 'toggleUseLinkedCounter',
      'click .add_counter': 'addCounter'
    };

    AddCounterForm.prototype.initialize = function(settings) {
      return AddCounterForm.__super__.initialize.apply(this, arguments);
    };

    AddCounterForm.prototype.toggleUseMaxValue = function(e) {
      return this.toggleFormField(e.target, '#max_value_input');
    };

    AddCounterForm.prototype.toggleUseLinkedCounter = function(e) {
      return this.toggleFormField(e.target, '#linked_counter_input');
    };

    AddCounterForm.prototype.toggleFormField = function(checkbox, fieldContainer) {
      var input;
      checkbox = checkbox instanceof jQuery ? checkbox : $(checkbox);
      input = this.$(fieldContainer);
      if (checkbox.is(':checked')) {
        return input.removeClass('hidden');
      } else {
        return input.addClass('hidden');
      }
    };

    AddCounterForm.prototype.addCounter = function() {
      var id, linked_counter_id, maxValue, name;
      id = KnitCount.generateID('counters');
      maxValue = +(this.$('input[name="max_value"]').val());
      name = this.$('input[name="name"]').val();
      linked_counter_id = +(this.$('select[name="counter_list"]').val());
      KnitCount.counters.add(new KnitCount.Models.Counter({
        id: id,
        name: name,
        value: 0,
        max_value: maxValue != null ? maxValue : null,
        project_id: this.parentView.model.get('id'),
        linked_counter_id: linked_counter_id != null ? linked_counter_id : null
      }));
      return this.parentView.hideAddCounterOptions();
    };

    AddCounterForm.prototype.teardown = function() {
      this.stopListening();
      return this.$el.remove();
    };

    AddCounterForm.prototype.templateData = function() {
      return {
        unlinked_counters: this.parentView.model.getUnlinkedCounters().toJSON()
      };
    };

    return AddCounterForm;

  })(KnitCount.View);

}).call(this);
