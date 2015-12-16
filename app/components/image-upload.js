import Ember from 'ember';

export default Ember.Component.extend({
  file_input: null,

  setup: function() {
    var input = Ember.$('.js-image-upload')[0],
      handler = this.get('file_input_change_handler');
    input.addEventListener("change", handler);
    this.set('file_input', input);
  }.on('didInsertElement'),

  file_input_change_handler: function() {
    var component = this;
    return function () {
      var input = this;
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          component.sendAction('action', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
      }
    };
  }.property()
});
