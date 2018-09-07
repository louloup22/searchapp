let DocumentDBClient = require('documentdb').DocumentClient;
let async = require('async');

function TaskList(taskModel) {
this.taskModel = taskModel;
}

module.exports = TaskList;

 TaskList.prototype = {
 showTasks: function(req, res) {
     let self = this;

     let querySpec = {
     query: 'SELECT * FROM root r WHERE r.completed=@completed',
     parameters: [
         {
         name: '@completed',
         value: false
         }
     ]
     };

     self.taskModel.find(querySpec, function(err, items) {
     if (err) {
         throw err;
     }

     res.render('todolist', {
         title: 'CV Search Platform',
         tasks: items
     });
     });
 },

 addTask: function(req, res) {
     let self = this;
     let item = req.body;

     self.taskModel.addItem(item, function(err) {
     if (err) {
         throw err;
     }

     res.redirect('/todolist');
     });
 },

 completeTask: function(req, res) {
     let self = this;
     let completedTasks = Object.keys(req.body);

     async.forEach(
     completedTasks,
     function taskIterator(completedTask, callback) {
         self.taskModel.updateItem(completedTask, function(err) {
         if (err) {
             callback(err);
             console.log("hello if");
         } else {
             callback(null);
             console.log("hello else");
         }
         });
     },
     function goHome(err) {
         if (err) {
         throw err;
         } else {
         res.redirect('/todolist');
         }
     }
     );
 }
 };