
    suite('<paper-button>', function() {
      var button;

      setup(function() {
        button = fixture('TrivialButton');
      });

      test('can be raised imperatively', function(done) {
        button.raised = true;

        expect(button.hasAttribute('raised')).to.be.eql(true);

        Polymer.Base.async(function() {
          try {
            expect(button.elevation).to.be.eql(1);
            done();
          } catch (e) {
            done(e);
          }
        }, 1);
      });

      test('can be disabled imperatively', function() {
        button.disabled = true;
        expect(button.getAttribute('aria-disabled')).to.be.eql('true');
        expect(button.hasAttribute('disabled')).to.be.eql(true);
      });

      test('can be triggered with space', function(done) {
        button.addEventListener('click', function() {
          done();
        });
        MockInteractions.pressSpace(button);
      });

      test('can be triggered with enter', function(done) {
        button.addEventListener('click', function() {
          done();
        });
        MockInteractions.pressEnter(button);
      });
    });

    suite('<paper-button>', function() {
      var button;

      setup(function() {
        button = fixture('TrivialButton');
      });

      test('has aria role "button"', function() {
        expect(button.getAttribute('role')).to.be.eql('button');
      });
      
      a11ySuite('TrivialButton');
    });

  