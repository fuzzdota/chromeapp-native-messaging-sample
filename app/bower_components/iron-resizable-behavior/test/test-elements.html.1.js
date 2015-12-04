

  Polymer({

    is: 'x-resizer-parent-filtered',

    active: null,

    behaviors: [
      Polymer.IronResizableBehavior
    ],

    listeners: {
      'core-resize': 'resizeHandler'
    },

    resizeHandler: function() {
    },

    resizerShouldNotify: function(el) {
      return (el == this.active);
    }

  });

