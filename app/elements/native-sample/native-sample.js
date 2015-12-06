(function() {
  'use strict';
  var hostNameSpace = 'com.sample.chrome_native_golang';
  Polymer({
    is: 'native-sample',

    properties: {
      message: {
        type: String,
        value: ''
      },

      responses: {
        type: String,
        value: ''
      },

      nativePort: {
        type: Object,
        value: function() {
          return {};
        }
      }
    },

    _connect: function() {
      if (this.nativePort.constructor.name === 'Port') {
        // Make sure we disconnect previous connection
        this._disconnect();
      }
      this.nativePort = chrome.runtime.connectNative(hostNameSpace);
      this.nativePort.onDisconnect.addListener(this._onDisconnect.bind(this));
      this.nativePort.onMessage.addListener(this._onMessage.bind(this));
    },

    _send: function() {
      if (this.nativePort.constructor.name !== 'Port') {
        this.$.toast.text = "Click Connect button to begin."
        this.$.toast.open();
        return;
      }
      try {
        this.nativePort.postMessage({
          text: this.message
        });
      } catch (e) {
        this.$.toast.text = "Client has disconnected. Click Connect button to begin."
        this.$.toast.open();
      }
      this.message = '';
    },

    _disconnect: function() {
      if (this.nativePort.constructor.name !== 'Port') {
        // Port has not yet been initialized. No need to disconnect
        return;
      }
      this.nativePort.disconnect();
    },

    _onMessage: function(res) {
      console.log("Response: %O", res);
      this.responses += "Bot: " + res.Text + '\n';
    },

    _onDisconnect: function(res) {
      this.responses += '-=Disconnected=-\n';
      console.error('Error: %O', chrome.runtime.lastError);
    },

    _clear: function() {
      this.responses = '';
    }
  });
})();
