$(function() {

  (function($, window, undefined) {

    'use strict';

    var elements = {
      panels: {
        log: $('.panel-log')
      }
    };

    APP.ModulesTemp = {

      Log: (function() {

        init: (function() {

          console.log('Log Module Initialized');

          APP.Utils.insertLoading(elements.panels.log);

          /* ================
           SOCKET LISTENING
           ================ */
          socket.on('log', function(data) {

            var logWrapper = elements.panels.log.find('.log-wrapper');
            var shouldScroll = (logWrapper.prop('scrollTop') + logWrapper.height() === logWrapper.prop('scrollHeight'));
            var span = $('<span class="' + data.type + '">' + data.text + '</span><br>');

            logWrapper.find('.log').append(span);

            if (shouldScroll) {

              logWrapper.prop('scrollTop', logWrapper.prop('scrollHeight'));

            }

            if (data.type === 'green' && data.text.startsWith('Looted')) {

              $(document).trigger('loot', data.text);

            }

            APP.Utils.removeLoading(elements.panels.log);

          });

        }())

      }())

    };

  })(jQuery, window);

});