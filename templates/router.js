/*global <%= _.classify(themeTitle) %>, Backbone*/

<%= _.classify(themeTitle) %>.Routers = <%= _.classify(themeTitle) %>.Routers || {};

(function () {
    'use strict';

    <%= _.classify(themeTitle) %>.Routers.<%= _.classify(name) %> = Backbone.Router.extend({

      routes: {
        '*notFound' : 'go',
			  ''          : 'go'
      },

      go: function(pathname) {
        var url = '/';

  			if ( !_.isNull( pathname ) ) {
  				url += pathname
  			}

        if (url.indexOf('?') > 0) {
          url = url.replace(/\?/, '?json=1&');
        } else {
          url += '?json=1';
        }

        $.get(url)
        .done(function(data) {
          // Set stuff with data
        })
        .fail(function(err) {
          console.warn('error', err);
        })
      }

    });

})();
