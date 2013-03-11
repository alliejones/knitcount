class KnitCount.Router extends Backbone.Router
  routes:
    "": "projectList"
    "project/:id": "project"
    "project/:id/new": "createCounter"

  projectList: ->
    view = new KnitCount.Views.ProjectListView({ collection: KnitCount.projects }).render()
    $('#container').html view.el

  project: (id) ->
    model = KnitCount.getProject(id)
    model.updateCounters()
    view = new KnitCount.Views.ProjectView({ model: model }).render()
    $('#container').html view.el

  createCounter: (id) ->
    view = new KnitCount.Views.CreateCounterView(
      model: new KnitCount.Models.Counter(project_id: +id)
    ).render()
    $('#container').html view.el
