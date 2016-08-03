$(function() {

  (function($, window, undefined) {

    'use strict';

    APP.Modules.Notifications = (function() {

      var settings = {
        caughtPokemon: true,
        nextLevel: true
      };

      var elements = {
        panel:  $('.panel-notifications')
      };

      var icons = {
        pokemon: function(id){ return 'http://pokeapi.co/media/sprites/pokemon/' + id + '.png'; }
      };

      return {

        sendDesktopNotification: function(title, options, duration) {

          if (Notification.permission === 'granted') {

            var notification = new Notification(title, options);

            if (typeof duration !== 'undefined') {

              setTimeout(function(){
                notification.close();
              }, duration);

            }

          }

        },

        init: function() {

          console.log('Notifications Module Initialized');

          if (!('Notification' in window)) {

            alert('This browser does not support notifications');

          } else {

            if (Notification.permission !== 'granted') {

              Notification.requestPermission(function(){});

            }
          }

          /* =======================
           COMPONENT FUNCTIONALITY
           ======================= */
          $('.notification_check').on('click', function() {

            var type = $(this).attr('id');
            settings[type] = $(this).prop('checked');

          });

          /* ================
           SOCKET LISTENING
           ================ */
          socket.on('newPokemon', function(data) {

            if (settings.caughtPokemon) {

              APP.Modules.Notifications.sendDesktopNotification('Caught \'' + data.name + '\' with CP ' + data.cp + '', {
                icon: icons.pokemon(data.pokemonId),
                lang: 'en'
              }, 1500);

            }

          });

          socket.on('profile', function(data){

            if (typeof data.level !== 'undefined' && typeof data.levelXp !== 'undefined') {

              if (typeof APP.Modules.Profile.currentLevel !== 'undefined' && data.level > APP.Modules.Profile.currentLevel) {

                if (settings.nextLevel) {

                  APP.Modules.Notifications.sendDesktopNotification('You are now on level ' + data.level + '!', {
                    icon: icons.trainer,
                    lang: 'en'
                  }, 5000);

                }

              }

            }

          });

        }

      };

    }());


  })(jQuery, window);

});