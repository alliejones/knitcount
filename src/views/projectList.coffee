class KnitCount.Views.ProjectListView extends KnitCount.CollectionView
  tagName: 'div'
  className: 'project_list'
  templateName: 'projectList'

  events:
    'click .add_project': 'addProject'
    'click .project a': 'goToProject'

  addProject: =>
    name = this.$('input[name="new_project_name"]').val()
    @collection.add(
      id: KnitCount.generateID('projects')
      name: name
    )

  goToProject: (e) =>
    projectID = $(e.target).data('id')
    KnitCount.router.navigate("project/#{projectID}", trigger: true)
    e.preventDefault()
