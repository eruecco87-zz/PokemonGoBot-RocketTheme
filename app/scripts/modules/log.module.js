$(function() {

  (function($, window, undefined) {

    'use strict';

    APP.Modules.Log = (function() {

      var elements = {
        panel:  $('.panel-log'),
        logWrapper: $('.panel-log .log-wrapper'),
        log: $('.panel-log .log-wrapper .log')
      };

      return {

        init: function() {

          console.log('Log Module Initialized');

          APP.Utils.insertLoading(elements.panel);

          /* ================
           SOCKET LISTENING
           ================ */
          socket.on('log', function(data) {

            var shouldScroll = (elements.logWrapper.prop('scrollTop') + elements.logWrapper.height() === elements.logWrapper.prop('scrollHeight'));
            var span = $('<span class="' + data.type + '">' + data.text + '</span><br>');

            elements.log.append(span);

            if (shouldScroll) {

              elements.logWrapper.prop('scrollTop', elements.logWrapper.prop('scrollHeight'));

            }

            if (data.type === 'green' && data.text.startsWith('Looted')) {

              $(document).trigger('loot', data.text);

            }

            APP.Utils.removeLoading(elements.panel);

          });

        }

      };

    }());


  })(jQuery, window);

});