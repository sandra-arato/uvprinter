var map;

function mapLoad () {
	var mapOptions = {
		zoom: 12,
		center: new google.maps.LatLng(47.469935, 19.083579),
		panControl: false,
		zoomControl: false,
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		overviewMapControl: false,
		disableDoubleClickZoom: false,
		draggable: true,
		scrollwheel: false
	};

	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	var goldStar = {
		path: 'M148 745q0 124 60.5 231.5t165 172t226.5 64.5q123 0 227 -63t164.5 -169.5t60.5 -229.5t-73 -272q-73 -114 -166.5 -237t-150.5 -189l-57 -66q-10 9 -27 26t-66.5 70.5t-96 109t-104 135.5t-100.5 155q-63 139 -63 262zM342 772q0 -107 75.5 -182.5t181.5 -75.5 q107 0 182.5 75.5t75.5 182.5t-75.5 182t-182.5 75t-182 -75.5t-75 -181.5z',
		fillColor: '#71c441',
		fillOpacity: 0.8,
		scale: 0.04,
		rotation: 180
	  };
	var marker = new google.maps.Marker({
		position: map.getCenter(),
		icon: goldStar,
		map: map
	});
	google.maps.event.addDomListener(window, 'resize', function() { map.setCenter(new google.maps.LatLng(47.469935, 19.083579));});
}

function checkInputField(inputField, regex) {
	inputField.valid = false;
	var errorMessage = inputField.next("span.error-messages");
	var label = $("label[for='" + inputField.attr("id") + "']");
	if (inputField.val()) {
		inputField.valid = regex.test(inputField.val());
		if (!inputField.valid) {
			errorMessage.html("A megadott érték nem megfelelő formátumú.");
		};
	}
	else {
		errorMessage.html("Kötelező mező!");
	}

	if (!inputField.valid) {
		inputField.css("border-bottom", "3px solid #c10037");
		$("#" + inputField.attr("id") + ":focus").css("border-bottom", "3px solid #7abd23");
		errorMessage.css("display", "block");
		if (errorMessage.html() !== null ) {
			$("div.error-messages").append(
			"<p>" + label.html() + " " + errorMessage.html() + "</p>");
		};
		$("div.error-messages").css("display", "block");
	}
	else {
		inputField.css("border-bottom", "3px solid #7abd23");
		errorMessage.css("display", "none");
	}
}

function contactFormValidation() {
	var contactName = $("#name");
	var contactEmail = $("#email");
	var contactPhone = $("#phone");
	var radioGroup = $("[name='time']");
	var textMessage = $("#message-text");

	var nameRegex = /^[-a-zA-ZÀ-ÖØ-öø-ſ -]+$/;
	var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var phoneRegex = /^(\+36)\d{8,9}$/;
	$("div.error-messages").html("Hiba").css({
		"display": "none",
		"color": "#c10037",
		"background-color": "#ffe0e0",
		"padding": "6px 30px",
		"text-align": "left"
	});

	checkInputField(contactName, nameRegex);
	checkInputField(contactEmail, emailRegex);
	checkInputField(contactPhone, phoneRegex);

	if (textMessage.length > 0) {
		if (textMessage.val() == "") {
			textMessage.css("border-bottom", "3px solid #c10037");
			$("#" + textMessage.attr("id") + ":focus").css("border-bottom", "3px solid #7abd23");
			textMessage.next("span.error-messages").css("display", "block");
			if (textMessage.next("span.error-messages").html() !== null ) {
				$("div.error-messages").append(
				"<p>Üzenet: Kötelező mező!</p>");
			};
			$("div.error-messages").css("display", "block");
		}
		else {
			textMessage.css("border-bottom", "3px solid #7abd23");
			textMessage.next("span.error-messages").css("display", "none");
		}
	}

	if (radioGroup.length > 0) {
		checkRadio(radioGroup);
	}

	if ($("div.error-messages").css("display") == "none") {
		return true;
	} 
	else {
		$("html,body").animate({
			scrollTop: $("form").offset().top - 100,
			easing: "easeInOutBack"
		},280);
		return false;
	}
}


function testAndSend () {
	var readytoSend = contactFormValidation();
	if (readytoSend) {
		var success = document.createElement("div");
		$("form input[type='text']").css("border-bottom", "none");
		// $("form input[type='radio']").attr("checked", false);

		if ($("form textarea").length > 0) {
			$(success).html("Köszönjük üzenetét!");
			$("form input[type='text']").css("border-bottom", "1px solid #656862");
			$("form textarea").css("border-bottom", "1px solid #656862");
			ga('send','event','FormSubmit','fromContact','textMessage');
		}
		else {
			$(success).html("Sikeresen regisztráltuk részvételét!");
			ga('send','event','FormSubmit','eventReg','application');
		}

		$(success).attr("class", "container-fluid").css({
			"display": "none",
			"width": "980px",
			"height": "60px",
			"position": "fixed",
			"top": "22px",
			"left": "50%",
			"margin-left": "-490px",
			"padding": "0 10px",
			"line-height": "60px", 
			"color": "#ffffff",
			"background-color": "#3d7f15",
			"text-align": "center",
			"z-index": "650"
		});

		$("body").append(success);
		$(success).fadeIn();
		$(document).click(function () { $(success).fadeOut(); })
		timer = setTimeout(function () {  $(success).fadeOut(); }, 3000);
		return true;
	}
	return false;
}

function smoothScroll () {
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
	smoothScroll();
	var sent = $("form").submit(function() { return testAndSend(); });
	mapLoad();
	var dataGallery	= {
		title: "Cleaning Supplies",
		supplies: ["domestos", "mososzer", "valami mas"]
	}

	if (true) {};
	var html = new EJS({url: 'js/cleaning.ejs'}).render(dataGallery);

	$(html).appendTo($("#gallery div"));
	
}

$(document).ready(initialize);