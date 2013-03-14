class KnitCount.Views.CreateCounterView extends KnitCount.View
  id: 'add_counter_options'
  templateName: 'createCounter'

  initialize: (settings) ->
    super
    @unlinkedCounters = settings.unlinked_counters

  eventsAll:
    'change input[name="use_max_value"]': 'toggleUseMaxValue'
    'change input[name="use_linked_counter"]': 'toggleUseLinkedCounter'

  eventsTouch:
    'touchstart .add_counter': 'addCounter'
    'touchstart .add_counter_cancel': 'goToProject'

  eventsNoTouch:
    'click .add_counter': 'addCounter'
    'click .add_counter_cancel': 'goToProject'

  goToProject: -> KnitCount.router.navigate "project/#{@model.get 'project_id'}", trigger: true

  toggleUseMaxValue: (e) =>
    @toggleFormField e.target, '#max_value_input'

  toggleUseLinkedCounter: (e) =>
    @toggleFormField e.target, '#linked_counter_input'

  toggleFormField: (checkbox, fieldContainer) =>
    checkbox = if checkbox instanceof jQuery then checkbox else $(checkbox)
    input = this.$(fieldContainer)
    if checkbox.is(':checked')
      input.removeClass 'hidden'
    else
      input.addClass 'hidden'

  addCounter: =>
    @saveCounter()
    @goToProject()

  saveCounter: =>
    id = KnitCount.generateID('counters')
    maxValue = this.$('input[name="max_value"]').val()
    name = this.$('input[name="name"]').val()
    linked_counter_id = this.$('select[name="linked_counter_id"]').val()
    @model.set(
      id: id
      name: name
      value: 0
      max_value: if maxValue > 0 then +maxValue else null
      linked_counter_id: if linked_counter_id != "" then +linked_counter_id else null
    )
    KnitCount.counters.add @model
    @model.save()

  templateData: =>
    model: @model.toJSON()
    unlinkedCounters: @unlinkedCounters.toJSON()
    blah: 'some stuff'
