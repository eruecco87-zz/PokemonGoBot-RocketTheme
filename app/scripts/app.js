$(function() {

  (function($, window, undefined) {

    'use strict';

    var APP = window.APP = window.APP || {};

    window.socket = io.connect('ws://localhost:8001');

    APP.Modules = {};
    APP.ModulesTemp = {};

    APP.Main = (function() {

      var elements = {
        sortableContainer: $('.sortable-container'),
        connectingModal: $('#connecting-modal')
      };

      return {

        init: (function() {

          console.log('APP Initialized');

          elements.connectingModal.modal('show');

          var connectionTimeout = setTimeout(function() {

            elements.connectingModal.find('i.fa').toggleClass('fa-heartbeat fa-ban');
            elements.connectingModal.find('.modal-title').toggleClass('text-warning text-danger');
            elements.connectingModal.find('.modal-title span').text('Connection Failed');
            elements.connectingModal.find('.modal-body').text('Could not connect to PokemonGoBot, please check your settings and refresh this page.');

          }, 10000);

          /* =================
           SOCKET LISTENING
           ==================== */
          socket.on('connect', function() {

            window.clearTimeout(connectionTimeout);

            elements.connectingModal.find('.modal-title').toggleClass('text-warning text-success');
            elements.connectingModal.find('.modal-title span').text('Connection Success');
            elements.connectingModal.find('.modal-body').text('Connected to PokemonGoBot, happy botting!');

            setTimeout(function() {
              elements.connectingModal.modal('hide');
            }, 3000);

            socket.emit('init');

          });

          $('.panel-toggle').click(function () {

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

        }())


      };

    }());

  })(jQuery, window);

});