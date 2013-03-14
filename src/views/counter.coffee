class KnitCount.Views.Counter extends KnitCount.View
  tagName: 'li'
  className: 'row'
  templateName: 'counter'

  eventsNoTouch:
    'click .increment': 'increment'
    'click .decrement': 'decrement'
    'click .delete': 'delete'

  eventsTouch:
    'touchstart .increment': 'increment'
    'touchstart .decrement': 'decrement'
    'touchstart .delete': 'delete'

  initialize: (settings) =>
    super
    @listenTo @model, 'change', @render
    @listenTo @parentView, 'change:editMode', @render

  increment: => @model.increment()

  decrement: => @model.decrement()

  delete: => @model.destroy()

  templateData: =>
    data = @model.toJSON()
    data.editMode = @parentView.editMode
    data
