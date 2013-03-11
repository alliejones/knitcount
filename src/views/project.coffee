class KnitCount.Views.ProjectView extends KnitCount.View
  className: 'project'
  templateName: 'project'

  events:
    'click .back': 'goToProjectList'
    'click .show_add_counter': 'showAddCounterOptions'
    'click .add_counter': 'addCounter'
    'click .add_counter_cancel': 'hideAddCounterOptions'
    'click .edit': 'toggleEditMode'
    'change input[name="use_max_value"]': 'toggleUseMaxValue'

  initialize: =>
    super

    @editMode = false

    @listenTo KnitCount.counters, 'add', @model.updateCounters
    @listenTo KnitCount.counters, 'remove', @model.updateCounters
    @listenTo @model.counters, 'reset', @renderCounters

    @on 'change:editMode', @render

  goToProjectList: -> KnitCount.router.navigate('/', trigger: true)

  addCounter: =>
    id = KnitCount.generateID('counters')
    maxValue = this.$('input[name="max_value"]').val()
    name = this.$('input[name="name"]').val()
    KnitCount.counters.add new KnitCount.Models.Counter(
      id: id
      name: name
      value: 0
      max_value: maxValue
      project_id: @model.get('id')
    )
    @hideAddCounterOptions()

  deleteCounter: (e) =>
    id = $(e.target).prev('a').data('id')
    KnitCount.projects.remove KnitCount.getCounter(id)

  toggleEditMode: =>
    @editMode = !@editMode
    @trigger 'change:editMode'

  showAddCounterOptions: => this.$('#add_counter_options').removeClass('hidden')
  hideAddCounterOptions: => this.$('#add_counter_options').addClass('hidden')

  toggleUseMaxValue: (e) =>
    cb = $(e.target)
    input = this.$('#max_value_input')
    if cb.is ':checked'
      input.removeClass 'hidden'
    else
      input.addClass 'hidden'

  renderCounters: =>
    this.$('.counters').empty()
    @model.counters.each (counter) => @renderCounter counter

  renderCounter: (counter) =>
    view = new KnitCount.Views.Counter( model: counter, parentView: this )
    view.parentView = this
    this.$('.counters').append view.render().el

  render: =>
    super
    @renderCounters()
    this

  templateData: =>
    project: @model.toJSON()
    editMode: @editMode

