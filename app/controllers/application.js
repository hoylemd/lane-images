import Ember from 'ember';

function new_action(spec) {
  var action = Ember.Object.create(spec);
  action.set('applied', false);
  return action;
}

export default Ember.Controller.extend({
  image_source:'http://www.squishable.com/user_gallery/pillow_catbug_okay_2D/360s/pillow_catbug_okay_2D_design.jpg',
  init: function () {
    var hash = this.get('types_hash');

    this.get('all_actions').forEach(function(action){
      var type = action.get('type');
      hash[action.get('class_to_apply')] = action;

      hash[type] = hash[type] || [];
      hash[type].push(action);
    });
  },
  all_actions: [
    new_action({name:'Rotate Right', class_to_apply:'rotate_90deg',
      type: 'rotate'}),
    new_action({name:'Rotate Left', class_to_apply:'rotate_270deg',
      type: 'rotate'}),
    new_action({name:'Rotate 180', class_to_apply:'rotate_180deg',
      type: 'rotate'}),
    new_action({name:'Translate Left', class_to_apply:'translate_left',
      type: 'translate-horizontal'}),
    new_action({name:'Translate Right', class_to_apply:'translate_right',
      type: 'translate-horizontal'}),
    new_action({name:'Translate Up', class_to_apply:'translate_up',
      type: 'translate-vertical'}),
    new_action({name:'Translate Down', class_to_apply:'translate_down',
      type: 'translate-vertical'}),
    new_action({name:'Scale to Half', class_to_apply:'scale_half',
      type: 'scale'}),
    new_action({name:'Scale to Double', class_to_apply:'scale_double',
      type: 'scale'}),
    new_action({name:'Half Opacity', class_to_apply:'half_opacity',
      type: 'opacity'})
  ],
  types_hash: {},
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
      var type = action.get('type');

      this.get('types_hash')[type].forEach(other => {
        other.set('applied', false);
      });

      action.set('applied', true);
    },
    'remove_action': function(action) {
      action.set('applied', false);
    },
    'reset': function () {
      this.get('all_actions').forEach((item) => {
        item.set('applied', false);
      });
    },
    'upload_image': function (image_data) {
      this.set('image_source', image_data);
    }
  }
});
