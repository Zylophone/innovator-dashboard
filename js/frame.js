(function() {
  chrome.identity.getProfileUserInfo(function(profile) {
    chrome.storage.sync.get({calendar: ''}, function(item) {
      document.getElementById('calendar-frame').src = 'https://calendar.google.com/calendar/embed?src=' + profile.email;
    });
  })
})()
