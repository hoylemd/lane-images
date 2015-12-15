import Ember from 'ember';

export default Ember.Controller.extend({
  image_source:'http://www.squishable.com/user_gallery/pillow_catbug_okay_2D/360s/pillow_catbug_okay_2D_design.jpg',
  all_actions: [
    {name:'Rotate Right', class_to_apply:'rotate_right', applied: false,
      mutex: ['rotate_left', 'rotate_180']},
    {name:'Rotate Left', class_to_apply:'rotate_left', applied: false,
      mutex: ['rotate_right', 'rotate_180']},
    {name:'Rotate 180', class_to_apply:'rotate_180', applied: false,
      mutex: ['rotate_right', 'rotate_left']},
    {name:'Translate Left', class_to_apply:'translate_left', applied: false,
      mutex: ['translate_right']},
    {name:'Translate Right', class_to_apply:'translate_right', applied: false,
      mutex: ['translate_left']},
    {name:'Translate Up', class_to_apply:'translate_up', applied: false,
      mutex: ['translate_down']},
    {name:'Translate Down', class_to_apply:'translate_down', applied: false,
      mutex: ['translate_up']},
    {name:'Scale to Half', class_to_apply:'scale_half', applied: false,
      mutex: ['scale_double']},
    {name:'Scale to Double', class_to_apply:'scale_double', applied: false,
      mutex: ['scale_half']},
    {name:'Half Opacity', class_to_apply:'half_opacity', applied: false,
      mutex: []}
  ],
  available_actions: function() {
    return this.get('all_actions').filterBy('applied', false);
  }.property('all_actions.@each.applied'),

  applied_actions: function() {
    return this.get('all_actions').filterBy('applied');
  }.property('all_actions.@each.applied'),

  image_classes: function () {
    var classes = this.get('applied_actions').mapBy('class_to_apply');
    return classes.join(' ');
  }.property('all_actions.@each.applied'),

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
