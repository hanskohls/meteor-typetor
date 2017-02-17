import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Tasks = new Mongo.Collection('tasks');

const checkAuthorized = function(taskId){
  const task = Tasks.findOne(taskId);
  if (task.private && task.owner !== this.userId){
    throw new Meteor.Error('not-authorized');
  }
};

if (Meteor.isServer){
  Meteor.publish('tasks', function tasksPublication(){
    return Tasks.find({
      $or: [
        { private: { $ne: true }},
        { owner: this.userId}
      ],
    });
  });
}


Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'tasks.remove'(taskId) {
    check(taskId, String);
    checkAuthorized(taskId);  
    Tasks.remove(taskId);
  },
  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
    checkAuthorized(taskId); 
    Tasks.update(taskId, { $set: { checked: setChecked } });
  },
  
  'tasks.setPrivate'(taskId, setToPrivate){
    check(taskId, String);
    check(setToPrivate, Boolean);
    const task = Tasks.findOne(taskId);
    
    if (!task){
      throw new Meteor.Error('not-found');
    }
    
    if (task.owner !== this.userId){
      throw new Meteor.Error('not-authorized');
    }
    
    Tasks.update(taskId,{$set: {private: setToPrivate}});
    
  }
});