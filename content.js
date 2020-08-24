$(document).ready(function () {
	$("body").keyup(function (e) {
		var selection = window.getSelection();
		var text = selection.toString().trim();

		switch (e.which) {
			case 110:   // n letter
			case 78:    // N letter
				if (text) {
					chrome.runtime.sendMessage({ method: "translate", word: text, langDirection: 12 },
						function (response) {
							console.log(JSON.stringify(response));
							// tooltip.show(response);
						});
				}
				break;
			case 109:   // m letter
			case 77:    // M letter
				if (text) {
					chrome.runtime.sendMessage({ method: "translate", word: text, langDirection: 21 },
						function (response) {
							console.log(JSON.stringify(response));
							// tooltip.show(response);
						});
				}
				break;
		}
	});

	$("body").click(function (e) {
		tooltip.hide();
	});

	chrome.extension.onRequest.addListener(function (request, sender, responseCallback) {
		if (request.action === "getSelectedText") {
			responseCallback({ selectedText: window.getSelection().toString() });
		} else {
			responseCallback({});
		}
	});
});
