/**
 * Abbreviator jQuery Plugin (jQuery >= 1.2.x)
 *
 * Usage:
 *
 *   $('#mydiv').abbrev(); // Autofit mydiv's innerHTML content horizontally
 *
 * This work is distributed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2008 Ben Vinegar [ ben ! benlog dot org ]
 */

(function($) {
	$(function() { 
		$('body').append(
			'<span id="abbreviator-tmp-span" style="display: none; position: absolute"/>'
		);
	});
	
	$.fn.abbrev = function() {
		$(this).each(function() {
			
			// Grab unaltered content FIRST
			var content = $(this).html();
			
			// Append our tmp span to the container element we're about
			// to abbreviate, so that it inherits the containers CSS properties
			// (font, padding, etc.)
			$("#abbreviator-tmp-span").appendTo(this);
			
			var containerWidth = $(this).width();
			var contentWidth = $("#abbreviator-tmp-span").html(content).width();

			// If the content fits inside the container, then skip
			// to the next element
			
			if (contentWidth <= containerWidth) {
				return;
			}
			
			// Otherwise, shorten content to fit
			
			var coverage = containerWidth / contentWidth;
			var l = content.length;

			abbrevContent = content.substr(0, parseInt(l * coverage));
		   	
			while ($('#abbreviator-tmp-span').html(ellipsifyString(abbrevContent)).width() >= containerWidth) {
				abbrevContent = abbrevContent.substring(0, abbrevContent.length - 1);
			}
			
			// Return our tmp span back to the <body> element; otherwise it'll
			// be destroyed in the line below ...
			$('#abbreviator-tmp-span').appendTo('body');
			
			$(this).html(abbrString(ellipsifyString(abbrevContent), content));
		});
	}
	
	// Private functions
	
	function ellipsifyString(s) {
		return s + '&hellip;';
	}
	
	function abbrString(s, full) {
		return '<abbr title="' + full + '">' + s + '</abbr>';
	}
})(jQuery);