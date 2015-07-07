$(document).ready(function() {
	var load = function(){
		//var url = chrome.extension.getURL('/languages.json');

		var $cmb1 = $("#cmb1");
		var $cmb2 = $("#cmb2");

		ajaxCall.callGetJson("/languages.json", function(data){
			  $.each(data.langs,function(key,val){
				var $option = $(stringFormat("<option value='{0}'>{1} ({2})</option>",key,val,key));

				$cmb1.append($option);
				$cmb2.append($option.clone());
			  });

			  var lang1 = localStorage["lang1"];
			  var lang2 = localStorage["lang2"];

			  $cmb1.val(lang1);
			  $cmb2.val(lang2);
			});
	};

	var stringFormat = function(str){
        for (var i = 1; i < arguments.length; i++) {
            str = str.replace('{' + (i - 1) + '}', arguments[i]);
        }
        return str;
    };

	$("#btnSave").click(function(){
		//todo: translation direction'u languages.json'dan kontrol et.
		var $cmb1 = $("#cmb1");
		var $cmb2 = $("#cmb2");

		localStorage["lang1"] = $cmb1.val();
		localStorage["lang2"] = $cmb2.val();

		alert("Options saved! Aferim.");
	});

	load();
});
