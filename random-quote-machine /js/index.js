
$(document).ready(function() {
  var number = 0;
  $("button").click(function() {
    $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?",
    function(forismatic) {
      number++;
      $(".quoteBox").addClass( "jumbotron animated fadeIn");
      $('#number').html("No: "+ number);
      $('#quote').html(JSON.stringify(forismatic.quoteText));
      $('#author').html(forismatic.quoteAuthor); 
    });    
  });
});