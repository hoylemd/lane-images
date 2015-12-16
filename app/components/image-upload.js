import Ember from 'ember';

export default Ember.Component.extend({
  file_input: null,

  // default action name
  action: "upload_image",

  // default input class name
  input_class: 'js-image-upload-input',

  file_input: function() {
    return Ember.$('.' + this.get('input_class'))[0];
  }.property('input_class'),

  setup: function() {
    var input = this.get('file_input'),
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
