var checkOptionsAndLoadIfNotExist = function () {
	if (localStorage["lang1"] == null) {
		localStorage["lang1"] = "en";
	}
	if (localStorage["lang2"] == null) {
		localStorage["lang2"] = "tr";
	}
}();

chrome.extension.onMessage.addListener(function (request, sender, responseCallback) {
	console.log("background");

	if (request.method === "translate") {
		var langDirection = request.langDirection;
		var word = request.word;

		var langOption = "en-tr";

		switch (langDirection) {
			case 12:
				langOption = "en-tr";
				break;
			case 21:
				langOption = "tr-en";
				break;
		}
		let headers = new Headers();

		headers.set('Authorization', 'Basic ' + base64.encode(username + ":" + password));
		headers.set('Content-Type', 'application/json');

		// + encodeURIComponent(word);
		var url = 'https://api.eu-gb.language-translator.watson.cloud.ibm.com/instances/ba63b938-37ad-4a5a-b1d3-95b627c7fab2/v3/translate?version=2018-05-01';
		fetch(url, {
			method: 'POST',
			headers: headers,
			body: '{"text": ["As far as I understand"], "model_id":"en-tr"}'
		})
			.then(response => response.json())
			.then(text => responseCallback({ text }))
			.catch(error => responseCallback({ error }));
		return true;
	}
	return true;
});
