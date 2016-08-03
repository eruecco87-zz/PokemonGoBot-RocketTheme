$(function() {

  (function($, window, undefined) {

    'use strict';

    APP.Modules.Pokebank = (function() {

      var elements = {
        panel:  $('.panel-pokebank')
      };

      var icons = {
        pokemon: function(id){ return 'http://pokeapi.co/media/sprites/pokemon/' + id + '.png'; }
      };

      return {

        pokebank: {},

        renderPokemon: function(pokemon, id, inverse) {

          var popOver = '<p><strong>CP: </strong>'+ pokemon.cp +' <br/> <strong>IV: </strong>'+ pokemon.iv +' <br/> <strong>Stats: </strong>'+ pokemon.stats +'</p>';

          var elem = $('<span id="pokemon-id-' + id + '" class="col-sm-4 col-lg-3"><img class="media-object img-thumbnail" src="'+ icons.pokemon(pokemon.pokemonId) +'" alt="'+ pokemon.name +'" /></span>').popover({
            title: pokemon.name,
            html: true,
            placement: 'top',
            content: popOver,
            trigger: 'hover'
          });

          if (inverse) {

            elements.panel.find('.pokemon-list').prepend(elem);
            elements.panel.find('#pokemon-id-' + id ).append('<span class="badge">New</span>')

          } else {

            elements.panel.find('.pokemon-list').append(elem);

          }

        },

        init: (function() {

          console.log('Pokebank Module Initialized');

          APP.Utils.insertLoading(elements.panel);

          /* ================
           SOCKET LISTENING
           ================ */
          socket.on('pokebank', function(data) {

            data.pokemon.sort(function(a, b){
              return b.cp - a.cp;
            });

            for (var i = 0; i < data.pokemon.length; i++) {

              var pokemon = data.pokemon[i];
              var id = String(pokemon.id);

              APP.Modules.Pokebank.pokebank[id] = {
                pokemonId: pokemon.pokemonId,
                name: pokemon.name,
                cp: pokemon.cp,
                iv: pokemon.iv,
                stats: pokemon.stats
              };

              APP.Modules.Pokebank.renderPokemon(pokemon, id);

            }

            APP.Utils.removeLoading(elements.panel);

          });

          socket.on('newPokemon', function(data) {

            var id = String(data.id);

            APP.Modules.Pokebank.pokebank[id] = {
              pokemonId: data.pokemonId,
              name: data.name,
              cp: data.cp,
              iv: data.iv,
              stats: data.stats
            };

            APP.Modules.Pokebank.renderPokemon(data, id, true);

          });

          socket.on('releasePokemon', function(data) {

            var id = String(data.id);

            if (typeof APP.Modules.Pokebank.pokebank[id] !== 'undefined') {

              APP.Modules.Pokebank.pokebank[id] = undefined;
              delete APP.Modules.Pokebank.pokebank[id];
              $('#pokemon-id-' + id).remove();

            }

          });

        }())

      };

    }());


  })(jQuery, window);

});