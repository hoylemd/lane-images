import Ember from 'ember';

export default Ember.Controller.extend({
  image_source: 'http://i.imgur.com/LmfujBz.png',
  available_actions: [
    {name:'Rotate Right', class_to_apply:''},
    {name:'Rotate Left', class_to_apply:''},
    {name:'Rotate 180', class_to_apply:''},
    {name:'Translate Left', class_to_apply:''},
    {name:'Translate Right', class_to_apply:''},
    {name:'Translate Up', class_to_apply:''},
    {name:'Translate Down', class_to_apply:''},
    {name:'Scale to Half', class_to_apply:''},
    {name:'Scale to Double', class_to_apply:''},
    {name:'50% Opacity', class_to_apply:''}
  ],
  applied_actions: [
  ]
});
