function renderThumbnails () {
	// load gallery images with embedded JS
	var dataGallery	= {
		title: "Kepek",
		photos: ["1", "2", "3"]
	}
	var html = new EJS({url: 'js/photos.ejs'}).render(dataGallery);
	$(html).appendTo($("#gallery"));
}

function arrowNav(direction) {
	console.log("click direction", direction.id);
	var currentPhotoIndex = $("#large-photo img").attr("src").split("/")[6];
	var indexOfPhoto;
	if (direction.id === "back") {
		indexOfPhoto = parseInt(currentPhotoIndex) - 1;
		console.log("Going back from " + currentPhotoIndex + " to " + indexOfPhoto);
		if (indexOfPhoto < 1) {
			indexOfPhoto = 10;
		}
	}
	else if (direction.id === "forward") {
		indexOfPhoto = parseInt(currentPhotoIndex) + 1;
		console.log("Going forward from " + currentPhotoIndex + " to " + indexOfPhoto);
		if (indexOfPhoto > 10) {
			indexOfPhoto = 1;
		}
	}
	else {
		console.log("error");
		return;
	}

	$("#large-photo img").attr("src", "http://lorempixel.com/800/600/nightlife/" + indexOfPhoto );
}

function thumbnailClick(photo) {
	// reload large photo div content with clicked photo
	var indexOfPhoto = $(photo).attr("src").split("/")[6];
	$("#large-photo img").attr("src", "http://lorempixel.com/800/600/nightlife/" + indexOfPhoto );
}


function initialize() {

	// set large photo div height 
	$("#large-photo").css("height", $("#large-photo").height() + "px");
	$(window).resize(function () {
		$("#large-photo").css("height", $("#large-photo img").height() + "px");		
	});

	$("#large-photo span").click(function () { arrowNav(this); });
	$("div.photo img").click(function () { thumbnailClick(this); });
	renderThumbnails();
	photoNavigation();

}

$(document).ready(initialize);