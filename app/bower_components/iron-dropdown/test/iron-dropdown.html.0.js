
    function elementIsVisible(element) {
      var contentRect = element.getBoundingClientRect();
      var computedStyle = window.getComputedStyle(element);

      return computedStyle.display !== 'none' &&
        contentRect.width > 0 &&
        contentRect.height > 0;
    }

    suite('<iron-dropdown>', function() {
      var dropdown;
      var content;

      suite('basic', function() {
        setup(function() {
          dropdown = fixture('TrivialDropdown');
          content = Polymer.dom(dropdown).querySelector('.dropdown-content');
        });

        test('effectively hides the dropdown content', function() {
          expect(elementIsVisible(content)).to.be.equal(false);
        });

        test('shows dropdown content when opened', function(done) {
          dropdown.open();

          Polymer.Base.async(function() {
            expect(elementIsVisible(content)).to.be.equal(true);
            done();
          });
        });

        test('hides dropdown content when outside is clicked', function(done) {
          dropdown.open();

          Polymer.Base.async(function() {
            expect(elementIsVisible(content)).to.be.equal(true);

            MockInteractions.downAndUp(document.body, function() {

              Polymer.Base.async(function() {
                expect(elementIsVisible(content)).to.be.equal(false);
                done();
              }, 100);
            });
          });
        });

        suite('when content is focusable', function() {
          setup(function() {
            dropdown = fixture('FocusableContentDropdown');
            content = Polymer.dom(dropdown).querySelector('.dropdown-content');
          });
          test('focuses the content when opened', function(done) {
            dropdown.open();

            Polymer.Base.async(function() {
              expect(document.activeElement).to.be.equal(content);
              done();
            });
          });

          test('focuses a configured focus target', function(done) {
            var focusableChild = Polymer.dom(content).querySelector('div[tabindex]');
            dropdown.focusTarget = focusableChild;

            dropdown.open();

            Polymer.Base.async(function() {
              expect(document.activeElement).to.not.be.equal(content);
              expect(document.activeElement).to.be.equal(focusableChild);
              done();
            });
          });
        });
      });

      suite('locking scroll', function() {
        var dropdown;

        setup(function() {
          dropdown = fixture('NonLockingDropdown');
        });

        test('can be disabled with `allowOutsideScroll`', function() {
          dropdown.open();

          expect(Polymer.IronDropdownScrollManager.elementIsScrollLocked(document.body))
            .to.be.equal(false);
        });
      });

      suite('aligned dropdown', function() {
        var parent;
        setup(function() {
          parent = fixture('AlignedDropdown');
          dropdown = parent.querySelector('iron-dropdown');
        });

        test('can be re-aligned to the right and the top', function(done) {
          var parentRect;
          var dropdownRect;

          dropdown.opened = true;

          Polymer.Base.async(function() {
            dropdownRect = dropdown.getBoundingClientRect();
            parentRect = parent.getBoundingClientRect();

            // NOTE(cdata): IE10 / 11 have minor rounding errors in this case,
            // so we assert with `closeTo` and a tight threshold:
            expect(dropdownRect.top).to.be.closeTo(parentRect.top, 0.1);
            expect(dropdownRect.right).to.be.closeTo(parentRect.right, 0.1);
            done();
          }, 1);
        });

        test('can be re-aligned to the bottom', function(done) {
          var parentRect;
          var dropdownRect;

          dropdown.verticalAlign = 'bottom';
          dropdown.opened = true;

          Polymer.Base.async(function() {
            parentRect = parent.getBoundingClientRect();
            dropdownRect = dropdown.getBoundingClientRect();

            // NOTE(cdata): IE10 / 11 have minor rounding errors in this case,
            // so we assert with `closeTo` and a tight threshold:
            expect(dropdownRect.bottom).to.be.closeTo(parentRect.bottom, 0.1);
            expect(dropdownRect.right).to.be.closeTo(parentRect.right, 0.1);
            done();
          }, 1);
        });

        suite('with an offset', function() {
          test('is offset by the offset value when open', function() {
            var dropdownRect;
            var offsetDropdownRect;

            dropdown.opened = true;

            Polymer.Base.async(function() {
              dropdownRect = dropdown.getBoundingClientRect();

              dropdownRect.verticalOffset = 10;
              dropdownRect.horizontalOffset = -10;

              offsetDropdownRect = dropdown.getBoundingClientRect();

              expect(dropdownRect.top).to.be.equal(offsetDropdownRect.top - 10);
              expect(dropdownRect.left).to.be.equal(offsetDropdownRect.left + 10);
            }, 1);
          });
        });

      });
    });
  