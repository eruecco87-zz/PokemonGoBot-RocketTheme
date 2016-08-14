$(function() {

  (function($, window, undefined) {

    'use strict';

    APP.Modules.Notifications = (function() {

      var settings = {
        caughtPokemon: true,
        caughtPokemonWithIV: false,
        nextLevel: true
      };

      var elements = {
        panel:  $('.panel-notifications'),
        ivMax: $('#iv-max')
      };

      var icons = {
        pokemon: function(id){ return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + id + '.png'; },
        ivMax: 'data:image/png;base64,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'
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

            if (settings.caughtPokemonWithIV && data.iv >= elements.ivMax.val()) {

              APP.Modules.Notifications.sendDesktopNotification('Caught \'' + data.name + '\' with IV of ' + data.iv + '', {
                icon: icons.ivMax,
                lang: 'en'
                }, 2500);

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