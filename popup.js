$(document).ready(function() {
	$("#translate").click(function(){
		var $word = $("#word");
		var selection = window.getSelection();
		$word.val(selection);
	});
	
	function onSelectedText(response){
		alert(encodeURIComponent(response.selectedText));
	};

	chrome.tabs.getCurrent(null, function(tab) {
		chrome.tabs.sendRequest(tab.id, {action: "getSelectedText"}, function(response){
		});
	});
});