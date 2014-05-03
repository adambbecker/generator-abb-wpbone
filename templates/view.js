/*global <%= _.classify(themeTitle) %>, Backbone, JST*/

<%= _.classify(themeTitle) %>.Views = <%= _.classify(themeTitle) %>.Views || {};

(function () {
    'use strict';

    <%= _.classify(themeTitle) %>.Views.<%= _.classify(name) %>View = Backbone.View.extend({

      template: JST['<%= jst_path %>'],

      tagName: 'div',

      id: '',

      className: '',

      events: {},

      initialize: function () {
        this.listenTo(this.model, 'change', this.render);
      },

      render: function () {
        this.$el.html(this.template(this.model.toJSON()));
      }

    });

})();
