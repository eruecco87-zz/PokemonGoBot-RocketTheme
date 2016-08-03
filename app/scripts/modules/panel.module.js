$(function() {

  (function($, window, undefined) {

    'use strict';

    APP.Modules.Panel = (function() {

      var elements = {
        panel:  $('.panel'),
        panelToggle: $('.panel-toggle'),
        sortableContainer: $('.sortable-container'),
        resetPanelsLink: $('#reset-panels-link'),
        panelResetModal: $('#panel-reset-modal')
      };

      var panelStates = [];

      var setPanelStates = function() {

        panelStates = [];

        $.each($('.panel-sortable'), function(index, panel) {

          panelStates.push({
            panelId: panel.id,
            panelClasses: $(panel).attr('class'),
            parentId: $(panel).parent().attr('id'),
            panelTemplate: panel.innerHTML,
            panelCollapsed: $(panel).hasClass('panel-collapsed')
          });

        });

        localStorage.setItem(APP.Main.appId + 'PanelStates', JSON.stringify(panelStates));

        nanobar.go(100);

      };

      return {

        init: function() {

          console.log('Panel Module Initialized');

          /* =======================
           COMPONENT FUNCTIONALITY
           ======================= */
          if (window.localStorage[APP.Main.appId + 'PanelStates']) {

            panelStates = JSON.parse(window.localStorage[APP.Main.appId + 'PanelStates']);

            elements.sortableContainer.html("");

            $.each(panelStates, function(index, panel) {

              $('#' + panel.parentId).append('<div class="' + panel.panelClasses + '" id="' + panel.panelId + '">' + panel.panelTemplate + '</div>');

              if (panel.panelCollapsed) {

                $('#' + panel.parentId).find('.panel-body').hide();
                $('#' + panel.parentId).find('.panel-toggle i').attr('class','fa fa-plus');

              }

            });

            elements.panelToggle = $('.panel-toggle');

          }

          elements.panelToggle.on('click', function () {

            var panel = $(this).parents('.panel').find('.panel-body');

            if (panel.is(':visible')) {

              panel.slideUp();
              panel.next().hide();
              panel.parents('.panel-sortable').addClass('panel-collapsed');

            } else {

              panel.slideDown();
              panel.next().show();
              panel.parents('.panel-sortable').removeClass('panel-collapsed');

            }

            panel.parents('.panel').find('.panel-toggle i').toggleClass('fa-plus fa-minus');

            setPanelStates();

          });

          elements.resetPanelsLink.on('click', function(event) {

            event.preventDefault();

            delete window.localStorage[APP.Main.appId + 'PanelStates'];

            elements.panelResetModal.modal('show');

          });

          elements.sortableContainer.sortable({
            handle: '.panel-heading',
            placeholder: 'panel-placeholder',
            connectWith: '.sortable-container',
            update: function() {

              setPanelStates();

            }
          });

        }

      };

    }());


  })(jQuery, window);

});