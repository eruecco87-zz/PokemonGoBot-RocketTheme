$(function() {

  (function($, window, undefined) {

    'use strict';

    APP.Modules.Profile = (function() {

      var elements = {
        panel:  $('.panel-profile'),
        profile: {
          name: $('#profile-name'),
          team: $('#profile-team'),
          stardust: $('#profile-stardust'),
          level: $('#profile-level'),
          levelProgress: $('#profile-level-progress'),
          pokebank: $('#profile-pokebank'),
          pokebankProgress: $('#profile-pokebank-progress'),
          items: $('#profile-items'),
          itemsProgress: $('#profile-items-progress')
        }
      };

      return {

        currentLevel: undefined,

        init: function() {

          console.log('Profile Module Initialized');

          APP.Utils.insertLoading(elements.panel);

          /* ================
           SOCKET LISTENING
           ================ */
          socket.on('profile', function(data){

            if (typeof data.username !== 'undefined') {

              elements.profile.name.text(data.username);
              $('title').text(data.username + ' - Pokemon Go Bot GUI');

            }

            if (typeof data.team !== 'undefined') {

              data.team && elements.profile.team.text(data.team);
              data.team && elements.profile.team.parent().addClass(data.team);

            }

            if (typeof data.stardust !== 'undefined') {

              elements.profile.stardust.text(data.stardust);

            }

            if (typeof data.level !== 'undefined' && typeof data.levelXp !== 'undefined') {

              APP.Modules.Profile.currentLevel = data.level;
              elements.profile.level.text(data.level + ' (' + data.levelXp + ' XP)');

            }

            if (typeof data.levelRatio !== 'undefined') {

              elements.profile.levelProgress.css('width', data.levelRatio + '%');

            }

            if (typeof data.pokebank !== 'undefined' && typeof data.pokebankMax !== 'undefined') {

              elements.profile.pokebank.text(data.pokebank + ' / ' + data.pokebankMax);
              elements.profile.pokebankProgress.css('width', ~~(data.pokebank / data.pokebankMax * 100) + '%');

            }

            if (typeof data.items !== 'undefined' && typeof data.itemsMax !== 'undefined') {

              elements.profile.items.text(data.items + ' / ' + data.itemsMax);
              elements.profile.itemsProgress.css('width', ~~(data.items / data.itemsMax * 100) + '%');

            }

            APP.Utils.removeLoading(elements.panel);

          });

        }

      };

    }());


  })(jQuery, window);

});