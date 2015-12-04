

      var scope = document.querySelector('template[is="dom-bind"]');

      scope._onButtonClick = function(event) {
        var node = document.querySelector('my-animatable');
        if (node) {
          node.animate();
        }
      };

    