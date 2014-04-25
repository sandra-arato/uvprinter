
function initialize() {

	var dataGallery	= {
		title: "Kepek",
		supplies: ["domestos", "mososzer", "valami mas"]
	}
	var html = new EJS({url: 'js/photos.ejs'}).render(dataGallery);
	$(html).appendTo($("#gallery div"));

	$("div.photo img").click(function () {
		var indexOfPhoto = $(this).attr("src").split("/")[6];
		$("#large-photo").html("<img src=http://lorempixel.com/800/600/nightlife/" + indexOfPhoto + " />")
	})

}

$(document).ready(initialize);