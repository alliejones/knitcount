class KnitCount.Models.Counter extends Backbone.Model
  increment: =>
    newValue = @get('value') + 1
    maxValue = @get 'max_value'
    if maxValue? and newValue > maxValue
      @set 'value', 1
      @trigger 'counter:rollover'
    else
      @set 'value', newValue

  decrement: =>
    value = @get('value') - 1
    @set 'value', value if value >= 0


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
      ,
        id: 2
        name: 'Counter Two'
        value: 0
        project_id: 1
        max_value: null
      ,
        id: 3
        name: 'Counter Three'
        value: 0
        project_id: 2
        max_value: null
      ,
        id: 4
        name: 'Counter Four'
        value: 1
        project_id: 3
        max_value: null
      ,
        id: 5
        name: 'Counter Five'
        value: 32
        project_id: 1
        max_value: null
      ])