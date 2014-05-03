/*global <%= _.classify(themeTitle) %>, Backbone*/

<%= _.classify(themeTitle) %>.Collections = <%= _.classify(themeTitle) %>.Collections || {};

(function () {
  'use strict';

  <%= _.classify(themeTitle) %>.Collections.<%= _.classify(name) %> = Backbone.Collection.extend({

    model: <%= _.classify(themeTitle) %>.Models.<%= _.classify(name) %>

  });

})();
