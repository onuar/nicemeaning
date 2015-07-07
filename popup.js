$(document).ready(function() {
	$("#translate").click(function(){
		var $word = $("#word");
		var text = $word.val();
		if(text){
			translater.get(text, 12, function(translatedData){
				$word.val(translatedData["text"]);
			});
		}
	});

	function onSelectedText(response){
		alert(encodeURIComponent(response.selectedText));
	};

	chrome.tabs.getCurrent(null, function(tab) {
		chrome.tabs.sendRequest(tab.id, {action: "getSelectedText"}, function(response){
		});
	});
});
