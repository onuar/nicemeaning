(function (window) {
	"use strict";

	var translater = function(){
			return{
				get: function(word, langOption, callback){
					var lang1;
					chrome.extension.sendMessage( { method: "getLocalStorage", key: "lang1" }, function(response) {
						lang1 =  response.data;

						var lang2;
						chrome.extension.sendMessage( { method: "getLocalStorage", key: "lang2" }, function(response) {
							lang2 =  response.data;

							var langDirection;
							switch(langOption){
								case 12:
									langDirection = lang1 + "-" + lang2;
									break;
								case 21:
									langDirection = lang2 + "-" + lang1;
									break;
							}

							var url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20130916T145020Z.643435665c8261bd.8ceaf0d11d4b6392293327da6b5e2fb797989aa8&lang='+langDirection+'&text='+ encodeURIComponent(word);
							ajaxCall.callGet(url, function(data){
								callback(data);
							});
							});
					});
				}
			};
	};

	window.translater = new translater();
})(window);
