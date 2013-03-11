(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  KnitCount.Router = (function(_super) {

    __extends(Router, _super);

    function Router() {
      Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.routes = {
      "": "projectList",
      "project/:id": "project",
      "project/:id/new": "createCounter"
    };

    Router.prototype.projectList = function() {
      var view;
      view = new KnitCount.Views.ProjectListView({
        collection: KnitCount.projects
      }).render();
      return $('#container').html(view.el);
    };

    Router.prototype.project = function(id) {
      var model, view;
      model = KnitCount.getProject(id);
      model.updateCounters();
      view = new KnitCount.Views.ProjectView({
        model: model
      }).render();
      return $('#container').html(view.el);
    };

    Router.prototype.createCounter = function(projectId) {
      var view;
      view = new KnitCount.Views.CreateCounterView({
        model: new KnitCount.Models.Counter({
          project_id: +projectId
        })
      }).render();
      return $('#container').html(view.el);
    };

    return Router;

  })(Backbone.Router);

}).call(this);
