$(function() {

  (function($, window, undefined) {

    'use strict';

    APP.Utils = (function() {

      return {

        insertLoading: function(panel) {

          panel.find('.panel-loader').show();

        },

        removeLoading: function(panel) {

          panel.find('.panel-loader').hide();

        }

      }

    }());


  })(jQuery, window);

});