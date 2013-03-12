class KnitCount.Views.ProjectListView extends KnitCount.CollectionView
  tagName: 'div'
  className: 'project_list'
  templateName: 'projectList'

  events:
    'click .add_project': 'addProject'
    'click .project a': 'goToProject'
    'click .edit': 'toggleEditMode'
    'click .delete_project': 'deleteProject'

  initialize: ->
    super
    @editMode = false
    @on 'change:editMode', @render

  addProject: =>
    name = this.$('input[name="new_project_name"]').val()
    @collection.add(
      id: KnitCount.generateID('projects')
      name: name
    )

  deleteProject: (e) =>
    id = $(e.target).closest('button').prev('a').data('id')
    KnitCount.projects.remove KnitCount.getProject(id)

  toggleEditMode: =>
    @editMode = !@editMode
    $('body').toggleClass('edit_mode')
    @trigger 'change:editMode'

  goToProject: (e) =>
    projectID = $(e.target).data('id')
    KnitCount.router.navigate("project/#{projectID}", trigger: true)
    e.preventDefault()

  templateData: => { collection: @collection.toJSON(), editMode: @editMode }