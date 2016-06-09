$(function() {

  $.getJSON('https://script.google.com/macros/s/AKfycbzv1Yp4YpCA5cHH1HO7SMUFm_lppDhOntX74gTS-eM52kJ8rTHP/exec?callback=?', function(json) {
    var html = '<h3>Innovator Corkboard</h3>';
    html += '<ol>';

    json.forEach(function(each) {
      html += '<li>' + each + '</li>';
    });

    html += '</ol>';

    $('.tldr').append(html);

  });

});
