import Ember from 'ember';
import layout from '../templates/components/ilios-calendar-multiday-event';

const { notEmpty, any } = Ember.computed;

export default Ember.Component.extend({
  layout: layout,
  tagName: ['li'],
  event: null,
  isIlm: notEmpty('event.ilmSession'),
  isOffering: notEmpty('event.offering'),
  clickable: any('isIlm', 'isOffering'),
  
  actions: {
    selectEvent(event){
      if(this.get('clickable')){
        this.sendAction('action', event);
      }
    }
  }
});
