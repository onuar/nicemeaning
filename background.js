var checkOptionsAndLoadIfNotExist = function () {
	if (localStorage["lang1"] == null) {
		localStorage["lang1"] = "en";
	}
	if (localStorage["lang2"] == null) {
		localStorage["lang2"] = "tr";
	}
}();

chrome.extension.onMessage.addListener(function (request, sender, responseCallback, errorCallback) {
	if (request.method === "translate") {
		var langDirection = request.langDirection;
		var word = request.word;

		var langOption = "en-tr";

		switch (langDirection) {
			case 12:
				langOption = localStorage["lang1"] + "-" + localStorage["lang2"];
				break;
			case 21:
				langOption = localStorage["lang2"] + "-" + localStorage["lang1"];
				break;
		}

		var url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20130916T145020Z.643435665c8261bd.8ceaf0d11d4b6392293327da6b5e2fb797989aa8&lang=' + langOption + '&text=' + encodeURIComponent(word);
		fetch(url)
			.then(response => response.json())
			.then(text => responseCallback({ text }))
			.catch(error => errorCallback({ error: error }));
		return true;
	}
	else {
		responseCallback({ data: "Not implemented method." });
	}
});
