(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  KnitCount.Views.ProjectView = (function(_super) {

    __extends(ProjectView, _super);

    function ProjectView() {
      this.render = __bind(this.render, this);
      this.renderCounter = __bind(this.renderCounter, this);
      this.addCounter = __bind(this.addCounter, this);
      this.initialize = __bind(this.initialize, this);
      ProjectView.__super__.constructor.apply(this, arguments);
    }

    ProjectView.prototype.className = 'project';

    ProjectView.prototype.templateName = 'project';

    ProjectView.prototype.events = {
      'click .back': 'goToProjectList',
      'click .add_counter': 'addCounter'
    };

    ProjectView.prototype.initialize = function() {
      ProjectView.__super__.initialize.apply(this, arguments);
      this.listenTo(KnitCount.counters, 'add', this.model.updateCounters);
      return this.listenTo(this.model.counters, 'reset', this.render);
    };

    ProjectView.prototype.goToProjectList = function() {
      return KnitCount.router.navigate('/', {
        trigger: true
      });
    };

    ProjectView.prototype.addCounter = function() {
      var id;
      id = KnitCount.generateID('counters');
      return KnitCount.counters.add(new KnitCount.Models.Counter({
        id: id,
        name: "Counter " + id,
        value: 0,
        project_id: this.model.get('id')
      }));
    };

    ProjectView.prototype.renderCounter = function(counter) {
      var view;
      view = new KnitCount.Views.Counter({
        model: counter
      });
      return this.$('.counters').append(view.render().el);
    };

    ProjectView.prototype.render = function() {
      ProjectView.__super__.render.apply(this, arguments);
      this.$('.counters').empty();
      this.model.counters.each(this.renderCounter);
      return this;
    };

    return ProjectView;

  })(KnitCount.View);

}).call(this);
