function openTab(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

// This example adds a search box to a map, using the Google Place Autocomplete
      // feature. People can enter geographical searches. The search box will return a
      // pick list containing a mix of places and predicted search terms.

      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
	
	function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }

      function initAutocomplete() {
	var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -33.8688, lng: 151.2195},
            zoom: 13,
            mapTypeId: 'roadmap'
        	
        });
	
	var infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }


	
        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
      }
$(document).ready(function(){

var ctxbar = document.getElementById("barchart");
var myChart = new Chart(ctxbar, {
    type: 'bar',
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"],
        datasets: [{
            label: 'Monthly Rainfall for 2007',
            data: [45.1, 27.3, 28.2, 165.7, 47, 189.5, 186.7, 127.8, 83.7, 0, 0, 0],
	    
            backgroundColor: [
                'rgba(0, 0, 256, 1)',
                'rgba(0, 0, 256, 1)',
                'rgba(0, 0, 256, 1)',
                'rgba(0, 0, 256, 1)',
                'rgba(0, 0, 256, 1)',
                'rgba(0, 0, 256, 1)',
		'rgba(0, 0, 256, 1)',
                'rgba(0, 0, 256, 1)',
                'rgba(0, 0, 256, 1)',
                'rgba(0, 0, 256, 1)',
                'rgba(0, 0, 256, 1)',
                'rgba(0, 0, 256, 1)'
            ],
            borderColor: [
                'rgba(0, 0, 256, 1)',
                'rgba(0, 0, 256, 1)',
                'rgba(0, 0, 256, 1)',
                'rgba(0, 0, 256, 1)',
                'rgba(0, 0, 256, 1)',
                'rgba(0, 0, 256, 1)',
		'rgba(0, 0, 256, 1)',
                'rgba(0, 0, 256, 1)',
                'rgba(0, 0, 256, 1)',
                'rgba(0, 0, 256, 1)',
                'rgba(0, 0, 256, 1)',
                'rgba(0, 0, 256, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
	scales: {
           
	    xAxes: [{
                        stacked: false
                }],
            yAxes: [{
                        ticks: {
                    beginAtZero:true
                },
                        stacked: false
                }]
        }
	
    }
});

var ctxpie = document.getElementById("piechart");

var myPieChart = new Chart(ctxpie,{
    type: 'pie',
    data: {
    labels: [
        "Red",
        "Blue",
        "Yellow"
    ],
    datasets: [
        {
            
	    data: [300, 50, 100],
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ]
        }]
}
    
});
$('#submit').click(function() {
  $.ajax({
    type: 'POST',
  url: "https://mandrillapp.com/api/1.0/messages/send.json",
  data: {
    'key': 'YWrEmAjlRAVJKfhtAH1u6w',
    'message': {
      'from_email': 'jilujoy1991@gmail.com',
      'to': [
          {
            'email': 'jilujoyjinu@gmail.com',
            'name': 'jilu',
            'type': 'to'
          }
        ],
      'autotext': 'true',
      'subject': 'SUBJECT',
      'html': 'YOUR EMAIL CONTENT HERE! YOU CAN USE HTML!'
    }
  }
 }).done(function(response) {
  document.getElementById("contact-form").reset();
  alert('Message has been Sent!!!!!'); // if you're into that sorta thing
  });
});

});


