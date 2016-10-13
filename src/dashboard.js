function Ajax() {
  return {
    get: function() {
      var request = new XMLHttpRequest();
      request.open('GET', '/my/url', true);

      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          return request.responseText;
        } else {
          // We reached our target server, but it returned an error
          return request.error;
        }
      };
    },
    post: function() {
      var request = new XMLHttpRequest();
      request.open('POST', '/my/url', true);
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

      // Here is an example of a request header with access_token inside;
      // xhr.setRequestHeader('Authorization', 'Bearer ' + oauthToken.access_token);
      // 
      request.send(data);
    }
  };
}
