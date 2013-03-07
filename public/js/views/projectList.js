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
