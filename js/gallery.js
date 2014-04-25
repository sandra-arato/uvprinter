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

	$(".photo").click(clickPhoto($(this)));

}

$(document).ready(initialize);