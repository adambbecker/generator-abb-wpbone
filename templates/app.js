/*global <%= _.classify(themeTitle) %>, $*/


window.<%= _.classify(themeTitle) %> = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function () {
    'use strict';
    console.log('Hello from Backbone!');
  }
};

$(document).ready(function () {
  'use strict';
  <%= _.classify(themeTitle) %>.init();
});
