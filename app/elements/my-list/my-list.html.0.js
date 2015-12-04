
    (function () {
      'use strict';

      Polymer({
        is: 'my-list',
        properties: {
          items: {
            type: Array,
            notify: true,
          }
        },
        ready: function() {
          this.items = [
            'Responsive Web App boilerplate',
            'Iron Elements and Paper Elements',
            'End-to-end Build Tooling (including Vulcanize)',
            'Unit testing with Web Component Tester',
            'Routing with Page.js',
            'Offline support with the Platinum Service Worker Elements'
          ];
        }
      });
    })();
  