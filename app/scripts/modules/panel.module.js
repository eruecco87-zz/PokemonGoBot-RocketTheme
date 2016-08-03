$(function() {

  (function($, window, undefined) {

    'use strict';

    APP.Modules.Panel = (function() {

      var elements = {
        panel:  $('.panel'),
        panelToggle: $('.panel-toggle'),
        sortableContainer: $('.sortable-container'),
      };

      return {

        init: function() {

          console.log('Panel Module Initialized');

          /* =======================
           COMPONENT FUNCTIONALITY
           ======================= */
          elements.panelToggle.click(function () {

            var panel = $(this).parents('.panel').find('.panel-body');

            if (panel.is(':visible')) {

              panel.slideUp();
              panel.next().hide();

            } else {

              panel.slideDown();
              panel.next().show();

            }

            panel.parents('.panel').find('.panel-toggle i').toggleClass('fa-plus fa-minus');

          });

          elements.sortableContainer.sortable({
            handle: '.panel-heading',
            placeholder: 'panel-placeholder',
            connectWith: '.sortable-container'
          });

        }

      };

    }());


  })(jQuery, window);

});