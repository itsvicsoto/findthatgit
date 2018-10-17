var fs = require('fs');
var onlyScripts = require('./util/scriptFilter');
var websiteTasks = fs.readdirSync('./gulp/tasks/website/').filter(onlyScripts);
var dashboardTasks = fs.readdirSync('./gulp/tasks/dashboard/').filter(onlyScripts);
var scTasks = fs.readdirSync('./gulp/tasks/sc/').filter(onlyScripts);

websiteTasks.forEach(function(task) {
  require('./tasks/website/' + task);
});

dashboardTasks.forEach(function(task) {
  require('./tasks/dashboard/' + task);
});

scTasks.forEach(function(task) {
  require('./tasks/sc/' + task);
});