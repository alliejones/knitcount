window.KnitCount =
  Models: {}
  Collections: {}
  Views: {}

  init: ->
    @counters = new KnitCount.Collections.Counters()
    @counters.sync('read')

    @projects = new KnitCount.Collections.Projects()
    @projects.sync('read')

    @router = new KnitCount.Router
    Backbone.history.start()


  getProject: (id) -> @projects.get(id)

  # get an ID temporarily (while there is no database backend)
  generateID: (allModelsName) ->
    allModels = KnitCount[allModelsName]
    return null unless allModels?
    (allModels.max (m) -> m.id).id + 1


class KnitCount.View extends Backbone.View
  initialize: ->
    @template = KnitCount.Templates[@templateName]

  render: =>
    this.$el.html @template(@model.toJSON())
    this


class KnitCount.CollectionView extends KnitCount.View
  initialize: ->
    super
    @listenTo @collection, 'add', @render
    @listenTo @collection, 'remove', @render

  render: =>
    this.$el.html @template({ collection: @collection.toJSON() })
    this