$(document).ready(function() {
	function onKeyUp (e) { 
		var selection = window.getSelection();
		var text = selection.toString().trim();
		
		switch(e.which) { 
			case 110:   // n letter
			case 78:    // N letter
				if(text){
					getTranslation(text, 12, function(translatedData){
						 tooltip.show(translatedData["text"]);
					});
				}
			break; 
			case 109:   // m letter
			case 77:    // M letter
				if(text){
					getTranslation(text, 21, function(translatedData){
						 tooltip.show(translatedData["text"]);
					});
				}
			break; 
		}
	};
	
	function getTranslation(word, langOption, callback) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(data) {
		
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				var data = JSON.parse(xhr.responseText);
				callback(data);
			} else {
				callback(null);
			}
		}
	}
	
	var lang1;
	chrome.extension.sendMessage( { method: "getLocalStorage", key: "lang1" }, function(response) {
	lang1 =  response.data;
	
	var lang2;
	chrome.extension.sendMessage( { method: "getLocalStorage", key: "lang2" }, function(response) {
		lang2 =  response.data;
		
		var langDirection;
		switch(langOption){
			case 12:
				langDirection = lang1 + "-" + lang2;
				break;
			case 21:
				langDirection = lang2 + "-" + lang1;
				break;
		}
		
		var url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20130916T145020Z.643435665c8261bd.8ceaf0d11d4b6392293327da6b5e2fb797989aa8&lang='+langDirection+'&text='+ encodeURIComponent(word);
		xhr.open('GET', url, true);
		xhr.send();
		});
	});
};
	
	function onClicked(e){
		tooltip.hide();
	};

	$("body").keyup(onKeyUp);
	$("body").click(onClicked);
});