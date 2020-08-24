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
							if (response.text.code !== undefined) {
								tooltip.show("Yandex says: Maximum monthly translated text volume exceeded");
								return;
							}
							tooltip.show(response.text["text"].join(","));
						});
				}
				break;
			case 109:   // m letter
			case 77:    // M letter
				if (text) {
					chrome.runtime.sendMessage({ method: "translate", word: text, langDirection: 21 },
						function (response) {
							if (response.text.code !== undefined) {
								tooltip.show("Yandex says: Maximum monthly translated text volume exceeded");
								return;
							}
							tooltip.show(response.text["text"].join(","));
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
