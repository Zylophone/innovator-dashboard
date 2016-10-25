(function() {
  'use strict';

  //save user options to chrome.storage
  var Options = {
    init: function() {
      this._getOptions();

      document.getElementById('options').addEventListener('submit', this.saveOptions);
    },

    _setTasklists: function(tasklist) {
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
            document.getElementById('tasklists').value = tasklist;
          }
        };

        request.send();
      });
    },

    _getOptions: function() {
      chrome.storage.sync.get({tasklist: ''}, function(items) {
        Options._setTasklists(items.tasklist);
        document.getElementById('calendars').value = items.calendar;
      });
    },

    _getTasks: function(tasklist) {
      chrome.identity.getAuthToken({interactive: true}, function(token) {
        var url = 'https://www.googleapis.com/tasks/v1/lists/' + tasklist + '/tasks';
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);

        xhr.onload = function() {
          if (xhr.status >= 200 && xhr.status < 400) {
            // Success!
            var tasks = JSON.parse(xhr.responseText).items;

            console.log(tasks);

            var todos = tasks.map(function(task) {
              if(task.links) {
                var links = task.links.map(function(link) {
                  return link.link;
                });
              } else {
                var links = [];
              }
              return {
                title: task.title,
                completed: task.completed || false,
                notes: task.notes || null,
                link: links
              }
            });
            chrome.storage.sync.set({todos: todos}, function() {
              window.close();
            });
          }
        };

        xhr.send();

      });
    },

    saveOptions: function(e) {
      e.preventDefault();

      Options._getTasks(e.target[0].value);
      chrome.storage.sync.set({
        tasklist: e.target[0].value,
        calendar: encodeURIComponent(e.target[1].value)
      });
    }
  };

  Options.init();
})()
