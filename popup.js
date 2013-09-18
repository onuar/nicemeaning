	var lang1;
	chrome.extension.sendMessage( { method: "getLocalStorage", key: "lang1" }, function(response) {
		lang1 =  response.data;
	});
	console.log(lang1);
	
	var lang2;
	chrome.extension.sendMessage( { method: "getLocalStorage", key: "lang2" }, function(response) {
		lang2 =  response.data;
	});
	console.log(lang2);