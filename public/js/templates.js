this["KnitCount"] = this["KnitCount"] || {};
this["KnitCount"]["Templates"] = this["KnitCount"]["Templates"] || {};

this["KnitCount"]["Templates"]["counter"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <button class=\"delete\"><i class=\"icon-remove-sign icon-large\"></i></button>\n  <button class=\"decrement\"><i class=\"icon-minus icon-large\"></i></button>\n  ";
  stack1 = helpers['if'].call(depth0, depth0.linked_counter_id, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "\n    <button class=\"increment\"><i class=\"icon-plus icon-large\"></i></button>\n  ";
  }

function program4(depth0,data) {
  
  
  return "\n  <button class=\"increment\"><i class=\"icon-plus icon-large\"></i></button>\n";
  }

  buffer += "<span class=\"name\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span> <span class=\"value\">";
  if (stack1 = helpers.value) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</span>\n";
  stack1 = helpers['if'].call(depth0, depth0.editMode, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  stack1 = helpers.unless.call(depth0, depth0.linked_counter_id, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  });

this["KnitCount"]["Templates"]["createCounter"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<header>\n  <h2>Create a counter</h2>\n</header>\n<p>\n  <label for=\"name\">Name</label>\n  <input type=\"text\" name=\"name\">\n</p>\n<p>\n  <label>\n    <input type=\"checkbox\" name=\"use_max_value\"> Set a maximum counter value\n  </label>\n</p>\n<p id=\"max_value_input\" class=\"hidden\">\n  <label for=\"max_value\">Maximum counter value</label>\n  <input type=\"number\" name=\"max_value\" pattern=\"[0-9]*\">\n</p>\n\n<p>\n  <label>\n    <input type=\"checkbox\" name=\"use_linked_counter\"> Link this counter to another counter\n  </label>\n</p>\n<p id=\"linked_counter_input\" class=\"hidden\">\n  <select name=\"linked_counter_id\">\n    <option>Select a counter</option>\n  </select>\n</p>\n\n<button class=\"add_counter\">Add counter</button>\n<button class=\"add_counter_cancel\">Cancel</button>";
  });

this["KnitCount"]["Templates"]["project"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "<i class=\"icon-ok icon-large\"></i> done";
  }

function program3(depth0,data) {
  
  
  return "<i class=\"icon-pencil icon-large\"></i> edit";
  }

  buffer += "<header>\n  <h2>\n    <button class=\"back button-left\"><i class=\"icon-arrow-left icon-large\"></i></button>\n    "
    + escapeExpression(((stack1 = ((stack1 = depth0.project),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n    <button class=\"edit\">";
  stack2 = helpers['if'].call(depth0, depth0.editMode, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</button>\n  </h2>\n</header>\n\n<ul class=\"counters\">\n  <li class=\"row add_counter_form\">\n    <button class=\"show_add_counter\">add counter <i class=\"icon-plus icon-large\"></i></button>\n  </li>\n</ul>\n";
  return buffer;
  });

this["KnitCount"]["Templates"]["projectList"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "<i class=\"icon-ok icon-large\"></i> done";
  }

function program3(depth0,data) {
  
  
  return "<i class=\"icon-pencil icon-large\"></i> edit";
  }

function program5(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n  <li class=\"project row\">\n    <a href=\"\" data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n    ";
  stack1 = helpers['if'].call(depth0, depth1.editMode, {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </li>\n";
  return buffer;
  }
function program6(depth0,data) {
  
  
  return "<button class=\"delete_project\"><i class=\"icon-remove-sign icon-large\"></i></button>";
  }

  buffer += "<header>\n  <h2>\n    Projects\n    <button class=\"edit button-side\">";
  stack1 = helpers['if'].call(depth0, depth0.editMode, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</button>\n  </h2>\n</header>\n<ul>\n";
  stack1 = helpers.each.call(depth0, depth0.collection, {hash:{},inverse:self.noop,fn:self.programWithDepth(program5, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <li class=\"row inline_form\">\n    <label><input type=\"text\" name=\"new_project_name\" placeholder=\"Project Name\"></label>\n    <button class=\"add_project\"><i class=\"icon-plus icon-large\"></i></button>\n  </li>\n</ul>\n";
  return buffer;
  });