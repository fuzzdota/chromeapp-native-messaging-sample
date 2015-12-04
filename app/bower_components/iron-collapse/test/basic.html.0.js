

      suite('basic', function() {

        var collapse;
        var delay = 500;
        var collapseHeight;

        setup(function () {
          collapse = fixture('test');
        });

        test('opened attribute', function() {
          assert.equal(collapse.opened, true);
        });

        test('horizontal attribute', function() {
          assert.equal(collapse.horizontal, false);
        });

        test('default opened height', function(done) {
          setTimeout(function() {
            // store height
            collapseHeight = getComputedStyle(collapse).height;
            // verify height not 0px
            assert.notEqual(collapseHeight, '0px');
            done();
          }, delay);
        });

        test('set opened to false', function(done) {
          collapse.opened = false;
          setTimeout(function() {
            var h = getComputedStyle(collapse).height;
            // verify height is 0px
            assert.equal(h, '0px');
            done();
          }, delay);
        });

        test('set opened to true', function(done) {
          collapse.opened = true;
          setTimeout(function() {
            var h = getComputedStyle(collapse).height;
            // verify height
            assert.equal(h, collapseHeight);
            done();
          }, delay);
        });

      });

    