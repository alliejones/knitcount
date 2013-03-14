window.KnitCount =
  Models: {}
  Collections: {}
  Views: {}

  init: ->
    @counters = new KnitCount.Collections.Counters()
    @counters.fetch()
    @projects = new KnitCount.Collections.Projects()
    @projects.fetch()

    @router = new KnitCount.Router
    Backbone.history.start()


  getProject: (id) -> @projects.get(id)
  getCounter: (id) -> @counters.get(id)

  # get an ID temporarily (while there is no database backend)
  generateID: (allModelsName) ->
    allModels = KnitCount[allModelsName]
    return null unless allModels?
    return 1 if allModels.length == 0
    (allModels.max (m) -> m.id).id + 1


KnitCount.dispatcher = {}
_.extend(KnitCount.dispatcher, Backbone.Events)


class KnitCount.View extends Backbone.View
  initialize: (settings) ->
    @template = KnitCount.Templates[@templateName]
    @parentView = settings.parentView if settings.parentView?

  events: =>
    if Modernizr.touch
      _.extend({}, @eventsAll, @eventsTouch)
    else
      _.extend({}, @eventsAll, @eventsNoTouch)

  templateData: => @model.toJSON()

  render: =>
    this.$el.html @template(@templateData())
    this


class KnitCount.CollectionView extends KnitCount.View
  initialize: ->
    super
    @listenTo @collection, 'add', @render
    @listenTo @collection, 'remove', @render

  templateData: => { collection: @collection.toJSON() }
