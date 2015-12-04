

      var scope = document.querySelector('template[is="dom-bind"]');

      scope._onButtonClick = function(event) {
        var node = document.querySelector('my-dialog');
        if (node) {
          if (node.opened) {
            node.hide();
          } else {
            node.show();
          }
        }
      };

    