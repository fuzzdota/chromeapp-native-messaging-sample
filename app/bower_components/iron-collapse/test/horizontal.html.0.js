

      suite('horizontal', function() {

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
          assert.equal(collapse.horizontal, true);
        });

        test('default opened width', function(done) {
          setTimeout(function() {
            // store actual width
            width = getComputedStyle(collapse).width;
            // verify width not 0px
            assert.notEqual(width, '0px');
            done();
          }, delay);
        });

        test('set opened to false', function(done) {
          collapse.opened = false;
          setTimeout(function() {
            var h = getComputedStyle(collapse).width;
            // verify width is 0px
            assert.equal(h, '0px');
            done();
          }, delay);
        });

        test('set opened to true', function(done) {
          collapse.opened = true;
          setTimeout(function() {
            var h = getComputedStyle(collapse).width;
            // verify width
            assert.equal(h, width);
            done();
          }, delay);
        });

      });

    