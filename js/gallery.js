
function initialize() {

	// load gallery images with embedded JS
	var dataGallery	= {
		title: "Kepek",
		photos: ["1", "2", "3"]
	}
	var html = new EJS({url: 'js/photos.ejs'}).render(dataGallery);
	$(html).appendTo($("#gallery div"));

	// set large photo div height 
	$("#large-photo").css("height", $("#large-photo").height() + "px");
	$(window).resize(function () {
		$("#large-photo").css("height", $("#large-photo").height() + "px");		
	})

	// reload large photo div content with clicked photo
	$("div.photo img").click(function () {
		var indexOfPhoto = $(this).attr("src").split("/")[6];
		$("#large-photo").html("<img src=http://lorempixel.com/800/600/nightlife/" + indexOfPhoto + " />")
	})



}

$(document).ready(initialize);