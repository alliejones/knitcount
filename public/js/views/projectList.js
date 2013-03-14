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
      var name, project;
      name = this.$('input[name="new_project_name"]').val();
      project = new KnitCount.Models.Project({
        id: KnitCount.generateID('projects'),
        name: name
      });
      this.collection.add(project);
      return project.save();
    };

    ProjectListView.prototype.deleteProject = function(e) {
      var id;
      id = $(e.target).closest('button').prev('a').data('id');
      return KnitCount.projects.remove(KnitCount.getProject(id));
    };

    ProjectListView.prototype.toggleEditMode = function() {
      this.editMode = !this.editMode;
      $('body').toggleClass('edit_mode');
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
