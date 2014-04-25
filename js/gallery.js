function clickPhoto(photo) {
	console.log("click!");
	console.log($(this));
}



function initialize() {

	var dataGallery	= {
		title: "Kepek",
		supplies: ["domestos", "mososzer", "valami mas"]
	}
	var html = new EJS({url: 'js/photos.ejs'}).render(dataGallery);
	$(html).appendTo($("#gallery div"));

	
	$("div.photo img").click(function () {
		console.log("click!!");
		var indexOfPhoto = $(this).attr("src").split("/")[6];
		console.log("this is " + indexOfPhoto);
		$("#large-photo").html("<img src=http://lorempixel.com/800/600/nightlife/" + indexOfPhoto + " />")

	})

}

$(document).ready(initialize);