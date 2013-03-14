class KnitCount.Models.Project extends Backbone.Model
  initialize: ->
    @counters = new KnitCount.Collections.Counters
    @updateCounters()

    @on 'destroy', @destroyCounters

    @listenTo @counters, 'add', @updateCounters()
    @listenTo @counters, 'remove', @updateCounters()

  toJSON: =>
    attr = _.clone(@attributes)
    attr.counters = @counters.toJSON()
    attr

  updateCounters: =>
    @counters.reset KnitCount.counters.where(project_id: @get 'id')
    @counters.each (counter) -> counter.project = this

  destroyCounters: =>
    # can't delete things from a collection while iterating over it
    # so make a copy of the model array instead
    counters = _.clone(@counters.models)
    _.each counters, (c) -> c.destroy()


class KnitCount.Collections.Projects extends Backbone.Collection
  model: KnitCount.Models.Project
  localStorage: new Backbone.LocalStorage "Projects"
