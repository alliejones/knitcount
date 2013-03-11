this["KnitCount"] = this["KnitCount"] || {};
this["KnitCount"]["Templates"] = this["KnitCount"]["Templates"] || {};

this["KnitCount"]["Templates"]["counter"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n  <button class=\"decrement\">subtract</button>\n  <button class=\"delete\">delete</button>\n";
  }

  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ": ";
  if (stack1 = helpers.value) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " <button class=\"increment\">add</button>\n";
  stack1 = helpers['if'].call(depth0, depth0.editMode, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  });

this["KnitCount"]["Templates"]["createCounter"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<h2>Create a counter</h2>\n<p>\n  <label for=\"name\">Name</label>\n  <input type=\"text\" name=\"name\">\n</p>\n<p>\n  <label>\n    <input type=\"checkbox\" name=\"use_max_value\"> Set a maximum counter value\n  </label>\n</p>\n<p id=\"max_value_input\" class=\"hidden\">\n  <label for=\"max_value\">Maximum counter value</label>\n  <input type=\"number\" name=\"max_value\" pattern=\"[0-9]*\">\n</p>\n<button class=\"add_counter\">Add counter</button>\n<button class=\"add_counter_cancel\">Cancel</button>";
  });

this["KnitCount"]["Templates"]["project"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "Done Editing";
  }

function program3(depth0,data) {
  
  
  return "Edit Counters";
  }

  buffer += "<a href=\"#\" class=\"back\">Back to project list</a>\n\n<h2>"
    + escapeExpression(((stack1 = ((stack1 = depth0.project),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h2>\n\n<ul class=\"counters\"></ul>\n\n<p><button class=\"show_add_counter\">Add Counter</button></p>\n\n<p><button class=\"edit\">";
  stack2 = helpers['if'].call(depth0, depth0.editMode, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</button></p>";
  return buffer;
  });

this["KnitCount"]["Templates"]["projectList"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n  <li class=\"project\">\n    <a href=\"\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n    ";
  stack1 = helpers['if'].call(depth0, depth1.editMode, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "<button class=\"delete_project\">Delete</button>";
  }

function program4(depth0,data) {
  
  
  return "Done Editing";
  }

function program6(depth0,data) {
  
  
  return "Edit Projects";
  }

  buffer += "<h2>Projects</h2>\n\n<ul>\n";
  stack1 = helpers.each.call(depth0, depth0.collection, {hash:{},inverse:self.noop,fn:self.programWithDepth(program1, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n\n<p>\n  <label>New Project Name <input type=\"text\" name=\"new_project_name\" value=\"New Project\"></label>\n  <button class=\"add_project\">Add Project</button>\n</p>\n\n<p><button class=\"edit\">";
  stack1 = helpers['if'].call(depth0, depth0.editMode, {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</button></p>\n";
  return buffer;
  });