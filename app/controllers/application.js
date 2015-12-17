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
    new_action({name:'Rotate Right', type: 'rotate',
               style: {rotate: 90}}),
    new_action({name:'Rotate Left', type: 'rotate',
               style: {rotate: 270}}),
    new_action({name:'Rotate 180', type: 'rotate',
               style: {rotate: 180}}),
    new_action({name:'Translate Left', type: 'translate-x',
               style: {translate: {x: -40, y: 0}}}),
    new_action({name:'Translate Right', type: 'translate-x',
               style: {translate: {x: 40, y: 0}}}),
    new_action({name:'Translate Up', type: 'translate-y',
               style: {translate: {x: 0, y: -40}}}),
    new_action({name:'Translate Down', type: 'translate-y',
               style: {translate: {x: 0, y: 40}}}),
    new_action({name:'Scale to Half', type: 'scale',
               style: {scale: 0.5}}),
    new_action({name:'Scale to Double', type: 'scale',
               style: {scale: 2}}),
    new_action({name:'Half Opacity', type: 'opacity',
               style: {opacity: 0.5}}),
  ],

  types_hash: {},
  available_actions: function() {
    return this.get('all_actions').filterBy('applied', false);
  }.property('all_actions.@each.applied'),

  applied_actions: function() {
    return this.get('all_actions').filterBy('applied');
  }.property('all_actions.@each.applied'),

  image_style: function () {
    var rotate = 0,
      translate = {x: 0, y: 0},
      scale = 1,
      opacity = 1,
      style_string = '';

    this.get('applied_actions').forEach((action) => {
      rotate = action.style['rotate'] || rotate;

      var translation = action.style['translate'];
      if (translation) {
        translate.x += translation.x;
        translate.y += translation.y;
      }

      scale = action.style['scale'] || scale;
      opacity = action.style['opacity'] || opacity;
    });

    style_string = 'transform: ' +
      'rotate(' + rotate + 'deg) ' +
      'translate(' + translate.x + 'px, ' + translate.y + 'px) ' +
      'scale(' + scale + ');' +
      'opacity: ' + opacity + ';';

    return style_string;
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
