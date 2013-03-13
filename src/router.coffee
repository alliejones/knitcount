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
    view = new KnitCount.Views.ProjectView(
      model: model
      editMode: false
    ).render()
    $('#container').html view.el

  createCounter: (projectId, query) ->
    project = KnitCount.getProject(projectId)
    # for populating the counter linking dropdown
    unlinkedCounters = project.counters.filter (counter) -> counter.get('linked_counter_id') == null
    view = new KnitCount.Views.CreateCounterView(
      model: new KnitCount.Models.Counter(project_id: +projectId)
      unlinked_counters: new KnitCount.Collections.Counters(unlinkedCounters)
    ).render()
    $('#container').html view.el

