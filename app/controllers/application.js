import Ember from 'ember';

export default Ember.Controller.extend({
  image_source: 'http://i.imgur.com/LmfujBz.png',
  available_actions: [
    {name:'Rotate Right', class_to_apply:'rotate_right'},
    {name:'Rotate Left', class_to_apply:'rotate_left'},
    {name:'Rotate 180', class_to_apply:'rotate_180'},
    {name:'Translate Left', class_to_apply:'translate_left'},
    {name:'Translate Right', class_to_apply:'translate_right'},
    {name:'Translate Up', class_to_apply:'translate_up'},
    {name:'Translate Down', class_to_apply:'translate_down'},
    {name:'Scale to Half', class_to_apply:'scale_half'},
    {name:'Scale to Double', class_to_apply:'scale_double'},
    {name:'Half Opacity', class_to_apply:'half_opacity'}
  ],
  applied_actions: [
  ],
  actions: {
    'add_action': function(action) {
      console.log("adding " + action.name)
    },
    'remove_action': function(action) {
      console.log("removing " + action.name)
    }
  }
});
