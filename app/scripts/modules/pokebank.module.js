$(function() {

  (function($, window, undefined) {

    'use strict';

    APP.Modules.Pokebank = (function() {

      var elements = {
        panel:  $('.panel-pokebank')
      };

      var icons = {
        pokemon: function(id){ return 'https://www.weebly.com/editor/uploads/6/6/2/8/66286027/custom_themes/748668897894441117/files/pokemon/' + id + '.png'; }
      };

      return {

        pokebank: {},

        renderPokemon: function(pokemon, id, inverse) {

			//console.log(pokemon);
			
			var popOver = '';
			if (pokemon.nickname !== undefined && pokemon.nickname.length > 0)
				popOver += '<strong>Nickname: </strong> '+ pokemon.nickname + '<br/>';
			
			popOver += '<strong>CP: </strong>'+ pokemon.cp;
			if (pokemon.maxCp !== undefined && pokemon.absMaxCp !== undefined)
				popOver += ' / ' + pokemon.maxCp + ' (' + pokemon.absMaxCp + ')';
			
			if (pokemon.individualAttack !== undefined && pokemon.individualDefense !== undefined && pokemon.individualStamina !== undefined && pokemon.stamina !== undefined) {
				popOver +=
				'<table style="margin: 5px 0;">' +
				' <thead>' +
				'  <tr>' +
				'   <th style="text-align: center; padding-right: 5px;">IV</th>' +
				'   <th style="text-align: center; padding: 0 5px;">Atk</th>' +
				'   <th style="text-align: center; padding: 0 5px;">Def</th>' +
				'   <th style="text-align: center; padding: 0 5px;">Sta</th>';
				
				if (pokemon.level !== undefined)
					popOver += '   <th style="text-align: center; padding: 0 5px;" >LVL</th>';
				
				popOver +=
				'   <th style="text-align: center; padding: 0 5px;" >HP</th>' +
				'  </tr>' +
				' </thead>' +
				' <tbody>' +
				'  <tr>' +
				'   <td style="text-align: center; padding-right: 5px;">' + pokemon.iv + '%</td>' +
				'   <td style="text-align: center; padding: 0 5px;">' + pokemon.individualAttack + '</td>' +
				'   <td style="text-align: center; padding: 0 5px;">' + pokemon.individualDefense + '</td>' +
				'   <td style="text-align: center; padding: 0 5px;">' + pokemon.individualStamina + '</td>';
				
				if (pokemon.level !== undefined)
					popOver += '   <td style="text-align: center; padding: 0 5px;">' + pokemon.level + '</td>';
				
				popOver += 
				'   <td nowrap style="text-align: center; padding: 0 5px;">' + pokemon.stamina + (pokemon.maxStamina !== undefined ? ' / ' + pokemon.maxStamina : '') + '</td>' +
				'  </tr>' +
				' </tbody>' +
				'</table>';
			} else
				popOver += '<br/> <strong>IV: </strong>'+ pokemon.iv + '<br/>';
			
			if (pokemon.move1 !== undefined && pokemon.move2 !== undefined) {
				popOver += '<span style="white-space: nowrap;"><strong>Move 1: </strong>' + pokemon.move1 + '</span><br/>';
				popOver += '<span style="white-space: nowrap;"><strong>Move 2: </strong>' + pokemon.move2 + '</span><br/>';
			}
			
			if (pokemon.candy !== undefined && pokemon.candiesToEvolve !== undefined) {
				popOver += '<strong>Candy: </strong>'+ pokemon.candy;
				if (pokemon.candiesToEvolve > 0)
					popOver += ' (' + pokemon.candiesToEvolve + '<strong> to evolve</strong>)';
				else
					popOver += ' (<strong>cannot evolve</strong>)';
			}
			
			
			
			
          var elem = $('<span id="pokemon-id-' + id + '" class="col-sm-4 col-lg-3"><img class="media-object img-thumbnail" src="'+ icons.pokemon(pokemon.pokemonId) +'" alt="'+ pokemon.name +'" /></span>').popover({
            title: pokemon.name,
            html: true,
            placement: 'top',
            content: popOver,
			trigger: 'hover'//'hover click'
          });

          if (inverse) {
            elements.panel.find('.pokemon-list').prepend(elem);
            elements.panel.find('#pokemon-id-' + id).append('<span class="badge">New</span>');
          } else {
            elements.panel.find('.pokemon-list').append(elem);
			
			if (pokemon.favorite !== undefined && pokemon.favorite)
				elements.panel.find('#pokemon-id-' + id).append('<span class="badge" style="color: yellow;"><i class="fa fa-star"></i></span>');
			
			if (pokemon.deployedFortId !== undefined && pokemon.deployedFortId.length > 0)
				elements.panel.find('#pokemon-id-' + id).append('<span class="badge" style="left: 0px; right: auto;"><i class="fa fa-fort-awesome"></i></span>');
          }
        },

        init: function() {

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

        }

      };

    }());


  })(jQuery, window);

});
