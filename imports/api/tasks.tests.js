/* eslint-env mocha */
 
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai'; 
 
import { Tasks } from './tasks.js';
 
if (Meteor.isServer) {
  describe('Tasks', () => {
    
    describe( "Meteor.methods", () => {
      
      describe('tasks.insert', ()=>{
        Meteor.users.remove({});
        const userId = Accounts.createUser({
          email: "hello@hello",
          password: "somepassword",
          profile: { name: "somename "}
        });
        const insertTask = Meteor.server.method_handlers['tasks.insert'];
        
        beforeEach(()=>{
          Tasks.remove({});
          Meteor.users.insert({});
        });
        
        it('inserts a text passed by a user', ()=>{
          const invocation = {userId};
          const text = Array(33).join('a');
          insertTask.apply(invocation,  [text]);
          assert.equal(Tasks.find().count(), 1);
          const task = Tasks.findOne();
          assert.equal(task.text, text );
          assert.equal(task.owner, userId);
        });
        
        it('throws error if user is not logged on', ()=>{
          const invocation = {};
          const fn = ()=>{ insertTask.apply(invocation, [Array(33).join('x')])};
          assert.throws(fn, 'not-authorized');
        });
        
        it('throws error if text not a string', ()=>{
          const invocation = {userId};
          const fn = ()=>{ insertTask.apply(invocation, [1234])};
          assert.throws(fn, 'Match error: Expected string, got number');
        });
        
        const options = [
          {
            desc: 'Inserting < 32 characters should fail',
            num: 31, expected: false
          },
          {
            desc: '32 characters should pass',
            num: 32, expected: true
          },
          {
            desc: '4096 characters should pass',
            num: 4096, expected: true
          },
          {
            desc: '4097 characters should fail',
            num: 4097, expected: false
          },
        ];
        
        for(const o of options){
          it(o.desc, ()=>{
            Tasks.remove({});
            const invocation = { userId };
            const text = Array(o.num+1).join('x');
            if (o.expected){
              insertTask.apply(invocation, [text]);
              assert.equal(Tasks.find().count(), 1);
            } else {
              const fn = () => { insertTask.apply(invocation, [text]); };
              assert.throws(fn, 'validation-error');
            }
          }); 
        }
        
      }); // describe tasks.insert
      
      
      
      describe('tasks.remove', () => {
        const userId = Random.id();
        let taskId;
   
        beforeEach(() => {
          Tasks.remove({});
          taskId = Tasks.insert({
            text: 'test task',
            createdAt: new Date(),
            owner: userId,
            username: 'tmeasday',
          });
        });
   
        it('can delete owned task', () => {
          const deleteTask = Meteor.server.method_handlers['tasks.remove'];
          const invocation = { userId };
          deleteTask.apply(invocation, [taskId]);
          assert.equal(Tasks.find().count(), 0);
        });
        
        it('cannot delete unowned task', () => {
          const deleteTask = Meteor.server.method_handlers['tasks.remove'];
          const invocation = { userId: Random.id() };
          const fn = ()=>{deleteTask.apply(invocation, [taskId]);};
          assert.throws(fn, 'not-authorized' );
          assert.equal(Tasks.find().count(), 1);
        });
        
      }); // describe tasks.remove
      
      
      
      describe('tasks.setPrivate', () => {
        const userId = Random.id();
        let taskId;
        
        beforeEach(() => {
          Tasks.remove({});
          taskId = Tasks.insert({
            text: 'test task',
            createdAt: new Date(),
            owner: userId,
            username: 'tmeasday',
          });
        });
        
        // adding retain functions as I changed this from toggling to actual values. 
        const options = [
          { desc: 'changes a public task to private', init: false, act: true },
          { desc: 'keeps a private task as private', init: true, act: true },
          { desc: 'keeps a public task as public', init: false, act: false},
          { desc: 'changes a private task to public', init: true, act: false },
        ];
        
        for (const opt of options){
          it(opt.desc, () =>{
            Tasks.update(taskId, {$set : {private: opt.init}});
            const setPrivateTask = Meteor.server.method_handlers['tasks.setPrivate'];
            const invocation = { userId };
            setPrivateTask.apply(invocation, [taskId, opt.act]);
            assert.equal(Tasks.findOne(taskId).private, opt.act);            
          });
        }
      }); // describe tasks.setPrivate      
      
    }); // describe Meteor.methods
  
  }); // describe Tasks
}