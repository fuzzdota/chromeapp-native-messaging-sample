
    (function() {
      Polymer({
        is: 'iron-doc-viewer',

        properties: {
          /**
           * The [Hydrolysis](https://github.com/PolymerLabs/hydrolysis)-generated
           * element descriptor to display details for.
           *
           * Alternatively, the element descriptor can be provided as JSON via the text content
           * of this element.
           *
           * @type {hydrolysis.ElementDescriptor}
           */
          descriptor: {
            type: Object,
            observer: '_descriptorChanged',
          },

          /** Whether private properties should be hidden or shown. */
          _showPrivate: {
            type:     Boolean,
            value:    false,
            observer: '_showPrivateChanged',
          },

          /** The label to show for the Private API toggle. */
          _privateToggleLabel: String,

          /**
           * Broadcast when another component is clicked on
           * @param {String} detail name of the component
           * iron-doc-viewer container should load component if possible
           * @event iron-doc-viewer-component-selected
           */
        },

        ready: function() {
          var jsonDescriptor = this._loadJson();
          // Note that this is only an error during element creation. You are free
          // to stomp over the descriptor after it is ready.
          if (jsonDescriptor && this.descriptor) {
            console.error(
                this,
                'received both a bound descriptor:', this.descriptor,
                'and JSON descriptor:', this._jsonDescriptor,
                'Please provide only one');
            throw new Error(
                '<iron-doc-viewer> accepts either a bound or JSON descriptor; not both');
          }

          if (jsonDescriptor) {
            this.descriptor = jsonDescriptor;
          }
        },

        /**
         * Loads a hydrolysis element descriptor (as JSON) from the text content of
         * this element, if present.
         *
         * @return {hydrolysis.ElementDescriptor} The parsed descriptor, or `null`.
         */
        _loadJson: function() {
          var textContent = '';
          Array.prototype.forEach.call(Polymer.dom(this).childNodes, function(node) {
            textContent = textContent + node.textContent;
          });
          textContent = textContent.trim();
          if (textContent === '') return null;

          try {
            return JSON.parse(textContent);
          } catch(error) {
            console.error('Failure when parsing JSON:', textContent, error);
            throw error;
          }
        },

        /** Converts `descriptor` into our template-friendly `_model`. */
        _descriptorChanged: function() {
          if (!this.descriptor) return;

          // Split the documented properties between functions and other types.
          var properties = [];
          var methods    = [];

          for (var i = 0, property; property = this.descriptor.properties[i]; i++) {
            (property.type === 'Function' ? methods : properties).push(property);
          }
          this._properties = properties;
          this._methods    = methods;
          this._events     = this.descriptor.events || [];
          this._behaviors  = this.descriptor.behaviors || [];

          this.toggleAttribute('abstract', this.descriptor.abstract);
        },

        _collapsedChanged: function() {
          this._collapseToggleLabel = this._collapsed ? 'expand' : 'collapse';

          // Bound values aren't exposed to dom-repeat's scope.
          var properties = this.querySelectorAll('iron-doc-property');
          for (var i = 0, property; property = properties[i]; i++) {
            property.collapsed = this._collapsed;
          }
        },

        _toggleCollapsed: function() {
          this._collapsed = !this._collapsed;
        },

        _showPrivateChanged: function() {
          this._privateToggleLabel = (this._showPrivate ? 'hide' : 'show') + ' private API';
          this.toggleClass('show-private', this._showPrivate);
        },

        _togglePrivate: function() {
          this._showPrivate = !this._showPrivate;
        },

        _noneToShow: function(showPrivate, items) {
          for (var i = 0; i < items.length; i++) {
            if (showPrivate || !items[i].private) return false;
          }
          return true;
        },

        _hideBehaviors: function(behaviors) {
          return behaviors === null || behaviors.length === 0;
        },

        _broadcastBehavior: function(ev) {
          this.fire('iron-doc-viewer-component-selected', ev.target._templateInstance.item);
        }
      });
    })();
  