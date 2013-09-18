(function (window) {
    "use strict";
	
	var ajaxCall = function(){
		return{
			callGetJson : function(jsonFile, responseCallback){
				if(typeof responseCallback !== "function"){
					return;
				}	
				$.getJSON(jsonFile, function(data) {
					responseCallback(data);
				});
			},
			callGet : function(url,responseCallback){
				if(typeof responseCallback !== "function"){
					return;
				}	
				$.get(url, function(data) {
					responseCallback(data);
				});
			}
		};
	};

window.ajaxCall = new ajaxCall();
})(window);