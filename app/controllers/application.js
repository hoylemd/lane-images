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

      hash[type] = hash[type] || [];
      hash[type].push(action);
    });
  },

  all_actions: [
    new_action({name:'Rotate Right', type: 'rotate'}),
    new_action({name:'Rotate Left', type: 'rotate'}),
    new_action({name:'Rotate 180', type: 'rotate'}),
    new_action({name:'Translate Left', type: 'translate-horizontal'}),
    new_action({name:'Translate Right', type: 'translate-horizontal'}),
    new_action({name:'Translate Up', type: 'translate-vertical'}),
    new_action({name:'Translate Down', type: 'translate-vertical'}),
    new_action({name:'Scale to Half', type: 'scale'}),
    new_action({name:'Scale to Double', type: 'scale'}),
    new_action({name:'Half Opacity', type: 'opacity'})
  ],

  types_hash: {},
  available_actions: function() {
    return this.get('all_actions').filterBy('applied', false);
  }.property('all_actions.@each.applied'),

  applied_actions: function() {
    return this.get('all_actions').filterBy('applied');
  }.property('all_actions.@each.applied'),

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
