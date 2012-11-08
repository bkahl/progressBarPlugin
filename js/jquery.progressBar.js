/***************************************************************************
 *	Author:	Brad Kahl
 *	Date:	11.7.12
 *	Description: dynamically creates a progress bar that shows 3 different
				 colors "red","yellow","green" based upon size.
 **************************************************************************/
function createProgressBar(id, opts){

	console.log(opts);
	
	var elements;
		
	$('body').addClass(opts.chooseBackground);

	if ( opts.percentageUsed() >= 100 ) {
	    var img = "<img src='images/warning-flag.png' width='16' height='16' style='position: relative; top:3px;'/><span class='calculatedAmount' style='margin-left: 5px;'></span>";
	    $('#warning-message').show();
	    $('#warning-message > span').text(opts.addCommas(Math.ceil(opts.currentContactUsage-opts.currentContactEntitlement)));
	    $('#progress-bar').addClass('progress-danger');
	    $('.flag').html(img);
	    $('.calculatedAmount').text(opts.addCommas(Math.ceil(opts.currentContactUsage-opts.currentContactEntitlement)) + ' Over');
	} else if ( opts.percentageUsed() > 80) {
	    var img = "<img src='images/caution-flag.png' width='16' height='16' style='position: relative; top:3px;'/><span class='calculatedAmount' style='margin-left: 5px;'></span>";
	    $('#caution-message').show();
	    $('#caution-amount').text(opts.addCommas(Math.ceil(opts.currentContactEntitlement-opts.currentContactUsage)));
	    $('#progress-bar').addClass('progress-info');
	    $('.flag').html(img);
	    $('.calculatedAmount').text(opts.addCommas(Math.ceil(opts.currentContactEntitlement-opts.currentContactUsage)) + ' Remaining');
	} else {
	    var img = "<img src='images/under-flag.png' width='16' height='16' style='position: relative; top:3px;'/><span class='calculatedAmount' style='margin-left: 5px;'></span>";
	    $('#under-message').show();
	    $('#progress-bar').addClass('progress-success');
	    $('.flag').html(img);
	    $('.calculatedAmount').text(opts.addCommas(Math.ceil(opts.currentContactEntitlement-opts.currentContactUsage)) + ' Remaining');
	}

	if(opts.percentageUsed() > 100){ $('.bar').css('color','#3B3C43').css('font-size','17px').css('width','100%').text(opts.addCommas(opts.currentContactUsage) + ' Used'); }
	else $('.bar').css('color','#3B3C43').css('font-size','17px').css('width',opts.percentageUsed()+'%').text(opts.addCommas(opts.currentContactUsage) + ' Used');
        
	$('.progressBarData').text(opts.addCommas(Math.ceil(opts.percentageUsed()) + '% OF ' + opts.currentContactEntitlement));

}

(function( $ ){
	
	$.fn.progressBar = function(options){
		var id = $(this), defaults, opts;
		
		defaults = {
	       currentContactUsage: 90,        		//contactusageData[0].count, //max
	       currentContactEntitlement: 100,    	//entitlementsData[0].Count, //used
	       chooseBackground: 'fancy',         	//fancy or ie
	       percentageUsed: function(){
	         return (this.currentContactUsage/this.currentContactEntitlement)*100;
	       },           
	       addCommas: function(nStr){
	         	nStr += '';
	        	x = nStr.split('.');
	        	x1 = x[0];
	        	x2 = x.length > 1 ? '.' + x[1] : '';
	        	var rgx = /(\d+)(\d{3})/;
	        	while (rgx.test(x1)) {
	        		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	        	}
	        	return x1 + x2;
	       }
	
	     };
	
	    opts = $.extend(true, defaults, options);

        createProgressBar(id, opts);

        return this;

	};
	
	$('body').progressBar();
	
} (jQuery) );
