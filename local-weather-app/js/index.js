$(document).ready(function() {
  var zip = "90026";
  var imageUrl = 'http://openweathermap.org/img/w/';
  $.getJSON("http://api.openweathermap.org/data/2.5/weather?zip=" + zip + "," + "us&units=imperial&APPID=e86be91bba3f57caa16aa9e5a0e2899f", function(result) {
    var weatherIcon = result.weather[0].icon;
    var url = imageUrl + weatherIcon + ".png";
    var temp = result.main.temp;
    console.log(url);
    $('#temps').html(JSON.stringify(temp));
    $('#city').html(result.name);
    $('#cityIcon').prepend('<img src=' + url + '>');

    if (temp >= 75) {
      document.body.style.backgroundImage = "url(http://www.admagazine.fr/uploads/images/thumbs/201420/3b/land_art_1_9784.jpeg_north_1160x_white.jpg)";
    } else if (temp < 75 && (temp > 65)) {
      document.body.style.backgroundImage = "url(http://cdni.condenast.co.uk/810x540/k_n/Malaparte_CNT_23oct12_AlistairTaylor-Young_b_810x540.jpg)";
    } else {
      document.body.style.backgroundImage =
        "url(http://www.admagazine.fr/uploads/images/thumbs/201532/58/casa_malap_15_jpg_4427_north_700x_white.jpg)";
    }

  });
});