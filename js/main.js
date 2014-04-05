var map;

function mapLoad () {
	var mapOptions = {
	    zoom: 14,
	    center: new google.maps.LatLng(47.469935, 19.083579)
	  };
	  map = new google.maps.Map(document.getElementById('map-canvas'),
	      mapOptions);
}

function checkRadio(radioGroup) {
    radioGroup.valid = function() {
        for (var i in radioGroup) {
            if (i<3 && radioGroup[i].checked) {
                return i;
            } 
        }
        return false;
    }();

    var errorMessageR = $("#radio-error");
    var labelR = $("p.list-radio");
    if (radioGroup.valid) {
        radioGroup.css("border-bottom", "3px solid #7abd23");
        errorMessageR.css("display", "none");
    }
    else {
        errorMessageR.html("Kötelező mező!");
        radioGroup.css("border-bottom", "3px solid #c10037");
        $("#" + radioGroup.attr("id") + ":focus").css("border-bottom", "3px solid #7abd23");
        errorMessageR.css("display", "block");
        if (errorMessageR.html() !== null ) {
            $("div.error-messages").append(
            "<p>" + labelR.html() + " " + errorMessageR.html() + "</p>");
        };
        $("div.error-messages").css("display", "block");
    }
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
	console.log("test started");
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
    	console.log("textMessage");
	    	if (textMessage.val() == "") {
	    		console.log("try");
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
	console.log(readytoSend);
	if (readytoSend) {
		var success = document.createElement("div");
		$("form input[type='text']").css("border-bottom", "none").val("");
		$("form input[type='radio']").attr("checked", false);

		if ($("form textarea").length > 0) {
			$(success).html("Koszonjuk uzenetet!");
			$("form input[type='text']").css("border-bottom", "1px solid #656862").val("");
			$("form textarea").css("border-bottom", "1px solid #656862").val("");
		}
		else {
			$(success).html("Sikeresen regisztráltuk részvételét!");
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
			"color": "#74c441",
			"background-color": "#ffffff",
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
					scrollTop: target.offset().top-64,
					easing: "easeOutBack"
				}, 1200);
				return false;
			}
		}
	});
}

function initialize() {
	smoothScroll();
	$("form").submit(function() { return testAndSend(); });
	mapLoad();
	// $("#submit-button").click(function() { contactFormValidation(); return false; })
	
}

$(document).ready(initialize);