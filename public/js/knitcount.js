(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.KnitCount = {
    Models: {},
    Collections: {},
    Views: {},
    init: function() {
      this.counters = new KnitCount.Collections.Counters();
      this.counters.fetch();
      this.projects = new KnitCount.Collections.Projects();
      this.projects.fetch();
      this.router = new KnitCount.Router;
      return Backbone.history.start();
    },
    getProject: function(id) {
      return this.projects.get(id);
    },
    getCounter: function(id) {
      return this.counters.get(id);
    },
    generateID: function(allModelsName) {
      var allModels;
      allModels = KnitCount[allModelsName];
      if (allModels == null) {
        return null;
      }
      if (allModels.length === 0) {
        return 1;
      }
      return (allModels.max(function(m) {
        return m.id;
      })).id + 1;
    }
  };

  KnitCount.dispatcher = {};

  _.extend(KnitCount.dispatcher, Backbone.Events);

  KnitCount.View = (function(_super) {

    __extends(View, _super);

    function View() {
      this.render = __bind(this.render, this);
      this.templateData = __bind(this.templateData, this);
      View.__super__.constructor.apply(this, arguments);
    }

    View.prototype.initialize = function(settings) {
      this.template = KnitCount.Templates[this.templateName];
      if (settings.parentView != null) {
        return this.parentView = settings.parentView;
      }
    };

    View.prototype.templateData = function() {
      return this.model.toJSON();
    };

    View.prototype.render = function() {
      this.$el.html(this.template(this.templateData()));
      return this;
    };

    return View;

  })(Backbone.View);

  KnitCount.CollectionView = (function(_super) {

    __extends(CollectionView, _super);

    function CollectionView() {
      this.templateData = __bind(this.templateData, this);
      CollectionView.__super__.constructor.apply(this, arguments);
    }

    CollectionView.prototype.initialize = function() {
      CollectionView.__super__.initialize.apply(this, arguments);
      this.listenTo(this.collection, 'add', this.render);
      return this.listenTo(this.collection, 'remove', this.render);
    };

    CollectionView.prototype.templateData = function() {
      return {
        collection: this.collection.toJSON()
      };
    };

    return CollectionView;

  })(KnitCount.View);

}).call(this);
