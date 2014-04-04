var map;
function mapLoad () {
	var mapOptions = {
	    zoom: 14,
	    center: new google.maps.LatLng(47.469935, 19.083579)
	  };
	  map = new google.maps.Map(document.getElementById('map-canvas'),
	      mapOptions);
}

function initialize() {
	mapLoad();
}

$(document).ready(initialize);