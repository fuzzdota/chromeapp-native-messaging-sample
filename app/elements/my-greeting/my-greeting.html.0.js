
    (function() {
      'use strict';
      
      Polymer({
        is: 'my-greeting',

        properties: {
          greeting: {
            type: String,
            value: 'Welcome!',
            notify: true
          }
        }
      });
    })();
  