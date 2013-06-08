$(document).ready(function() {

	// Show IP at the bottom left for these websites
	var noRight = new Array(
		"www.facebook.com",
		"www.google.com"
	);

	var div_align;
	if ($.inArray(window.location.host, noRight) >= 0) {
		div_align = "left";
	}
	else {
		div_align = "right";
	}

	chrome.extension.sendMessage({op: "getip"}, function(response) {
		var ip = response.ip;
		chrome.extension.sendMessage({op: "is_enabled"}, function(response) {
			var ext_enabled = response.ext_enabled;
			if (ext_enabled == 1 || ext_enabled === undefined) {
				$("body").append('<div id="chrome_websiteIP" class="chrome_websiteIP_' + div_align + '">' + ip + '</div>');
			}
		});
	});

	$("#chrome_websiteIP").live('mouseover', function() {
		if ($(this).hasClass('chrome_websiteIP_right')) {
			$(this).removeClass("chrome_websiteIP_right");
			$(this).addClass("chrome_websiteIP_left");
		}
		else {
			$(this).removeClass("chrome_websiteIP_left");
			$(this).addClass("chrome_websiteIP_right");
		}
	});
});

// popup button clicked
document.addEventListener('DOMContentLoaded', function () {
	chrome.extension.sendMessage({name: "getOptions"}, function(response) {
		$("#EnableDisableIP").val(response.enableDisableIP);
	});
	
	document.querySelector('input').addEventListener('click', function() {
		if ($('#EnableDisableIP').val() == "Disable") {
			// save to localstore
			chrome.extension.sendMessage({name: "setOptions", status: 'Enable'}, function(response) {});
			$('#EnableDisableIP').val('Enable')	
		}
		else if ($('#EnableDisableIP').val() == "Enable") {
			// save to localstore
			chrome.extension.sendMessage({name: "setOptions", status: 'Disable'}, function(response) {});
			$('#EnableDisableIP').val('Disable')
		}
	});
});
