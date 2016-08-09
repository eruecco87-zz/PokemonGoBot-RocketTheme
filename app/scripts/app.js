$(function() {

  (function($, window, undefined) {

    'use strict';

    var APP = window.APP = window.APP || {};

    APP.Modules = {};

    APP.Main = (function() {

      var elements = {
        settingsContainer: $('.settings'),
        nanobarHolder: $('.nanobar-holder')[0],
        connectingModal: $('#connecting-modal'),
        startButton: $('#start-button'),
        address: $('#server-address'),
        port: $('#server-port')
      };

      window.nanobar = new Nanobar({
        target: elements.nanobarHolder
      });

      return {

        appId: 'PoGoBotRocket',

        init: (function() {

          console.log('APP Initialized');
          var modulesInitialized = false;
          elements.startButton.on('click', function() {

            var address = elements.address.val() || 'localhost',
                port = elements.port.val() || 8001;

            window.socket = io.connect('ws://' + address + ':' + port);

            elements.connectingModal.modal('show');

            elements.connectingModal.find('.modal-title').attr('class', 'modal-title text-warning');
            elements.connectingModal.find('.modal-title span').text('Connecting');
            elements.connectingModal.find('.modal-body p').html('Attempting to connect to <strong>PokemonGoBot...</strong>');

            var connectionTimeout = setTimeout(function() {

              elements.connectingModal.find('i.fa').toggleClass('fa-heartbeat fa-ban');
              elements.connectingModal.find('.modal-title').attr('class', 'modal-title text-danger');
              elements.connectingModal.find('.modal-title span').text('Connection Failed');
              elements.connectingModal.find('.modal-body p').html('Could not connect to <strong>PokemonGoBot</strong>, please check your settings and try again.');

            }, 5000);

            /* =================
             SOCKET LISTENING
             ==================== */
            socket.on('connect', function() {

              window.clearTimeout(connectionTimeout);

              elements.connectingModal.find('.modal-title').attr('class', 'modal-title text-success');
              elements.connectingModal.find('.modal-title span').text('Connection Success');
              elements.connectingModal.find('.modal-body p').html('Connected to <strong>PokemonGoBot</strong>, happy botting!');
              if(!modulesInitialized){
                $.each(APP.Modules, function(index, module) {
                  module.init();
                });  
                modulesInitialized = true;
              }
              

              setTimeout(function() {

                elements.connectingModal.modal('hide');
                elements.settingsContainer.fadeOut();
                $('body').removeClass('no-settings');

                socket.emit('init');

              }, 2000);

            });

          });

        }())

      };

    }());

  })(jQuery, window);

});
