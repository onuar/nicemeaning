(function (window) {
	"use strict";

	var tooltipControl = function(){
		var maxw = 300;
		var $div = null;

		return {
			show : function(tooltipText){
				this.hide();

				var selection = window.getSelection();
				if (selection.rangeCount==0) {
					return;
				}

				var text = selection.toString();

				var range = selection.getRangeAt(0);
				var $span= $("<span></span>");

				var newRange = document.createRange();
				newRange.setStart(selection.focusNode, range.endOffset);
				newRange.insertNode($span[0]);

				var x = $span.offset().left;
				var y = $span.offset().top;
				$div = $("<div style='background-color:black; z-index:9999;color:white; position:absolute; padding: 5px;'></div>").appendTo($("body"));
				$div.text(tooltipText);
				$div.css({left:x,top:y+(range.getBoundingClientRect().height)});
				$span.remove();

				if($div.offsetWidth > maxw){
					$div.style.width = maxw + 'px';
				}

			},
			hide: function(){
				if($div){
					$div.fadeOut("fast");
					$div = null;
				}
			}
		};
	};

window.tooltip = new tooltipControl();

})(window);
