class KnitCount.Views.Counter extends KnitCount.View
  tagName: 'li'
  templateName: 'counter'

  events:
    'click .increment': 'increment'
    'click .decrement': 'decrement'
    'click .delete': 'delete'

  initialize: (settings) =>
    super
    @listenTo @model, 'change', @render
    @listenTo settings.parentView, 'change:editMode', @render

  increment: => @model.increment()

  decrement: => @model.decrement()

  delete: => @model.collection.remove(@model)

  templateData: =>
    data = @model.toJSON()
    data.editMode = @parentView.editMode
    data
