import Ember from 'ember';

function new_action(spec) {
  var action = Ember.Object.create(spec);
  action.set('applied', false);
  return action;
}

export default Ember.Controller.extend({
  image_source:'http://www.squishable.com/user_gallery/pillow_catbug_okay_2D/360s/pillow_catbug_okay_2D_design.jpg',
  init: function () {
    var hash = this.get('actions_hash');

    this.get('all_actions').forEach(function(action){
      hash[action.get('class_to_apply')] = action;
    });

  },
  all_actions: [
    new_action({name:'Rotate Right', class_to_apply:'rotate_right',
      mutex: ['rotate_left', 'rotate_180']}),
    new_action({name:'Rotate Left', class_to_apply:'rotate_left',
      mutex: ['rotate_right', 'rotate_180']}),
    new_action({name:'Rotate 180', class_to_apply:'rotate_180',
      mutex: ['rotate_right', 'rotate_left']}),
    new_action({name:'Translate Left', class_to_apply:'translate_left',
      mutex: ['translate_right']}),
    new_action({name:'Translate Right', class_to_apply:'translate_right',
      mutex: ['translate_left']}),
    new_action({name:'Translate Up', class_to_apply:'translate_up',
      mutex: ['translate_down']}),
    new_action({name:'Translate Down', class_to_apply:'translate_down',
      mutex: ['translate_up']}),
    new_action({name:'Scale to Half', class_to_apply:'scale_half',
      mutex: ['scale_double']}),
    new_action({name:'Scale to Double', class_to_apply:'scale_double',
      mutex: ['scale_half']}),
    new_action({name:'Half Opacity', class_to_apply:'half_opacity',
      mutex: []})
  ],
  actions_hash: {},
  available_actions: function() {
    return this.get('all_actions').filterBy('applied', false);
  }.property('all_actions.@each.applied'),

  applied_actions: function() {
    return this.get('all_actions').filterBy('applied');
  }.property('all_actions.@each.applied'),

  action_classes: function () {
    var classes = this.get('applied_actions').mapBy('class_to_apply');
    return classes.join(' ');
  }.property('all_actions.@each.applied'),

  image_classes: function () {
    return 'js-the-image ' + this.get('action_classes');
  }.property('action_classes'),
  actions: {
    'add_action': function(action) {
      Ember.set(action, 'applied', true);
      var hash = this.get('actions_hash');
      action.get('mutex').forEach(function(action) {
        hash[action].set('applied', false);
      });
    },
    'remove_action': function(action) {
      action.set('applied', false);
    },
    'reset': function () {
      this.get('all_actions').forEach((item) => {
        item.set('applied', false);
      });
    }
  }
});
