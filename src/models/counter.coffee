class KnitCount.Models.Counter extends Backbone.Model
  defaults:
    max_value: 99
    linked_counter_id: null

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
    @save()

  decrement: =>
    value = @get('value') - 1
    @set 'value', value if value >= 0
    @save()

  linkedCounterUpdate: (updatedCounter) =>
    if @get('linked_counter_id')? and @get('linked_counter_id') == updatedCounter.get('id')
      @increment()


class KnitCount.Collections.Counters extends Backbone.Collection
  model: KnitCount.Models.Counter
  localStorage: new Backbone.LocalStorage "Counters"
