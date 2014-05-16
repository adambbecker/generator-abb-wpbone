/*global <%= _.classify(themeTitle) %>, Backbone*/

<%= _.classify(themeTitle) %>.Models = <%= _.classify(themeTitle) %>.Models || {};

(function () {
    'use strict';

    <%= _.classify(themeTitle) %>.Models.<%= _.classify(name) %> = Backbone.Model.extend({

      url: '',

      defaults: {

      },

      initialize: function() {

      },

      validate: function(attrs, options) {

      },

      parse: function(response, options)  {
        return response;
      }

    });

})();
