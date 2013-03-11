class KnitCount.Models.Counter extends Backbone.Model
  initialize: =>
    super
    @listenTo KnitCount.dispatcher, 'counter:rollover', @linkedCounterUpdate

  increment: =>
    newValue = @get('value') + 1
    maxValue = @get 'max_value'
    if maxValue? and newValue > maxValue
      @set 'value', 1
      KnitCount.dispatcher.trigger 'counter:rollover', this
    else
      @set 'value', newValue

  decrement: =>
    value = @get('value') - 1
    @set 'value', value if value >= 0

  linkedCounterUpdate: (updatedCounter) =>
    if @get('linked_counter_id')? and @get('linked_counter_id') == updatedCounter.get('id')
      @increment()


class KnitCount.Collections.Counters extends Backbone.Collection
  model: KnitCount.Models.Counter

  sync: (method, model, options) ->
    if method == 'read'
      @reset([
        id: 1
        name: 'Counter One'
        value: 6
        project_id: 1
        max_value: 10
        linked_counter_id: null
      ,
        id: 2
        name: 'Counter Two'
        value: 0
        project_id: 1
        max_value: 3
        linked_counter_id: null
      ,
        id: 3
        name: 'Counter Three'
        value: 0
        project_id: 2
        max_value: null
        linked_counter_id: null
      ,
        id: 4
        name: 'Counter Four'
        value: 1
        project_id: 3
        max_value: null
        linked_counter_id: null
      ,
        id: 5
        name: 'Linked to One'
        value: 2
        project_id: 1
        max_value: null
        linked_counter_id: 1
      ,
        id: 6
        name: 'Linked to Two'
        value: 2
        project_id: 1
        max_value: 2
        linked_counter_id: 2
      ])