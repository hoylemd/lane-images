import Ember from 'ember';

export default Ember.Controller.extend({
  image_source: 'http://i.imgur.com/LmfujBz.png',
  all_actions: [
    {name:'Rotate Right', class_to_apply:'rotate_right', applied: false},
    {name:'Rotate Left', class_to_apply:'rotate_left', applied: false},
    {name:'Rotate 180', class_to_apply:'rotate_180', applied: false},
    {name:'Translate Left', class_to_apply:'translate_left', applied: false},
    {name:'Translate Right', class_to_apply:'translate_right', applied: false},
    {name:'Translate Up', class_to_apply:'translate_up', applied: false},
    {name:'Translate Down', class_to_apply:'translate_down', applied: false},
    {name:'Scale to Half', class_to_apply:'scale_half', applied: false},
    {name:'Scale to Double', class_to_apply:'scale_double', applied: false},
    {name:'Half Opacity', class_to_apply:'half_opacity', applied: false}
  ],
  available_actions: function() {
    return this.get('all_actions').filterBy('applied', false);
  }.property('all_actions.@each.applied'),
  applied_actions: function() {
    return this.get('all_actions').filterBy('applied');
  }.property('all_actions.@each.applied'),
  image_classes: function () {
    var classes = this.get('applied_actions').mapBy('class_to_apply');
    classes.push("image-window");

    return classes.join(' ');
  }.property('applied_actions'),
  actions: {
    'add_action': function(action) {
      console.log("adding " + action.name);
      Ember.set(action, 'applied', true);
    },
    'remove_action': function(action) {
      console.log("removing " + action.name);
      Ember.set(action, 'applied', false);
    }
  }
});
