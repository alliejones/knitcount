class KnitCount.Models.Project extends Backbone.Model
  initialize: ->
    @counters = new KnitCount.Collections.Counters
    @updateCounters()

  toJSON: =>
    attr = _.clone(@attributes, )
    attr.counters = @counters.toJSON()
    attr

  updateCounters: =>
    counters = KnitCount.counters.where({ project_id: @get('id') })
    _.each counters, (counter) -> counter.project = this
    @counters.reset counters


class KnitCount.Collections.Projects extends Backbone.Collection
  model: KnitCount.Models.Project
  localStorage: new Backbone.LocalStorage "Projects"
