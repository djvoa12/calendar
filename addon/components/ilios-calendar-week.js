import Ember from 'ember';
import moment from 'moment';
import layout from '../templates/components/ilios-calendar-week';

const { Component, computed, run, isEmpty } = Ember;

export default Component.extend({
  classNames: ['ilios-calendar-week'],
  layout: layout,
  date: null,
  calendarEvents: [],
  weekOf: computed('date', function(){
    return moment(this.get('date')).startOf('week').format('MMMM Do YYYY');
  }),
  didInsertElement(){
    run.next(() => {
      this.$(".el-calendar .week").scrollTop(500);
    });
  },
  singleDayEvents: computed('calendarEvents.[]', function(){
    const events = this.get('calendarEvents');
    if(isEmpty(events)){
      return [];
    }
    return events.filter(
      event => moment(event.startDate).isSame(moment(event.endDate), 'day')
    );
  }),
  multiDayEventsList: computed('calendarEvents.[]', function(){
    const events = this.get('calendarEvents');
    if(isEmpty(events)){
      return [];
    }
    return events.filter(
      event => !moment(event.startDate).isSame(moment(event.endDate), 'day')
    );
  }),
  actions: {
    selectEvent(event){
      this.sendAction('selectEvent', event);
    },
    changeToDayView(date){
      this.sendAction('changeDate', date);
      this.sendAction('changeView', 'day');
    },
    changeToEventsDayView(event){
      this.sendAction('changeDate', event.startDate);
      this.sendAction('changeView', 'day');
    }
  }
});
