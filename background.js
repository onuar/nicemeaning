var checkOptions = function(){
	if(localStorage["lang1"] == null){
		localStorage["lang1"] = "en";
	}
	if(localStorage["lang2"] == null){
		localStorage["lang2"] = "tr";
	}
};

chrome.extension.onMessage.addListener(function(request, sender, responseCallback) {
    if(request.method === "getLocalStorage"){
		responseCallback({ data: localStorage[request.key] });
	} else {
		responseCallback({ data: "Not implemented method." });
	}
});

checkOptions();
