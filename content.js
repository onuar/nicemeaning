$(document).ready(function() {
	$("body").keyup(function (e) {
		var selection = window.getSelection();
		var text = selection.toString().trim();

		switch(e.which) {
			case 110:   // n letter
			case 78:    // N letter
				if(text){
					translater.get(text, 12, function(translatedData){
						 tooltip.show(translatedData["text"]);
					});
				}
			break;
			case 109:   // m letter
			case 77:    // M letter
				if(text){
					translater.get(text, 21, function(translatedData){
						 tooltip.show(translatedData["text"]);
					});
				}
			break;
		}
	});

	$("body").click(function(e){
		tooltip.hide();
	});

	chrome.extension.onRequest.addListener(function(request, sender, responseCallback) {
			if (request.action === "getSelectedText") {
				responseCallback({selectedText: window.getSelection().toString()});
			} else {
				responseCallback(null);
			}
		});
});
