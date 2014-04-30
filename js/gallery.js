function renderThumbnails () {
	// load gallery images with embedded JS
	var data = {};
	var html = new EJS({url: '../js/photos.ejs'}).render(data);
	$(html).appendTo($("#gallery"));
}

function arrowNav(direction) {
	var matches = $("#large-photo img").attr("src").match(/.*lef20_nyiltnap_(\d+)\.jpg$/);
	var indexOfPhoto;
	if (matches.length !== 2) {
		return
	};
	var currentPhotoIndex = matches[1];
	if (direction.id === "back") {
		indexOfPhoto = parseInt(currentPhotoIndex) - 1;
		if (indexOfPhoto < 1) {
			indexOfPhoto = 75;
		}
	}
	else if (direction.id === "forward") {
		indexOfPhoto = parseInt(currentPhotoIndex) + 1;
		if (indexOfPhoto > 75) {
			indexOfPhoto = 1;
		}
	}
	else {
		return;
	}

	$("#large-photo img").attr("src", "../img/gallery/lef20_nyiltnap_" + indexOfPhoto + ".jpg" );
}

function thumbnailClick(photo) {
	// reload large photo div content with clicked photo
	var matches = $(photo).attr("src").match(/.*lef20_nyiltnap_(\d+)\.jpg$/);
	if ( matches === 2 ) {
		var indexOfPhoto = matches[1];
		$("#large-photo img").attr("src", "../img/gallery/lef20_nyiltnap_" + indexOfPhoto + ".jpg" );
	}
	
}

function flipQuote(quote) {
	$("#testimonials blockquote").css("bottom", "-400px");
	$("#testimonials div p").css("display", "block");
	$(quote).prev("div").children("p").fadeOut();
	$(quote).animate({
		position: "relative",
		bottom: "-200px"
	}, 400);
}

function smoothScroll() {
	$("a[href*=#]:not([href=#])").click(function() {
		if (location.pathname.replace(/^\//,"") == this.pathname.replace(/^\//,"") && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $("[name=" + this.hash.slice(1) +"]");
			if (target.length) {
				$("html,body").animate({
					scrollTop: target.offset().top,
					easing: "easeOutBack"
				}, 1200);
				return false;
			}
		}
	});
}

function initialize() {

	renderThumbnails();

	$("#large-photo span").click(function () { arrowNav(this); });
	$("div.photo img").click(function () { thumbnailClick(this); });
	$("#testimonials .front").click(function () { flipQuote($(this).next()); })
	smoothScroll();
}

$(document).ready(initialize);