class KnitCount.Views.ProjectView extends KnitCount.View
  className: 'project'
  templateName: 'project'

  events:
    'click .back': 'goToProjectList'
    'click .add_counter': 'addCounter'

  initialize: =>
    super
    @listenTo KnitCount.counters, 'add', @model.updateCounters
    @listenTo @model.counters, 'reset', @render

  goToProjectList: -> KnitCount.router.navigate('/', trigger: true)

  addCounter: =>
    id = KnitCount.generateID('counters')
    KnitCount.counters.add new KnitCount.Models.Counter(
      id: id
      name: "Counter #{id}"
      value: 0
      project_id: @model.get('id')
    )

  renderCounter: (counter) =>
    view = new KnitCount.Views.Counter({ model: counter })
    this.$('.counters').append view.render().el

  render: =>
    super
    this.$('.counters').empty()
    @model.counters.each @renderCounter
    this

