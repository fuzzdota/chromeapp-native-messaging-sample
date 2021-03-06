

  Polymer({
    is: 'iron-swipeable-container',

    /**
     * Fired when a child element is swiped away.
     *
     * @event iron-swipe
     */

    properties: {
      /**
       * The style in which to swipe the card. Currently supported
       * options are `curve | horizontal`. If left unspecified, the default
       * is assumed to be `horizontal`.
       */
      swipeStyle: {
       type: String,
       value: 'horizontal'
      },

      /**
       * If true, then the container will not allow swiping.
       */
      disabled: {
        type: Boolean,
        value: false
      },

      /**
       * The ratio of the width of the element that the translation animation
       * should happen over. For example, if the `widthRatio` is 3, the
       * animation will take place on a distance 3 times the width of the
       * element being swiped.
       */
      widthRatio: {
       type: Number,
       value: 3
      },

      /**
       * The ratio of the total animation distance after which the opacity
       * transformation begins. For example, if the `widthRatio` is 1 and
       * the `opacityRate` is 0.5, then the element needs to travel half its
       * width before its opacity starts decreasing.
       */
      opacityRate: {
       type: Number,
       value: 0.2
      },

      /**
       * The CSS transition applied while swiping.
       */
      transition: {
        type: String,
        value: '300ms cubic-bezier(0.4, 0.0, 0.2, 1)'
      }
    },

    ready: function() {
      this._transitionProperty = 'opacity, transform';
      this._swipeComplete = false;
      this._direction = '';
    },

    attached: function() {
      this._nodeObserver = Polymer.dom(this.$.content).observeNodes(
          function(mutations) {
            for (var i = 0; i < mutations.addedNodes.length; i++) {
              this._addListeners(mutations.addedNodes[i]);
            }
            for (var i = 0; i < mutations.removedNodes.length; i++) {
              this._removeListeners(mutations.removedNodes[i]);
            }
          }.bind(this));
    },

    _addListeners: function(node) {
      if (node.nodeType === Node.TEXT_NODE)
        return;
      // Set up the animation.
      node.style.transitionProperty = this._transitionProperty;
      node.style.transition = this.transition;

      this.listen(node, 'track', '_onTrack');
      this.listen(node, 'transitionend', '_onTransitionEnd');
    },

    _removeListeners: function(node) {
      if (node.nodeType === Node.TEXT_NODE)
        return;
      this.unlisten(node, 'track', '_onTrack');
      this.unlisten(node, 'transitionend', '_onTransitionEnd');
    },

    detached: function() {
      if (this._nodeObserver) {
        Polymer.dom(this.$.content).unobserveNodes(this._nodeObserver);
        this._nodeObserver = null;
      }
    },

    _onTrack: function(event) {
      if (this.disabled)
        return;

      var target = event.currentTarget;
      if (target.classList.contains('disable-swipe'))
        return;

      var track = event.detail;
      if (track.state === 'start') {
        this._trackStart(track, target);
      } else if (track.state === 'track') {
        this._trackMove(track, target);
      } else if (track.state === 'end') {
        this._trackEnd(track, target);
      }
    },

    _trackStart: function(event, target) {
      // Save the width of the element, so that we don't trigger a style
      // recalc every time we need it.
      this._nodeWidth = target.offsetWidth;
      target.style.transition = 'none';
    },

    _trackMove: function(event, target) {
      this._animate(event.dx, target);
    },

    _trackEnd: function(event, target) {
      // The element is swiped away if it's moved halfway its total width.
      this._swipeComplete = Math.abs(event.dx) > this._nodeWidth / 2;
      this._direction = event.dx > 0;
      this._swipeEnd(target);
    },

    _animate: function(x, target) {
      var direction = x > 0 ? 1 : -1;

      // This is the total distance the animation will take place over.
      var totalDistance = this._nodeWidth * this.widthRatio;

      // Opacity distance overflow. `this._nodeWidth * this.opacityRate` is the
      // total distance the element needs to travel to become completely
      // transparent, and `x` is how much the element has already travelled.
      var opaqueDistance = Math.max(0, Math.abs(x) - this._nodeWidth * this.opacityRate);
      var opacity = Math.max(0, (totalDistance - opaqueDistance) / totalDistance);
      target.style.opacity = opacity;

      var translate, rotate;

      if (this.swipeStyle === 'horizontal') {
        translate = 'translate3d(' + x + 'px,' + 0 + 'px,0)';
        rotate = '';
      } else {  // Default is assumed to be `curve`.
        // Assume the element will be completely transparent at 90 degrees, so
        // figure out the rotation and vertical displacement needed to
        // achieve that.
        var y = totalDistance - Math.sqrt(totalDistance * totalDistance - opaqueDistance * opaqueDistance);
        var deg = (1 - opacity) * direction * 90;

        translate = 'translate3d(' + x + 'px,' + y + 'px,0)';
        rotate = ' rotate(' + deg + 'deg)';
      }

      this.transform(translate + rotate, target);
    },

    _swipeEnd: function(target) {
      // Restore the original transition;
      target.style.transition = this.transition;

      if (this._swipeComplete) {
        // If the element is ready to be swiped away, then translate it to the full
        // transparency distance.
        var totalDistance = this._nodeWidth * this.widthRatio;
        this._animate(this._direction ? totalDistance : -totalDistance, target);
      } else {
        this._animate(0, target);
      }
    },

    _onTransitionEnd: function(event) {
      var target = event.currentTarget;

      if (this._swipeComplete && event.propertyName === 'opacity') {
        Polymer.dom(this).removeChild(target);
        this.fire('iron-swipe',
            { direction: this._direction > 0 ? 'right' : 'left',
              target:target
            });
      }
    }

  });
