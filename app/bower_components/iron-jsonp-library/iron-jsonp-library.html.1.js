
  Polymer({

    is: 'iron-jsonp-library',

    behaviors: [ Polymer.IronJsonpLibraryBehavior ],

    properties: {
      /**
       * Library url. Must contain string `%%callback%%`.
       *
       * `%%callback%%` is a placeholder for jsonp wrapper function name
       *
       * Ex: https://maps.googleapis.com/maps/api/js?callback=%%callback%%
       */
      libraryUrl: String,
      /**
       * Set if library requires specific callback name.
       * Name will be automatically generated if not set.
       */
      callbackName: String,
      /**
       * event with name specified in 'notifyEvent' attribute
       * will fire upon successful load
       */
      notifyEvent: String
      /**
       * event with name specified in 'notifyEvent' attribute
       * will fire upon successful load
       * @event `notifyEvent`
       */

    }
  });

