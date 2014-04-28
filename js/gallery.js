function renderThumbnails () {
	// load gallery images with embedded JS
	var data = {};
	var html = new EJS({url: '../js/photos.ejs'}).render(data);
	$(html).appendTo($("#gallery"));
}

function arrowNav(direction) {
	console.log("click direction", direction.id);
	var currentPhotoIndex = $("#large-photo img").attr("src").split("/")[3].split("_")[2].split(".")[0];
	var indexOfPhoto;
	if (direction.id === "back") {
		indexOfPhoto = parseInt(currentPhotoIndex) - 1;
		console.log("Going back from " + currentPhotoIndex + " to " + indexOfPhoto);
		if (indexOfPhoto < 1) {
			indexOfPhoto = 75;
		}
	}
	else if (direction.id === "forward") {
		indexOfPhoto = parseInt(currentPhotoIndex) + 1;
		console.log("Going forward from " + currentPhotoIndex + " to " + indexOfPhoto);
		if (indexOfPhoto > 75) {
			indexOfPhoto = 1;
		}
	}
	else {
		console.log("error");
		return;
	}

	$("#large-photo img").attr("src", "../img/gallery/lef20_nyiltnap_" + indexOfPhoto + ".jpg" );
}

function thumbnailClick(photo) {
	// reload large photo div content with clicked photo
	var indexOfPhoto = $("#large-photo img").attr("src").split("/")[3].split("_")[2].split(".")[0];
	$("#large-photo img").attr("src", "../img/gallery/lef20_nyiltnap_" + indexOfPhoto + ".jpg" );
}


function initialize() {

	// set large photo div height 
	$("#large-photo").css("height", $("#large-photo").height() + "px");
	$("#large-photo span").css("line-height", $("#large-photo").height() + "px")
	$(window).resize(function () {
		$("#large-photo").css("height", $("#large-photo img").height() + "px");	
		$("#large-photo span").css("line-height", $("#large-photo").height() + "px")	
	});
	
	renderThumbnails();

	$("#large-photo span").click(function () { arrowNav(this); });
	$("div.photo img").click(function () { thumbnailClick(this); });

}

$(document).ready(initialize);