

      suite('basic', function() {

        var toast;

        test('is hidden', function() {
          toast = fixture('basic');
          assert.isFalse(toast.opened, '`opened` is false');
        });

        test('is visible', function() {
          toast = fixture('show');
          assert.isTrue(toast.opened, '`opened` is true');
        });

        test('show() will update `opened`', function() {
          toast = fixture('basic');
          toast.show();
          assert.isTrue(toast.opened, '`opened` is true');
        });

        test('show() will auto-close toast after `duration` milliseconds', function(done) {
          toast = fixture('basic');
          toast.duration = 10;
          var debounceSpy = sinon.spy(toast, 'debounce');
          toast.show();
          assert.isTrue(debounceSpy.called, '`debounce` was called');
          setTimeout(function(){
            assert.isFalse(toast.opened, '`opened` is false');
            done();
          }, 12);
        });

        suite('disable auto-close', function(){
          var spy;
          setup(function(){
            toast = fixture('basic');
            spy = sinon.spy(toast, 'debounce');
          });
          test('duration = Infinity', function() {
            toast.duration = Infinity;
            toast.show();
            assert.isFalse(spy.called, '`debounce` was not called');
          });

          test('duration = 0', function() {
            toast.duration = 0;
            toast.show();
            assert.isFalse(spy.called, '`debounce` was not called');
          });

          test('duration = -10', function() {
            toast.duration = -10;
            toast.show();
            assert.isFalse(spy.called, '`debounce` was not called');
          });
        });

        test('there is only 1 toast opened', function() {
          var toast1 = fixture('basic');
          var toast2 = fixture('show');
          toast2.open();
          toast1.open();
          assert.isTrue(toast1.opened, 'toast1 is opened');
          assert.isFalse(toast2.opened, 'toast2 is not opened');
          toast2.open();
          assert.isFalse(toast1.opened, 'toast1 is now not opened');
          assert.isTrue(toast2.opened, 'toast2 is now opened');
        });

      });

    