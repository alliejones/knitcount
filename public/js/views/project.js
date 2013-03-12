(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  KnitCount.Views.ProjectView = (function(_super) {

    __extends(ProjectView, _super);

    function ProjectView() {
      this.templateData = __bind(this.templateData, this);
      this.render = __bind(this.render, this);
      this.renderCounter = __bind(this.renderCounter, this);
      this.renderCounters = __bind(this.renderCounters, this);
      this.toggleEditMode = __bind(this.toggleEditMode, this);
      this.deleteCounter = __bind(this.deleteCounter, this);
      this.initialize = __bind(this.initialize, this);
      ProjectView.__super__.constructor.apply(this, arguments);
    }

    ProjectView.prototype.className = 'project';

    ProjectView.prototype.templateName = 'project';

    ProjectView.prototype.events = {
      'click .back': 'goToProjectList',
      'click .show_add_counter': 'goToAddCounter',
      'click .edit': 'toggleEditMode'
    };

    ProjectView.prototype.initialize = function() {
      ProjectView.__super__.initialize.apply(this, arguments);
      this.editMode = false;
      this.listenTo(KnitCount.counters, 'add', this.model.updateCounters);
      this.listenTo(KnitCount.counters, 'remove', this.model.updateCounters);
      this.listenTo(this.model.counters, 'reset', this.renderCounters);
      return this.on('change:editMode', this.render);
    };

    ProjectView.prototype.goToProjectList = function() {
      return KnitCount.router.navigate('/', {
        trigger: true
      });
    };

    ProjectView.prototype.goToAddCounter = function() {
      return KnitCount.router.navigate("project/" + (this.model.get('id')) + "/new", {
        trigger: true
      });
    };

    ProjectView.prototype.deleteCounter = function(e) {
      var id;
      id = $(e.target).prev('a').data('id');
      return KnitCount.projects.remove(KnitCount.getCounter(id));
    };

    ProjectView.prototype.toggleEditMode = function() {
      this.editMode = !this.editMode;
      return this.trigger('change:editMode');
    };

    ProjectView.prototype.renderCounters = function() {
      var addForm, counterList,
        _this = this;
      counterList = this.$('.counters');
      addForm = $('.add_counter_form', counterList).detach();
      counterList.empty();
      this.model.counters.each(function(counter) {
        return _this.renderCounter(counter);
      });
      return counterList.append(addForm);
    };

    ProjectView.prototype.renderCounter = function(counter) {
      var view;
      view = new KnitCount.Views.Counter({
        model: counter,
        parentView: this
      });
      return this.$('.counters').append(view.render().el);
    };

    ProjectView.prototype.render = function() {
      ProjectView.__super__.render.apply(this, arguments);
      this.renderCounters();
      return this;
    };

    ProjectView.prototype.templateData = function() {
      return {
        project: this.model.toJSON(),
        editMode: this.editMode
      };
    };

    return ProjectView;

  })(KnitCount.View);

}).call(this);
