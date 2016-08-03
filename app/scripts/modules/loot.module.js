$(function() {

  (function($, window, undefined) {

    'use strict';

    APP.Modules.Loot = (function() {

      var elements = {
        panel:  $('.panel-loot')
      };

      return {

        init: (function() {

          console.log('Loot Module Initialized');

          /* =======================
           COMPONENT FUNCTIONALITY
           ======================= */
          $(document).on('loot', function(event, lootText) {

            var name = lootText.split(',');
                name = name[0].split('"');

            var m = new Date(),
                dateString = m.getUTCFullYear() +'/'+ (m.getUTCMonth()+1) +'/'+ m.getUTCDate() + ' ' + m.getUTCHours() + ':' + m.getUTCMinutes() + ':' + m.getUTCSeconds();

            elements.panel.find('.alert').remove();
            elements.panel.find('.loot-wrapper').show();
            elements.panel.find('.loot-history').prepend('<li></li>');

            elements.panel.find('.loot-history li:first').append('<h4>' + name[1] + '</h4>');
            elements.panel.find('.loot-history li:first').append('<strong>Time: </strong>' + dateString + '<br />');

            var loot = lootText.substr(lootText.indexOf('['));
            loot = loot.substring(1, loot.length-1);

            var lootArray = loot.split(',');

            for (var i = 0; i < lootArray.length; i++) {

              var item = lootArray[i].split('x');

              elements.panel.find('.loot-history li:first').append('<strong>'+ item[1] +': </strong>' + item[0] + '<br />');

            }

          });

        }())

      };

    }());


  })(jQuery, window);

});