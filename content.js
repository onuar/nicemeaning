$(document).ready(function() {
	function onKeyUp (e) { 
		var selection = window.getSelection();
		var text = selection.toString().trim();
		
		switch(e.which) { 
			case 110:   // n letter
			case 78:    // N letter
				if(text){
					getTranslation(text, function(translatedData){
						// alert(translatedData.translations[0].translation);
						 tooltip.show(translatedData["text"]);
					});
					
					// alert("my word12: "+ text);           
				}
			break; 
		}
	};
	
	function getTranslation(word, callback) {
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
	// Note that any URL fetched here must be matched by a permission in
	// the manifest.json file!
	// var url = 'http://api.seslisozluk.com/?key=1234567890abcdef&query='+ encodeURIComponent(word) +'&lang_from=en&lang_to=tr';
	 var url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20130916T145020Z.643435665c8261bd.8ceaf0d11d4b6392293327da6b5e2fb797989aa8&lang=en-tr&text='+ encodeURIComponent(word);
	xhr.open('GET', url, true);
	xhr.send();
};
	
	function onClicked(e){
		tooltip.hide();
	};

	$("body").keyup(onKeyUp);
	$("body").click(onClicked);
});