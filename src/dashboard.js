(function() {

  'use strict';

  function getTasks(id) {
    var url = 'https://www.googleapis.com/tasks/v1/lists/' + id + '/tasks';
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.setRequestHeader('Authorization', 'Bearer ' + token);

      request.onload = function() {
        if(request.status >= 200 && request.status <400) {
          var tasks = JSON.parse(request.responseText);

          chrome.storage.sync.set({
            cachedTasks: tasks,
            cachedDate: new Date().toDateString()
          }, function() {
            displayTasks(tasks);
          });
        }
      }
      request.send();
    });
  }

  /**
   * Display the tasks
   */
  function displayTasks(tasks) {
    var tasks = tasks.items.map(function(task) {
      var html = '';

      if(task.title && task.completed) {
        html += '<div class="task-completed"><p><strong>' + task.title + ' </strong>';
      } else if(task.title) {
        html += '<div class="complete-task"><p><strong>' + task.title + ' </strong>';
      } else {
        html += 'No tasks in this list';
      }

      if(task.notes) {
        html += '<i>' + task.notes + '</i></p></div>';
      } else {
        html += '</p></div>';
      }

      return html;
    });

    document.getElementById('tasks').innerHTML = tasks.join('');
  }

  /**
   * display the calendar
   */
  function displayCalendar(calendar) {
    document.getElementById('calendar-embed').src = 'https://calendar.google.com/calendar/embed?src=' + calendar;
  }

  function pageLoaded() {
    chrome.storage.sync.get(function(options) {
      console.log(options);
      if(options.calendar) {
        displayCalendar(options.calendar);
      }
      // if(options.cachedDate === new Date().toDateString()) {
      //   displayTasks(options.cachedTasks);
      // } else {
      //   getTasks(options.tasklist);
      // }
    });
  }

  document.addEventListener('DOMContentLoaded', pageLoaded);
})();
