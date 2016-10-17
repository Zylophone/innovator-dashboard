(function() {
  'use strict';

  /**
   * Get the users tasklists
   */
  function getTasklists(selected) {
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      var url = 'https://www.googleapis.com/tasks/v1/users/@me/lists';
      var request = new XMLHttpRequest();

      request.open('GET', url, true);
      request.setRequestHeader('Authorization', 'Bearer ' + token);

      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          var tasklistDropdown = JSON.parse(request.responseText)
            .items.map(function(item) {
            return '<option value="' + item.id + '">' + item.title + '</option>';
          });

          document.getElementById('tasklists').innerHTML = tasklistDropdown.join('');
          document.getElementById('tasklists').value = selected;
        }
      };

      request.send();
    });
  }

  /**
   * Get the users calendars
   */
  function getCalendars(selected) {
    chrome.identity.getAuthToken({interactive:true}, function(token) {
      var url ='https://www.googleapis.com/calendar/v3/users/me/calendarList';
      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.setRequestHeader('Authorization', 'Bearer ' + token);
      request.onload = function() {
        if(request.status >= 200 && request.status < 400) {
          var calendarDropdown = JSON.parse(request.responseText)
            .items.map(function(calendar) {
              return '<option value="' + calendar.id + '&ctz=' + calendar.timeZone + '">' + calendar.summary + '</option>';
            });
          document.getElementById('calendars').innerHTML = calendarDropdown.join('');
          document.getElementById('calendars').value = selected;
        }
      }
      request.send();
    });
  }

  function saveOptions(e) {
    e.preventDefault();

    chrome.storage.sync.set({
      tasklist: document.getElementById('tasklists').value,
      calendar: document.getElementById('calendars').value,
      cachedTasks: '',
      cachedDate: ''
    }, function(saved) {
      window.close();
    });
  }

  function getOptions() {

    chrome.storage.sync.get(function(options) {
      getTasklists(options.tasklist);
      getCalendars(options.calendar);
    });

    /**
     * Set the event listener for submit
     */
    document.getElementById('options').addEventListener('submit', saveOptions);
  }

  document.addEventListener('DOMContentLoaded', getOptions);
})()
