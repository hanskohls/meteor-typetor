{"filter":false,"title":"main.jsx","tooltip":"/client/main.jsx","undoManager":{"mark":2,"position":2,"stack":[[{"start":{"row":0,"column":0},"end":{"row":22,"column":0},"action":"remove","lines":["import { Template } from 'meteor/templating';","import { ReactiveVar } from 'meteor/reactive-var';","","import './main.html';","","Template.hello.onCreated(function helloOnCreated() {","  // counter starts at 0","  this.counter = new ReactiveVar(0);","});","","Template.hello.helpers({","  counter() {","    return Template.instance().counter.get();","  },","});","","Template.hello.events({","  'click button'(event, instance) {","    // increment the counter when button is clicked","    instance.counter.set(instance.counter.get() + 1);","  },","});",""],"id":2},{"start":{"row":0,"column":0},"end":{"row":8,"column":3},"action":"insert","lines":["import React from 'react';","import { Meteor } from 'meteor/meteor';","import { render } from 'react-dom';"," ","import App from '../imports/ui/App.jsx';"," ","Meteor.startup(() => {","  render(<App />, document.getElementById('render-target'));","});"]}],[{"start":{"row":4,"column":40},"end":{"row":5,"column":0},"action":"insert","lines":["",""],"id":3}],[{"start":{"row":5,"column":0},"end":{"row":5,"column":47},"action":"insert","lines":["import '../imports/startup/accounts-config.js';"],"id":4}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":5,"column":47},"end":{"row":5,"column":47},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1487337241514,"hash":"5d397f5dcdec18627ce9e98e48a95623ef223725"}