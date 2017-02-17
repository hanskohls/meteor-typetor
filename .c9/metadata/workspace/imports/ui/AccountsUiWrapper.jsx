{"changed":true,"filter":false,"title":"AccountsUiWrapper.jsx","tooltip":"/imports/ui/AccountsUiWrapper.jsx","value":"import React, { Component } from 'react';\nimport ReactDOM from 'react-dom';\nimport { Template } from 'meteor/templating';\nimport { Blaze } from 'meteor/blaze';\n \nexport default class AccountsUIWrapper extends Component {\n  componentDidMount() {\n    // Use Meteor Blaze to render login buttons\n    this.view = Blaze.render(Template.loginButtons,\n      ReactDOM.findDOMNode(this.refs.container));\n  }\n  componentWillUnmount() {\n    // Clean up Blaze view\n    Blaze.remove(this.view);\n  }\n  render() {\n    // Just render a placeholder container that will be filled in\n    return <span ref=\"container\" />;\n  }\n}","undoManager":{"mark":-2,"position":0,"stack":[[{"start":{"row":0,"column":0},"end":{"row":19,"column":1},"action":"insert","lines":["import React, { Component } from 'react';","import ReactDOM from 'react-dom';","import { Template } from 'meteor/templating';","import { Blaze } from 'meteor/blaze';"," ","export default class AccountsUIWrapper extends Component {","  componentDidMount() {","    // Use Meteor Blaze to render login buttons","    this.view = Blaze.render(Template.loginButtons,","      ReactDOM.findDOMNode(this.refs.container));","  }","  componentWillUnmount() {","    // Clean up Blaze view","    Blaze.remove(this.view);","  }","  render() {","    // Just render a placeholder container that will be filled in","    return <span ref=\"container\" />;","  }","}"],"id":1}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":19,"column":1},"end":{"row":19,"column":1},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1487336433441}