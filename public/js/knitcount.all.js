(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.KnitCount = {
    Models: {},
    Collections: {},
    Views: {},
    init: function() {
      this.counters = new KnitCount.Collections.Counters();
      this.counters.sync('read');
      this.projects = new KnitCount.Collections.Projects();
      this.projects.sync('read');
      this.router = new KnitCount.Router;
      return Backbone.history.start();
    },
    getProject: function(id) {
      return this.projects.get(id);
    },
    generateID: function(allModelsName) {
      var allModels;
      allModels = KnitCount[allModelsName];
      if (allModels == null) {
        return null;
      }
      return (allModels.max(function(m) {
        return m.id;
      })).id + 1;
    }
  };

  KnitCount.View = (function(_super) {

    __extends(View, _super);

    function View() {
      this.render = __bind(this.render, this);
      View.__super__.constructor.apply(this, arguments);
    }

    View.prototype.initialize = function() {
      return this.template = KnitCount.Templates[this.templateName];
    };

    View.prototype.render = function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    };

    return View;

  })(Backbone.View);

  KnitCount.CollectionView = (function(_super) {

    __extends(CollectionView, _super);

    function CollectionView() {
      this.render = __bind(this.render, this);
      CollectionView.__super__.constructor.apply(this, arguments);
    }

    CollectionView.prototype.initialize = function() {
      CollectionView.__super__.initialize.apply(this, arguments);
      this.listenTo(this.collection, 'add', this.render);
      return this.listenTo(this.collection, 'remove', this.render);
    };

    CollectionView.prototype.render = function() {
      this.$el.html(this.template({
        collection: this.collection.toJSON()
      }));
      return this;
    };

    return CollectionView;

  })(KnitCount.View);

}).call(this);

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
      "project/:id": "project"
    };

    Router.prototype.projectList = function() {
      var view;
      view = new KnitCount.Views.ProjectListView({
        collection: KnitCount.projects
      }).render();
      return $('#container').html(view.el);
    };

    Router.prototype.project = function(id) {
      var view;
      view = new KnitCount.Views.ProjectView({
        model: KnitCount.getProject(id)
      }).render();
      return $('#container').html(view.el);
    };

    return Router;

  })(Backbone.Router);

}).call(this);

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

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  KnitCount.Models.Project = (function(_super) {

    __extends(Project, _super);

    function Project() {
      this.updateCounters = __bind(this.updateCounters, this);
      this.toJSON = __bind(this.toJSON, this);
      Project.__super__.constructor.apply(this, arguments);
    }

    Project.prototype.initialize = function() {
      this.counters = new KnitCount.Collections.Counters;
      return this.updateCounters();
    };

    Project.prototype.toJSON = function() {
      var attr;
      attr = _.clone(this.attributes);
      attr.counters = this.counters.toJSON();
      return attr;
    };

    Project.prototype.updateCounters = function() {
      var counters;
      counters = KnitCount.counters.where({
        project_id: this.get('id')
      });
      _.each(counters, function(counter) {
        return counter.project = this;
      });
      return this.counters.reset(counters);
    };

    return Project;

  })(Backbone.Model);

  KnitCount.Collections.Projects = (function(_super) {

    __extends(Projects, _super);

    function Projects() {
      Projects.__super__.constructor.apply(this, arguments);
    }

    Projects.prototype.model = KnitCount.Models.Project;

    Projects.prototype.sync = function(method, model, options) {
      if (method === 'read') {
        return this.reset([
          {
            id: 1,
            name: 'Project One'
          }, {
            id: 2,
            name: 'Project Two'
          }, {
            id: 3,
            name: 'Project Three'
          }
        ]);
      }
    };

    return Projects;

  })(Backbone.Collection);

}).call(this);

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

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  KnitCount.Views.ProjectListView = (function(_super) {

    __extends(ProjectListView, _super);

    function ProjectListView() {
      this.goToProject = __bind(this.goToProject, this);
      this.addProject = __bind(this.addProject, this);
      ProjectListView.__super__.constructor.apply(this, arguments);
    }

    ProjectListView.prototype.tagName = 'div';

    ProjectListView.prototype.className = 'project_list';

    ProjectListView.prototype.templateName = 'projectList';

    ProjectListView.prototype.events = {
      'click .add_project': 'addProject',
      'click .project a': 'goToProject'
    };

    ProjectListView.prototype.addProject = function() {
      var name;
      name = this.$('input[name="new_project_name"]').val();
      return this.collection.add({
        id: KnitCount.generateID('projects'),
        name: name
      });
    };

    ProjectListView.prototype.goToProject = function(e) {
      var projectID;
      projectID = $(e.target).data('id');
      KnitCount.router.navigate("project/" + projectID, {
        trigger: true
      });
      return e.preventDefault();
    };

    return ProjectListView;

  })(KnitCount.CollectionView);

}).call(this);

this["KnitCount"] = this["KnitCount"] || {};
this["KnitCount"]["Templates"] = this["KnitCount"]["Templates"] || {};

this["KnitCount"]["Templates"]["counter"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ": ";
  if (stack1 = helpers.value) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " <button class=\"increment\">add</button> <button class=\"decrement\">-</button>";
  return buffer;
  });

this["KnitCount"]["Templates"]["project"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<a href=\"#\" class=\"back\">Back to project list</a>\n\n<h2>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h2>\n\n<ul class=\"counters\"></ul>\n\n<p><button class=\"add_counter\">Add Counter</button></p>\n";
  return buffer;
  });

this["KnitCount"]["Templates"]["projectList"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <li class=\"project\"><a href=\"\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a></li>\n";
  return buffer;
  }

  buffer += "<h2>Projects</h2>\n<ul>\n";
  stack1 = helpers.each.call(depth0, depth0.collection, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n\n<p>\n  <label>New Project Name <input type=\"text\" name=\"new_project_name\" value=\"New Project\"></label>\n  <button class=\"add_project\">Add Project</button>\n</p>\n";
  return buffer;
  });