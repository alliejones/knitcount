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
      return this.counters = new KnitCount.Collections.Counters(counters);
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
