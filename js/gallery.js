function initialize() {
	console.log("start data");
	var dataGallery	= {
		title: "Cleaning Supplies",
		supplies: ["domestos", "mososzer", "valami mas"]
	}
	var html = new EJS({url: 'js/cleaning.ejs'}).render(dataGallery);
	console.log("rendering done");
	$(html).appendTo($("#gallery div"));
}

$(document).ready(initialize);