class KnitCount.Router extends Backbone.Router
  routes:
    "": "projectList"
    "project/:id": "project"

  projectList: ->
    view = new KnitCount.Views.ProjectListView({ collection: KnitCount.projects }).render()
    $('#container').html view.el

  project: (id) ->
    view = new KnitCount.Views.ProjectView({ model: KnitCount.getProject(id) }).render()
    $('#container').html view.el
