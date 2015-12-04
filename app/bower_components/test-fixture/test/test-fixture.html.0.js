
    (function() {
      var proto = Object.create(HTMLElement.prototype);

      proto.onDetached = function() {};

      proto.detachedCallback = function() {
        this.onDetached();
      };

      document.registerElement('x-custom', {
        prototype: proto
      });
    })();
  