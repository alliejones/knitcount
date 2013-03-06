class KnitCount.Views.Counter extends KnitCount.View
  tagName: 'li'
  templateName: 'counter'

  events:
    'click .increment': 'increment'
    'click .decrement': 'decrement'

  initialize: ->
    super
    @listenTo @model, 'change', @render

  increment: => @model.increment()

  decrement: => @model.decrement()
