class KnitCount.Views.ProjectView extends KnitCount.View
  className: 'project'
  templateName: 'project'

  events:
    'click .back': 'goToProjectList'

  goToProjectList: -> KnitCount.router.navigate('/', trigger: true)

  renderCounter: (counter) =>
    view = new KnitCount.Views.Counter({ model: counter })
    this.$('.counters').append view.render().el

  render: =>
    super
    @model.counters.each @renderCounter
    this

