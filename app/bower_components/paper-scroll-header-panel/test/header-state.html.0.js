

    suite('`headerState`', function() {
      var scrollHeaderPanel, toolbar;

      setup(function() {
        scrollHeaderPanel = fixture('trivialProgress');
        toolbar = Polymer.dom(scrollHeaderPanel).querySelector('paper-toolbar');
      });

      test('HEADER_STATE_EXPANDED', function(done) {
        assert.equal(scrollHeaderPanel.headerState, Polymer.PaperScrollHeaderPanel.HEADER_STATE_EXPANDED);

        scrollHeaderPanel.scroller.scrollTop = 1;

        flush(function() {
          assert.notEqual(scrollHeaderPanel.headerState, Polymer.PaperScrollHeaderPanel.HEADER_STATE_EXPANDED);
          done();
        });
      });

      test('HEADER_STATE_HIDDEN', function(done) {
        scrollHeaderPanel.scroller.scrollTop = toolbar.offsetHeight * 2;

        flush(function() {
          assert.equal(scrollHeaderPanel.headerState, Polymer.PaperScrollHeaderPanel.HEADER_STATE_HIDDEN);
          done();
        });
      });

      test('HEADER_STATE_CONDENSED', function(done) {
        scrollHeaderPanel._prevScrollTop = toolbar.offsetHeight * 10;
        scrollHeaderPanel.scroller.scrollTop = toolbar.offsetHeight * 5;

        flush(function() {
            assert.equal(scrollHeaderPanel.headerState, Polymer.PaperScrollHeaderPanel.HEADER_STATE_CONDENSED);
            done();
        });
      });

      test('HEADER_STATE_INTERPOLATED', function(done) {
        scrollHeaderPanel.scroller.scrollTop = toolbar.offsetHeight * 0.5;

        flush(function() {
          assert.equal(scrollHeaderPanel.headerState, Polymer.PaperScrollHeaderPanel.HEADER_STATE_INTERPOLATED);
          done();
        });
      });
    });

  