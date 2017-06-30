function ViewModel() {

	
	var self = this;

	self.map = null;
	self.apiSuccessful = null;
	self.currentInfoWindow = null;
	self.markers = ko.observableArray();

	self.query = ko.observable("");
	self.results = ko.observableArray();

	self.filterLocations = function() {
		var results = [];

		var query = self.query().toLowerCase();

		data.forEach(function(location) {
			if (location.name.toLowerCase().includes(query)) {
				results.push(location);
			}
		});

		return results;
	};

	
	self.updateList = function(data) {
		self.results(self.filterLocations());
		self.clearMarkers();
		self.updateMarkers(self.filterLocations());
	};

	
	self.clearMarkers = function() {
		self.markers().forEach(function (marker, i) {
		    marker.setMap(null);
		});
		self.markers.removeAll();
	};

	// Update markers based on query
	self.updateMarkers = function(filterLocations) {
		filterLocations.forEach(function (location) {
			location.marker = new google.maps.Marker({
		        map: self.map,
		        position: location.coordinates,
		        animation: null
		    });

		    location.marker.addListener('click', function() {
	    		self.selectedLocation(location);
	    	});

		   	self.markers().push(location.marker);

		});
	};

	self.selectedLocation = function(location) {

		// Show the the current Info Window
		self.showPlaceInfo(location);

		// Position the current Info Window to the center of the map
		self.map.setCenter(location.marker.getPosition());

		// Animate the marker of the selected location
		self.animate(location.marker);

	};

	self.showPlaceInfo = function(location) {

		// Close the last window
		if (self.currentInfoWindow !== null) {
		    self.currentInfoWindow.close();
		}

		// Set the content of the location's Info Window
		location.infoWindow = new google.maps.InfoWindow({
			content: self.getHTML(location)
		});

		// Set the content of the location's Info Window to the current Info Window
		self.currentInfoWindow = location.infoWindow;

		// Open the current Info Window
		self.currentInfoWindow.open(self.map, location.marker);

	};

	self.getHTML = function(location) {

		var template = '<h1>$name</h1>$wiki';

		var wikiTemplate = '$img' + '<p>' + '$wiki' + '</p>';

		var wiki = '';

		if (location.wiki !== undefined) {
			wiki = wikiTemplate.replace('$wiki', "<h5>Wikipedia: </h5>" + location.wiki).replace('$img', 'Failed to load image');
			if (location.img !== undefined) {
				wiki = wikiTemplate.replace('$wiki', "<h5>Wikipedia: </h5>" + location.wiki).replace('$img', location.img);
			}
		} else {
			self.getWikiInfo(location);
		}

		var html = template.replace('$name', location.name).replace('$wiki', wiki);

		return html;
	};

	self.getWikiInfo = function(location) {

		// Wikipedia Information
		var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' +
			location.name +
			'&format=json';

		// Ajax Call
		$.ajax({
		    url: wikiUrl,
		    dataType: 'jsonp',
		    success: function(response) {
		    	if (response[2][0] !== undefined) {
			    	location.wiki = response[2][0];
			    	location.infoWindow.setContent(self.getHTML(location));
		    	}
		    },
		    timeout: 10000,
		    error: function() {
		    	if (self.apiSuccessful !== false) {
		    		alert("Wikipedia API Failed to load");
		    		self.apiSuccessful = false;
		    	}
		    }
		});

		// Wikipedia Thumbnail
		$.getJSON("http://en.wikipedia.org/w/api.php?action=query&format=json&callback=?", {
			titles: location.name,
			prop: "pageimages",
			pithumbsize: 150
		},
		function(data) {
			var source = "";
			var img = "";
			var imageUrl = GetAttributeValue(data.query.pages);
			if (imageUrl === "") {
				img = "No Image Found";
				location.img = img;
			} else {
				img = "<img class='icon' src=\"" + imageUrl + "\">";
				location.img = img;
			}
		}
		);

		function GetAttributeValue(data) {
			var urli = "";
			for (var key in data) {
				if (data[key].thumbnail !== undefined) {
					if (data[key].thumbnail.source !== undefined) {
						urli = data[key].thumbnail.source;
						break;
					}
				}
			}
			return urli;
		}

	};

	
	self.animate = function(marker) {
		if (marker.getAnimation() !== null) {
		  marker.setAnimation(null);
		} else {
		  marker.setAnimation(google.maps.Animation.DROP);
		}
	};



	self.initMap = function() {
		self.map = new google.maps.Map(document.getElementById('map'), {
			center: {lat:28.3636, lng: 77.1348},
			zoom: 5,
			mapTypeControl: false

		});
	};
}

// Model
var data = [
    {
        name: "IIIT HYDERABAD",
        coordinates: {
            lat: 17,
            lng: 78
        }
	},
	{
        name: "IIT ROORKIE",
        coordinates: {
            lat: 29,
            lng: 77
        }
	},
	{
        name: "IIT MANDI",
        coordinates: {
            lat: 31.46,
            lng: 76.59
        }
	},
	{
        name: "BITS PILANI",
        coordinates: {
            lat: 28,
            lng: 75
        }
	},
	{
        name: "HALDIA INSTITUTE OF TECHNOLOGY",
        coordinates: {
            lat: 22.03,
            lng: 88.06
        }
	},
	{
        name: "JADAVPUR UNIVERSITY",
        coordinates: {
            lat: 22.50041,
            lng: 88.3677
        }
	},
	{
        name: "IIT GUWAHATI",
        coordinates: {
            lat: 26.1114,
            lng: 91.4130
        }
	},
	{
        name: "IIT BHU",
        coordinates: {
            lat: 25.167,
            lng: 82.5925
        }
	},
	{
        name: "IIT MUMBAI",
        coordinates: {
            lat: 19.0801,
            lng: 72.5455
        }
	},
	{
        name: "IIT DELHI",
        coordinates: {
            lat: 28.32,
            lng: 77.11
        }
	},
	{
        name: "IIT KANPUR",
        coordinates: {
            lat: 26.51138,
            lng: 80.2349
        }
	},
	{
        name: "IIT MADRAS",
        coordinates: {
            lat: 12.99151,
            lng: 80.23362
        }
	},
	{
        name: "BIT SINDRI",
        coordinates: {
            lat: 23.75,
            lng: 86.7
        }
	},
	{
        name: "ISM DHANBAD",
        coordinates: {
            lat: 23.8133,
            lng: 86.4419
        }
	}
];


function googleError()
	{ alert("Failed to load Google Maps API"); }


var viewModel;

function initialize() {

	viewModel = new ViewModel();

	viewModel.initMap();
	viewModel.updateList();

	// Activate Knockout
	ko.applyBindings(viewModel, document.getElementById("list"));
}
