chrome.extension.onMessage.addListener(function (request, sender, responseCallback) {
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
		let username = 'apikey';
		let password = 'IlJ7G4k_vM90ZzEGKce8ObgeEno_UBAocvWYHZ1KDAQn';

		headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
		headers.set('Content-Type', 'application/json');

		let paramBody = {
			text: word,
			model_id: 'en-tr'
		};

		var url = 'https://api.eu-gb.language-translator.watson.cloud.ibm.com/instances/ba63b938-37ad-4a5a-b1d3-95b627c7fab2/v3/translate?version=2018-05-01';
		fetch(url, {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(paramBody)
		})
			.then(response => response.json())
			.then(response => responseCallback({ response }))
			.catch(error => responseCallback({ error }));
		return true;
	}
	return true;
});
