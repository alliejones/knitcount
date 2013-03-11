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
    getCounter: function(id) {
      return this.counters.get(id);
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
      this.templateData = __bind(this.templateData, this);
      View.__super__.constructor.apply(this, arguments);
    }

    View.prototype.initialize = function() {
      return this.template = KnitCount.Templates[this.templateName];
    };

    View.prototype.templateData = function() {
      return this.model.toJSON();
    };

    View.prototype.render = function() {
      this.$el.html(this.template(this.templateData()));
      return this;
    };

    return View;

  })(Backbone.View);

  KnitCount.CollectionView = (function(_super) {

    __extends(CollectionView, _super);

    function CollectionView() {
      this.templateData = __bind(this.templateData, this);
      CollectionView.__super__.constructor.apply(this, arguments);
    }

    CollectionView.prototype.initialize = function() {
      CollectionView.__super__.initialize.apply(this, arguments);
      this.listenTo(this.collection, 'add', this.render);
      return this.listenTo(this.collection, 'remove', this.render);
    };

    CollectionView.prototype.templateData = function() {
      return {
        collection: this.collection.toJSON()
      };
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
      var maxValue, newValue;
      newValue = this.get('value') + 1;
      maxValue = this.get('max_value');
      if ((maxValue != null) && newValue > maxValue) {
        this.set('value', 0);
        return this.trigger('counter:reset');
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
            max_value: 10
          }, {
            id: 2,
            name: 'Counter Two',
            value: 0,
            project_id: 1,
            max_value: null
          }, {
            id: 3,
            name: 'Counter Three',
            value: 0,
            project_id: 2,
            max_value: null
          }, {
            id: 4,
            name: 'Counter Four',
            value: 1,
            project_id: 3,
            max_value: null
          }, {
            id: 5,
            name: 'Counter Five',
            value: 32,
            project_id: 1,
            max_value: null
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
      this.templateData = __bind(this.templateData, this);
      this["delete"] = __bind(this["delete"], this);
      this.decrement = __bind(this.decrement, this);
      this.increment = __bind(this.increment, this);
      this.initialize = __bind(this.initialize, this);
      Counter.__super__.constructor.apply(this, arguments);
    }

    Counter.prototype.tagName = 'li';

    Counter.prototype.templateName = 'counter';

    Counter.prototype.events = {
      'click .increment': 'increment',
      'click .decrement': 'decrement',
      'click .delete': 'delete'
    };

    Counter.prototype.initialize = function(settings) {
      Counter.__super__.initialize.apply(this, arguments);
      this.listenTo(this.model, 'change', this.render);
      return this.listenTo(settings.parentView, 'change:editMode', this.render);
    };

    Counter.prototype.increment = function() {
      return this.model.increment();
    };

    Counter.prototype.decrement = function() {
      return this.model.decrement();
    };

    Counter.prototype["delete"] = function() {
      return this.model.collection.remove(this.model);
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
      this.toggleUseMaxValue = __bind(this.toggleUseMaxValue, this);
      this.hideAddCounterOptions = __bind(this.hideAddCounterOptions, this);
      this.showAddCounterOptions = __bind(this.showAddCounterOptions, this);
      this.toggleEditMode = __bind(this.toggleEditMode, this);
      this.deleteCounter = __bind(this.deleteCounter, this);
      this.addCounter = __bind(this.addCounter, this);
      this.initialize = __bind(this.initialize, this);
      ProjectView.__super__.constructor.apply(this, arguments);
    }

    ProjectView.prototype.className = 'project';

    ProjectView.prototype.templateName = 'project';

    ProjectView.prototype.events = {
      'click .back': 'goToProjectList',
      'click .show_add_counter': 'showAddCounterOptions',
      'click .add_counter': 'addCounter',
      'click .add_counter_cancel': 'hideAddCounterOptions',
      'click .edit': 'toggleEditMode',
      'change input[name="use_max_value"]': 'toggleUseMaxValue'
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

    ProjectView.prototype.addCounter = function() {
      var id, maxValue, name;
      id = KnitCount.generateID('counters');
      maxValue = this.$('input[name="max_value"]').val();
      name = this.$('input[name="name"]').val();
      KnitCount.counters.add(new KnitCount.Models.Counter({
        id: id,
        name: name,
        value: 0,
        max_value: maxValue,
        project_id: this.model.get('id')
      }));
      return this.hideAddCounterOptions();
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

    ProjectView.prototype.showAddCounterOptions = function() {
      return this.$('#add_counter_options').removeClass('hidden');
    };

    ProjectView.prototype.hideAddCounterOptions = function() {
      return this.$('#add_counter_options').addClass('hidden');
    };

    ProjectView.prototype.toggleUseMaxValue = function(e) {
      var cb, input;
      cb = $(e.target);
      input = this.$('#max_value_input');
      if (cb.is(':checked')) {
        return input.removeClass('hidden');
      } else {
        return input.addClass('hidden');
      }
    };

    ProjectView.prototype.renderCounters = function() {
      var _this = this;
      this.$('.counters').empty();
      return this.model.counters.each(function(counter) {
        return _this.renderCounter(counter);
      });
    };

    ProjectView.prototype.renderCounter = function(counter) {
      var view;
      view = new KnitCount.Views.Counter({
        model: counter,
        parentView: this
      });
      view.parentView = this;
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

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  KnitCount.Views.ProjectListView = (function(_super) {

    __extends(ProjectListView, _super);

    function ProjectListView() {
      this.templateData = __bind(this.templateData, this);
      this.goToProject = __bind(this.goToProject, this);
      this.toggleEditMode = __bind(this.toggleEditMode, this);
      this.deleteProject = __bind(this.deleteProject, this);
      this.addProject = __bind(this.addProject, this);
      ProjectListView.__super__.constructor.apply(this, arguments);
    }

    ProjectListView.prototype.tagName = 'div';

    ProjectListView.prototype.className = 'project_list';

    ProjectListView.prototype.templateName = 'projectList';

    ProjectListView.prototype.events = {
      'click .add_project': 'addProject',
      'click .project a': 'goToProject',
      'click .edit': 'toggleEditMode',
      'click .delete_project': 'deleteProject'
    };

    ProjectListView.prototype.initialize = function() {
      ProjectListView.__super__.initialize.apply(this, arguments);
      this.editMode = false;
      return this.on('change:editMode', this.render);
    };

    ProjectListView.prototype.addProject = function() {
      var name;
      name = this.$('input[name="new_project_name"]').val();
      return this.collection.add({
        id: KnitCount.generateID('projects'),
        name: name
      });
    };

    ProjectListView.prototype.deleteProject = function(e) {
      var id;
      id = $(e.target).prev('a').data('id');
      return KnitCount.projects.remove(KnitCount.getProject(id));
    };

    ProjectListView.prototype.toggleEditMode = function() {
      this.editMode = !this.editMode;
      return this.trigger('change:editMode');
    };

    ProjectListView.prototype.goToProject = function(e) {
      var projectID;
      projectID = $(e.target).data('id');
      KnitCount.router.navigate("project/" + projectID, {
        trigger: true
      });
      return e.preventDefault();
    };

    ProjectListView.prototype.templateData = function() {
      return {
        collection: this.collection.toJSON(),
        editMode: this.editMode
      };
    };

    return ProjectListView;

  })(KnitCount.CollectionView);

}).call(this);

this["KnitCount"] = this["KnitCount"] || {};
this["KnitCount"]["Templates"] = this["KnitCount"]["Templates"] || {};

this["KnitCount"]["Templates"]["counter"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n  <button class=\"decrement\">subtract</button>\n  <button class=\"delete\">delete</button>\n";
  }

  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ": ";
  if (stack1 = helpers.value) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " <button class=\"increment\">add</button>\n";
  stack1 = helpers['if'].call(depth0, depth0.editMode, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  });

this["KnitCount"]["Templates"]["project"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "Done Editing";
  }

function program3(depth0,data) {
  
  
  return "Edit Counters";
  }

  buffer += "<a href=\"#\" class=\"back\">Back to project list</a>\n\n<h2>"
    + escapeExpression(((stack1 = ((stack1 = depth0.project),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h2>\n\n<ul class=\"counters\"></ul>\n\n<p><button class=\"show_add_counter\">Add Counter</button></p>\n\n<p><button class=\"edit\">";
  stack2 = helpers['if'].call(depth0, depth0.editMode, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</button></p>\n\n<div id=\"add_counter_options\" class=\"hidden\">\n  <h3>Add a counter</h3>\n  <p>\n    <label for=\"name\">Name</label>\n    <input type=\"text\" name=\"name\">\n  </p>\n  <p>\n    <label for=\"use_max_value\">\n      <input type=\"checkbox\" name=\"use_max_value\"> Set a maximum counter value\n    </label>\n  </p>\n  <p id=\"max_value_input\" class=\"hidden\">\n    <label for=\"max_value\">Maximum counter value</label>\n    <input type=\"number\" name=\"max_value\" pattern=\"[0-9]*\">\n  </p>\n  <button class=\"add_counter\">Add counter</button>\n  <button class=\"add_counter_cancel\">Cancel</button>\n</div>\n";
  return buffer;
  });

this["KnitCount"]["Templates"]["projectList"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n  <li class=\"project\">\n    <a href=\"\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n    ";
  stack1 = helpers['if'].call(depth0, depth1.editMode, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "<button class=\"delete_project\">Delete</button>";
  }

function program4(depth0,data) {
  
  
  return "Done Editing";
  }

function program6(depth0,data) {
  
  
  return "Edit Projects";
  }

  buffer += "<h2>Projects</h2>\n\n<ul>\n";
  stack1 = helpers.each.call(depth0, depth0.collection, {hash:{},inverse:self.noop,fn:self.programWithDepth(program1, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n\n<p>\n  <label>New Project Name <input type=\"text\" name=\"new_project_name\" value=\"New Project\"></label>\n  <button class=\"add_project\">Add Project</button>\n</p>\n\n<p><button class=\"edit\">";
  stack1 = helpers['if'].call(depth0, depth0.editMode, {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</button></p>\n";
  return buffer;
  });