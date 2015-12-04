

  Polymer({

    is: 'x-resizer-parent',

    behaviors: [
      Polymer.IronResizableBehavior
    ],

    listeners: {
      'core-resize': 'resizeHandler'
    },

    resizeHandler: function() {
    }

  });

