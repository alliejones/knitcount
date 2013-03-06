class KnitCount.Models.Counter extends Backbone.Model
  increment: =>
    @set 'value', @get('value') + 1

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
      ,
        id: 2
        name: 'Counter Two'
        value: 0
        project_id: 1
      ,
        id: 3
        name: 'Counter Three'
        value: 0
        project_id: 2
      ,
        id: 4
        name: 'Counter Four'
        value: 1
        project_id: 3
      ,
        id: 5
        name: 'Counter Five'
        value: 32
        project_id: 1
      ])