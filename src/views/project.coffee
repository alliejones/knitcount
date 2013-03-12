class KnitCount.Views.ProjectView extends KnitCount.View
  className: 'project'
  templateName: 'project'

  events:
    'click .back': 'goToProjectList'
    'click .show_add_counter': 'goToAddCounter'
    'click .edit': 'toggleEditMode'

  initialize: =>
    super

    @editMode = false

    @listenTo KnitCount.counters, 'add', @model.updateCounters
    @listenTo KnitCount.counters, 'remove', @model.updateCounters
    @listenTo @model.counters, 'reset', @renderCounters

    @on 'change:editMode', @render

  goToProjectList: -> KnitCount.router.navigate('/', trigger: true)
  goToAddCounter: -> KnitCount.router.navigate("project/#{@model.get 'id'}/new", trigger: true)

  deleteCounter: (e) =>
    id = $(e.target).prev('a').data('id')
    KnitCount.projects.remove KnitCount.getCounter(id)

  toggleEditMode: =>
    @editMode = !@editMode
    setTimeout (-> $('body').toggleClass('edit_mode')), 0
    @trigger 'change:editMode'

  renderCounters: =>
    counterList = this.$('.counters')
    addForm = $('.add_counter_form', counterList).detach()
    counterList.empty()
    @model.counters.each (counter) => @renderCounter counter
    counterList.append(addForm)

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

