var checkOptions = function(){
	if(localStorage["lang1"] == null){
		localStorage["lang1"] = "en";
	}
	if(localStorage["lang2"] == null){
		localStorage["lang2"] = "tr";
	}
};

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.method === "getLocalStorage"){
		sendResponse({ data: localStorage[request.key] });
	} else {
		sendResponse({ data: "Not implemented method." });
	}
});

checkOptions();