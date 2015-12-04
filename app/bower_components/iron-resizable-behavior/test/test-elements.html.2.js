

  Polymer({

    is: 'x-resizable',

    behaviors: [
      Polymer.IronResizableBehavior
    ],

    listeners: {
      'core-resize': 'resizeHandler'
    },

    resizeHandler: function() {
    }

  });

