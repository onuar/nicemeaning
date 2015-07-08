$(document).ready(function() {
	$("#translate").focus();

	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendRequest(tab.id, {action:"getSelectedText"}, function(response){
			$("#word").val(response.selectedText);
		});
	});

	$("#translate").click(function(){
		var $word = $("#word");
		var text = $word.val();
		if(text){
			translater.get(text, 12, function(translatedData){
				$("#result").val(translatedData["text"]);
			});
		}
	});
});
