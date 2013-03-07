class KnitCount.Views.ProjectView extends KnitCount.View
  className: 'project'
  templateName: 'project'

  events:
    'click .back': 'goToProjectList'
    'click .add_counter': 'addCounter'
    'click .edit': 'toggleEditMode'

  initialize: =>
    super

    @editMode = false

    @listenTo KnitCount.counters, 'add', @model.updateCounters
    @listenTo KnitCount.counters, 'remove', @model.updateCounters
    @listenTo @model.counters, 'reset', @render
    @on 'change:editMode', @render

  goToProjectList: -> KnitCount.router.navigate('/', trigger: true)

  addCounter: =>
    id = KnitCount.generateID('counters')
    KnitCount.counters.add new KnitCount.Models.Counter(
      id: id
      name: "Counter #{id}"
      value: 0
      project_id: @model.get('id')
    )

  deleteCounter: (e) =>
    id = $(e.target).prev('a').data('id')
    KnitCount.projects.remove KnitCount.getCounter(id)

  toggleEditMode: =>
    @editMode = !@editMode
    @trigger 'change:editMode'

  renderCounter: (counter) =>
    view = new KnitCount.Views.Counter( model: counter, parentView: this )
    view.parentView = this
    this.$('.counters').append view.render().el

  render: =>
    super
    this.$('.counters').empty()
    @model.counters.each (counter) =>
      @renderCounter counter
    this

  templateData: => { project: @model.toJSON(), editMode: @editMode }

