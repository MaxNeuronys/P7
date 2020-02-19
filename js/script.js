var map, pos;



function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 48.8534, lng: 2.3488 },
    zoom: 15
  });
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      //https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyBIUMmeHtvXaxgLj-S6S9B9oMh5V7qxVfA&location=-33.8670522,151.1957362&radius=1500&type=restaurant

      map.setCenter(pos);
      var marker = new google.maps.Marker({ position: pos, map: map });

      function listRestaurant() {
        //PLACES API to  find the restaurants around
        let service = new google.maps.places.PlacesService(map);

        let request = {
          location: pos,
          radius: 2500,
          types: ['restaurant']
        }

        service.nearbySearch(request, callback);

        function callback(results, status) {
          console.log(results)
        }

      }
      listRestaurant();

    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });

  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

