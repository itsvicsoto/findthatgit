var fs = require('fs');
var onlyScripts = require('./util/scriptFilter');
var dashboardTasks = fs.readdirSync('./gulp/tasks/dashboard/').filter(onlyScripts);



dashboardTasks.forEach(function(task) {
  require('./tasks/dashboard/' + task);
});
