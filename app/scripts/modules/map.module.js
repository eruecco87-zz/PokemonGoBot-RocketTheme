$(function() {

  (function($, window, undefined) {

    'use strict';

    APP.Modules.Map = (function() {

      var settings = {
        autofollow: true
      };

      var elements = {
        panel:  $('.panel-map')
      };

      var icons = {
        trainer: 'data:image/png;base64,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',
        pokemon: function(id){ return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + id + '.png'; },
        pokestop: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAUW0lEQVR42u1dCXwU5RXPRhBEwRtFEQE5w5nN7uzM7IYIckpAbhCQEAwSjoDhSDTcBLTV1tZbq1ZbtbVqraXeta0iaqW1l1rvqnjf4MUh4et7387uvJmdmZ2dbEh293u/3/czht3N7Pfe9737//LyBAkSJEiQoNyjoqJwF0mSOoudyEnmy+HCgHwA1vfwsyR2JMfIHwyXFUkqiy7lXLEjOXcDFLUuCqqri4LKRSUlJa3EjuQm+bQlKCuveX9xp0AgPAau+Rp/UL0B/vuIX5L/WSgpO/2S8iVc/QcLJXV/YVBVxG5lxbVeckJhQJ1dJMm3w/X+tq7jk6wi5Q6xexlKqqq2h9NdAYx8HFaDS6bvgxvgm9j/+6XwxWInM4wCAbV39FrXGWlaB4sC6r/9AeVmuA2q/EFlVDAY6VVQUnIU6n1QBRfqrw0vETuaKXpdlgcA0+6zZrr8Cej3m/xBeSJY+Uc7fo4QgMyiQlU9xR9Qf8FPNmE6D+RI6t14wlNx54QAZAhNnTr1MH9IWWZx1e8CH/4SFAxPN4kQgEzQ85Hufkl92nji1e+A8VsGRCLHNkqVCAFo4S4dhGeLgvLXlPlg9N2DCZy02BJCAFomoR4HfX6F6dR/BAIxofFxgqJ2gYDSvygUHuEPhW4hxuPP8HeDpUgBvkZwoZkIXTRg9gMG5gflBwcqSkcvtgNm/NDHB+HZWijJH7gODAXl98GTuB/zBFqUMF9wp4kJdXphUPmr4cqX1HUpbr4PPmMI9/3BJXTN8CSL30BB9UYUqDyRO2gi5kvqP4hrtwdO7ZQU1EZbYPqiooDykh0T/XIJKxg+m/UYv4p1mfEjdurs61nXyfWs65Qt8PN1rMv0y/m/FQyfBa8dYi8MQfU/4JVcUFBQcLjgXBoIQ7nA/OfI9fs1nmKXOh1TupUQ8XsvgeGhCOt19hJ20rxfsSNXvcR89ftZ3iXM1crfvA/e8yK8907W++xF/LMS1YT6NoagUdUILno3ylpjho6c/K9gs0OuAkOgm/E0mhlTMHwO61hxL2u1cbdrhidbrdbvgs/8Db8dEgQhoPwdniMguOkluicp11H/HnR+cbL39Ogxug2cvp+YI4J4UjtcuIPlbTmYNsYnLPjsDsueZb1HL0jIO8Cz/wAFWnDVbZBHUuYZEjcu3DwMDOGJo5vff+g0dvSyp5uO6TaCcEzVNtb/zMmm20B+tlBRThfcTULob0cNvZg+VWqTqwss4lQ/j78nFOaGXCq6Pd0rv34v6zzzGv4suhCoH0OsISi4bOfrg/UMJ+Vf5OTcl8y14tk9Sd4be8/AIePZUSv+5eHkwtoEax2sNbBWw6rTfl6v/ZsHQWi//Hl4pnHMqM6UsYLblsxU1sYt9YD6rizLxyUJCU/A8u3Ye/qMqmCt133mjjkbYdXCWgqrEtY8F+t87bXLtPdudCcEh6/9mPUdUa4LAZSaYTma4Di9+kOhnliNQ67xEY7CIqkjcSNjr+8xbgW/dh2Zgad4ZQoMd7Mqtc9MckPkb9rDepYuo/UJewMBuURwXj/NW0kt/m2OHkIo1Beu0t2x159xTq2zvl8La4l2guc14arSVIhDDKHHuOVUHXyOxqtw+SC4QzZlt1N8H6t5wJh6Le7ijVnIN9Zy01F3L25iplstFLYNdsbhHq6q9JC2/OLAgSOOzGX++8Dw20YMvxpnO0H9JXXzLIM6m2FVNwPjzfZCtfYsCcGjL9kA4iaCUXh97l79oXCEGEcfOqVcoxa/Hr9vV/Oq9XV/QTMzn64F1moBQ9A0r5CzngEt4oRNWGnrImI6GAVEey2GXxOYX9OCGG++DWoShQDzCbrwy++A13NETjF/kCyfGq/Xxwofh2pdEI7N1N3zbWkw+vDVLZT5dFUbBcC35YDBPYSg15rcOv3whfUToFznJCjx6CBE1o6ofd3I/KXpY1J++T7Wdtbb7MgZL/CFP+Pv0iYES7Vn1p6/Xc3LxDWE4lboYMoh40/9r67TZb+DoFwWe123yRvSzvw2s3eyU0pvYn1L4DRapHf9UgT+bR685mZ47XuNF4Jlxpug+8Q19BbYkBsJH6y/042/l+1CvqgW4j4/MKfN6nf1zWvktd921k7WfXhdilVAYdZ9xBoQhHcbJwTLdQFoe/Fb8ZwBxgZywi3EmjpS3lVvbyTKC2jAJ8782sYw/yA7afydUMxRYpHDV98De+MhbDTRmk0exjpAqyqijuf8hn+W5+e4SBcCU4BodvbH/SX1CdKAKTsEiZ6Kva5D9Q49wOMxqucr38+6jVhvruvbDWVjP8QIo81N5AsGw/2g1uByLEyh7+06qh4+84B370ALGGHamhS/PJrVzOeFG3oGb5dd6RTW+etZvnGg8xuien+BR+bPa4Arf7Xp1Cu3pWJ4YZQS3nMH/YxuI8EuKW/wnkvYEvUIBhWPiX1mg5dq5ww6/WGZ+P4POUT9KmKvw2JNfvpXer/60dAjp+wAFp7YGaiAENZBc0t9Dqop3nLeqfRW76pgZfQWOH3apaTRRZ6ZxWlfdSHR/+sdXvfr2Ov6DZvOeo1ZzHoN9bZ6D13EDTjSSTTLzHSMxvGaf+wt1LN2X4KK+J2WvjUIg6FyCQxU/Btenw+/W/+h0+nNdGsW3wDK9eSLTrA1AAPqW+mq3ze6dcqP6d8JhUInga3xmIv3Pjx4cOREo5AqVzfFM0Jk8I1szv49RiBY+tjfAOnfXMQBoiFXxArCzTa8LjKMBSaVs74jy1mhMszsJbwWDAZPjtsE4LJZVSCnQUivyl4XkKRzk8W/0UDDDU/XogYn/gwxiO2xZwmUjGLBK/7ApG37WPBpPYd/wgX3s8HhkbQr6Yk80pWEn5POZ4R1fJbHAKKdvbD5nzVrMEpSzoufumFjmHT/O0x6hvEVEwAarBkUHh0XgkBImZEnyKsLGNdzrzTvTSQ/G3uW4A1/iTPfSgBwHbfoUXpNPym46YHweiNX6Q7r16iDzb3+iP8zKBTqSn+HrhqvDQzKo5MtDD2bQ8zxBpJRE5i0vSGpAGAGklT4NphDtoOl8CA3z4LPrAFSkdB4pLv5GfH7QnBqoNUeYas81hRmnLpAo0tvplSesvCv58SaQGP1coGQOjkG4YYIYOS1f0vJsg4qZxmELHadV9QZmG8nALjOGF+jqwHCMA10MgUjT32aCneswLUwEB7HhYkXyUaDZVbqJm4gI+ZhJnUd8eSO9mUR1cMiR7BG9xCiSN0UsYM2h0bBIVKxruU5uieiBuKMrFzvWgC6T9AjiShEJGYxPzU3T9mpC488nMQnFmrPpxBhWeWkvjIuashROKDAwwrECUvC4AvXoYFmsBugQ6gwpJTTYAx22aBPD6fgp0mXpFZTpDD823GGTCxzLQD9zppJUET1EDKeQjiVK9w8Cz6zKf3tw6gnVkSR1nL83VwNsLptgitNWuaTwd4Jsgn3ghH6Zvw03/t6UgHAOr6WY8DqrrRoPPUcktY7kYqmnM+kJ/faCgA2dvQdOZcWblzUrME0rRcSs5OCkx6JJ3xorn/6AiZtfS9BANrW7TTU8qP+NlvxzehKv5m9ASOAgwNj6HneMJquBTl9akcg7oCxJQ1KwuYuZ4GLr+cdxj1LLzShgGBLl6JSVcJ1ezqfkbe5K1PtXelILxKa/lMWRwxTgHVPYVEDMyoEyjA41Z8mfS9v7zb280GG8fwmSga94qC6SsltdFPWCgBWxjTJ5oLeNAddMMsHlvWVxlSwnhJGfEJz0AXdQHjPt02SsYS0tK0AcHi72OuUpVl8Ayi1sS96ynk38sRM/pJ9vEw79bWX9Ri2gp6wD7DMy/w3OUYBxB/wCobhUdPQ1bSysjHqhzdCvF7xrBr+Nzw9W9U+/t1OnXUtBZqqclCNvyVd1Gdmr5UOvjIFeIq3eFd4q7xpVbab9SuebqgF1KaCpYLv54tGK3WA6n7FM9lhZV97qwbC71IfizGcqz9btD7R+u9rgodVTdleQeyjuXrMyHEhuNh7Wdjh533M+kemm3X7n7QwsRPwZD7G8Gkxa4z5red86r0crC7KfGx2IWXyL9g9BC2nx1B41rtq2CgR+8KnzbhC982XeReCVmW7WM9h1ZbhWSzFwqgh3gxYlwdX8XJeOGqBN9jjrFVw8r9KS6tYl2mXMTe4SBgWJkUjm3PAVy/uFiu+HKwOZ4dt/FrvClrYuN6AEyZuZYOUsSkbaAPVcez4iQ81ridgsd4idtjGr+KVRzjkAlvhbA1jAplrckez+BaAqR9xY3DOzUbIlwWN7AWcu4edOOF3rM+Z85N2BPUeWsmFBo29RsPK1OunH+MNBBvpF0kOQ7yBJS9XgKpp5g5vAUTnTKcQxFXDnF3s6KnPQsfP3bwPsFPpLfDzPawD/A7VRtrwAgjzEdSK1h1iath2HyR1E3H/rsixuL18b7wbB0CcE8CfFmZAe/hCI/NxdZu0gcYbbre9BRE6l9gh5jhG1hNHAiUhW8TfS4CFWdKCmV9lbAvH1eHC5wz4gYFA8Wm235/WL0ryMzmZvKEewYCSCazVhl2JYI8rDwEaWKprVSLzW63/wgAg6TSgkg+4IHD3WCGVmwIA1yBPDsWxAVdG+wWt0MEqWwDjK7VnuSQRGaTnWANm4DNOY+24O6q7fq/mNAw9n91DonCdZ15lD/1a4z1q2KhVYY0JFAOTxgEUNBqJ9X923xf7JoxJMR65zG2CwslJ1EXDwQ+2IJFoG6w4RIJQoamgzfZgkZ3KbjNByTujg+FoHBIh/IcYQqGnRNdSITi5/A5nmNjNGqjEwjTbCPhZi7Tw9GZnGPlOZT83VwavclZ5Sh9q+LqZmZBL5OMFoWRDO8+82oge5oQZHAOKnu+B6fO199a6QxFHnY9hbONYGWVLcnuHDspyhs/NWSHQcviMGoYYWk0J1r1eg4Wv1a7w5Vqcvlr7eaUG57Imddh49FSwqsjE/MuSZSApLB5m/7K+X7AxQkDrBmIuYvvqvzfbsAjdz/+rwdXTOpGqXai3UkMFk4CWd2MThKeZx8lixBD97UPNeAzvdp28KRGHCKBuk30PLFKhSOhmLANBTi4iuFOGhgnMHUBbd6eyW/UsYhMuVD2YrMJ8hcnY2+EGFp4jpxKXD2sPUhl7LyhPK+kKqqsNc4c0QcAZPm3r3kk747FQpfO5VyYwnk8zB/RzN40bWJNIgTPhO7yeS6ih6VcJfvUMmkCiq8+o+ezkub9kR1z0hnUkMel8oQbWrvY17tPTfgET+thd5m5m27gGtqnRyaZg9DkFhwSllERSChHkiSJ6mW8GHOWCJ7hjxT185BsakNgGhgt/PqbqSdbx/LvZafCaXmOrEk46RR7DhlenlK6Vrw8Yhf+jFchYcCo4l/Y8QrgLIpIiLHvaS7iRgZCocqrksRZO6AoOyF8Q5n9CO44FNZHbyLEBgGFwYv9M8wopjJBHb+NxDNNqAA4pTQ3HcC52QNNbCYWIYh8IOkSEVja6XpBiHc+LQREOVlK2k4mf2/B3MBV8GYI3YDKqMfF4vImigmdoPHkmq5FBM86AJIAUUAu4JF2Chl08FjfOtWLcfHYLgC+KCyS/aJol/AVmNcVuZ68AAMKHMoriEBIX8bdW6CiCskAAEK4FcX4s0UMB1QPj/GKHs0wAMFOnlW3dRwdZE6/hfbDyFwldnwUCgEyMeg3KDKzN16DqGux6/BE9zArkSVALpsHB0Ip4KhaKUMGIexCLM3CieRxc0nahlQ8DJaJt2/liNzPxBgiqv0oxMPQ+vOcWXqvoMPlUUIYQBGqutL7S1f3Yrs6RS/j8IHU29uvlpRgJFNTSBQAAKfVqHLkOQZnQ0BMVuTlC0ZoCZQOvPBYgjIIE5ZoXwEvLAC0EZha5LeoQlF1ewEKCKThP7EiOEdbigYX/APjzWwdEIseKHREkKAfJJ/z73KR81PuIJMoniQfDZXkipJsrul8OR5G6E+b77MARLmKHspQQm8dd/F+5A2YMdBY7ljUnns8nWqd18OjNpeHJ7Ngpf2bHLf4jbzQ15QO+xQhhsomnglq4gYfNpOYegUJ5GOs07jYdCBJHxdTvYZ3m3AJYfkNNGUDs4eNDHYShmFnXvVLIS71N13vXkZsA9PkTIxAEaQc7fM1HrNvEdRZDJORt+JliZ1s4Yd09TtcwF3T0ObOCHTnjRWskEIu+wKNW/Jv1HVFuFgT4TPlnora/BRJm9nCeH+2554DPYQB8nvQwyytvsIeCcWgOPaHyD2xgcakFBoCyQtT+tRQ9Dwhchvl6HIu3hJ069gYAif4uORZQMjyATd/wKR9+eYhd9a+wD5qDcNoGMOJhs77uPryOtZn9gXswKJft4m1Wv8vOOKfWynV8xGHyh6B0EyZucIQbtmlTRhQUn8faT38+dTSwlDGBdsBom1kJLeMIZCWSSofi5Evqc3TzBylj+CwAX/kBbxiAHtBCEBLuxPn3skHh0eb4wXbBoSYXAH0WMK6+Q8rYUTP+4x0E0iNkDHoKOOTK7RxAQenz8ftD/f5TZl3cbeQGPiyqqQUAYwXdJ61lFrmEJ7CtXHDoEFn/4I5Njw6AMkX5Sm9NbdyLS8ZjtBDRwWyihVOEN9AMZB/nn8Tj/K4GPiUFizpomy9ApDKRL2gRasE609dr6GLWbuZrngWgXc0rrPeYSgvXT749VawgQYfiRgiFI3TYRGxSeJfRl8GwqC9dCwCigJ4+5RIc2SpqBjKQeLUPnfnLoeKUkTAd7C5wF7+3FQBf/X6YS3BnIhikpH4oqoYyjKCoowMidmOvn3EM7Ll8RJxBAEDPH710O+s/dJr5ut8H779UVdX2YkczlLABBGL2v08cCbuStZ21k0PAJkC9R9d9brB/BWUI4VBoA1Qr6vTQEFgR83X/gjZkWlAWuo2twXWrQqjWRAhY9XOEeBHI3TlA2AYOgnANwr5w7F9JuQr8+ePEzuTcjRDuIiqABQkSJEhQjtL/AR0qZnhX2+1TAAAAAElFTkSuQmCC',
        goto: 'data:image/png;base64,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',
      };

      var polyLine = new google.maps.Polyline({
        path: [],
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: map
      });

      return {

        positionMarker: new google.maps.Marker({
          position: {
            lat: 0,
            lng: 0
          },
          icon: {
            url: icons.trainer,
            scaledSize: new google.maps.Size(45, 45)
          },
          map: map
        }),

        pokestopMarkers: {},

        caughtPokemonMarkers: [],

        gotoMarkers: [],

        init: function() {

          console.log('Map Module Initialized');

          APP.Utils.insertLoading(elements.panel);

          /* =======================
           COMPONENT FUNCTIONALITY
           ======================= */
          $('#map_autofollow').on('click', function() {

            settings.autofollow = $(this).prop('checked');

          });

          google.maps.event.addListener(map, 'rightclick', function(event) {

            var lat = event.latLng.lat();
            var lng = event.latLng.lng();

            socket.emit('goto', {
              lat: lat,
              lng: lng
            });

            var marker = new google.maps.Marker({
              position: {
                lat: lat,
                lng: lng
              },
              icon: {
                url: icons.goto,
                scaledSize: new google.maps.Size(35, 35)
              },
              map: map
            });

            APP.Modules.Map.gotoMarkers.push(marker);

          });

          /* =================
            SOCKET LISTENING
           ==================== */
          socket.on('newLocation', function(data) {

            APP.Modules.Map.positionMarker.setPosition( new google.maps.LatLng( data.lat, data.lng ) );

            var path = polyLine.getPath();
            path.push(new google.maps.LatLng(data.lat, data.lng));
            polyLine.setPath(path);

            if (settings.autofollow) {

              map.panTo(new google.maps.LatLng(data.lat, data.lng));

            }

            APP.Utils.removeLoading(elements.panel);

          });

          socket.on('pokestop', function(data) {

            var id = data.id;

            if (typeof data[id] === 'undefined' && typeof map !== 'undefined') {

              APP.Modules.Map.pokestopMarkers[id] = new google.maps.Marker({
                position: {
                  lat: data.lat,
                  lng: data.lng
                },
                map: map,
                icon: {
                  url: icons.pokestop,
                  scaledSize: new google.maps.Size(40 , 40)
                },
                title: data.name
              });

            }

          });

          socket.on('newPokemon', function(data) {

            var marker = new google.maps.Marker({
              position: {
                lat: data.lat,
                lng: data.lng
              },
              icon: {
                url: icons.pokemon(data.pokemonId),
                scaledSize: new google.maps.Size(70 , 70)
              },
              map: map,
              title: data.name + ' with CP ' + data.cp
            });

            APP.Modules.Map.caughtPokemonMarkers.push(marker);

          });

          socket.on('gotoDone', function(data) {

            APP.Modules.Map.gotoMarkers[0].setMap(null);
            APP.Modules.Map.gotoMarkers.shift();

          });

        }

      };

    }());


  })(jQuery, window);

});
