class KnitCount.Views.ProjectView extends KnitCount.View
  className: 'project'
  templateName: 'project'

  eventsNoTouch:
    'click .back': 'goToProjectList'
    'click .show_add_counter': 'goToAddCounter'
    'click .edit': 'toggleEditMode'

  eventsTouch:
    'touchstart .back': 'goToProjectList'
    'touchstart .show_add_counter': 'goToAddCounter'
    'touchstart .edit': 'toggleEditMode'

  initialize: (settings) =>
    super

    @editMode = settings.editMode || false

    @listenTo KnitCount.counters, 'add', @model.updateCounters
    @listenTo KnitCount.counters, 'remove', @model.updateCounters
    @listenTo @model.counters, 'reset', @renderCounters

    @on 'change:editMode', @render

  goToProjectList: ->
    $('body').removeClass('edit_mode')
    KnitCount.router.navigate('/', trigger: true)

  goToAddCounter: ->
    $('body').removeClass('edit_mode')
    KnitCount.router.navigate("project/#{@model.get 'id'}/new", trigger: true)

  toggleEditMode: =>
    @editMode = !@editMode
    # timeout needed to redraw styles so css transitions will be triggered
    setTimeout (-> $('body').toggleClass('edit_mode')), 0
    @trigger 'change:editMode'

  renderCounters: =>
    this.$('.counters').empty()
    @model.counters.each (counter) => @renderCounter counter

  renderCounter: (counter) =>
    view = new KnitCount.Views.Counter( model: counter, parentView: this )
    this.$('.counters').append view.render().el

  render: =>
    super
    @renderCounters()
    this

  templateData: =>
    project: @model.toJSON()
    editMode: @editMode

