
  Polymer.ObserveIronResizeBehavior = {
    properties: {
      ironResizeCount: {
        type: Number,
        value: 0
      }
    },

    listeners: {
      'iron-resize': '_incrementIronResizeCount'
    },

    _incrementIronResizeCount: function() {
      this.ironResizeCount++;
    }
  };
