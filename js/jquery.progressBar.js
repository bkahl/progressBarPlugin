/***************************************************************************
 *	Author:	Brad Kahl
 *	Date:	11.7.12
 *	Description: dynamically creates a progress bar that shows 3 different
				 colors "red","yellow","green" based upon size.
 **************************************************************************/

// function that removes values from an array
Array.prototype.remove= function(){
    var what, a= arguments, L= a.length, ax;
    while(L && this.length){
        what= a[--L];
        while((ax= this.indexOf(what))!= -1){
            this.splice(ax, 1);
        }
    }
    return this;
}

function createProgressBar(id, opts){
	
	var remaingingElement, remainingAmt;
	
	if( opts.background ){
		$('html').removeClass('ie').removeClass('fancy');
		$('body').addClass(opts.background);
	}

	console.log('location : ',window.navigator.appName);
	
	if( opts.type === "subscription" ){
		
		$(id.selector+' > .progress-bar').addClass('subscription');
		
		// add commas to numbers that need them and split into array removing any '-' values.
		remainingAmt = opts.addCommas(Math.ceil(opts.currentContactUsage-opts.currentContactEntitlement)).split('');
		remainingAmt = remainingAmt.remove('-').join('');
		
		if ( opts.percentageUsed() >= 100 ) {
		    remaingingElement = "<span class='remaining error-flag'></span><span class='remaining-amount'></span>";
		    $(id.selector+' .error-message').show();
		    $('#progress-bar-'+id.selectorValue).addClass('progress-error');
		    $(id.selector+' .flag').html(remaingingElement);
		    $(id.selector+' .remaining-amount').text(remainingAmt + ' Over');
		} else if ( opts.percentageUsed() > 80) {
		    remaingingElement = "<span class='remaining danger-flag'></span><span class='remaining-amount'></span>";
		    $(id.selector+' .danger-message').show();
		    $('#progress-bar-'+id.selectorValue).addClass('progress-danger');
		    $(id.selector+' .flag').html(remaingingElement);
		    $(id.selector+' .remaining-amount').text(remainingAmt + ' Remaining');
		} else {
		    remaingingElement = "<span class='remaining success-flag'></span><span class='remaining-amount'></span>";
		    $(id.selector+' .success-message').show();
		    $('#progress-bar-'+id.selectorValue).addClass('progress-success');
		    $(id.selector+' .flag').html(remaingingElement);
		    $(id.selector+' .remaining-amount').text(remainingAmt + ' Remaining');
		}

		if(opts.percentageUsed() > 100){ 
			$(id.selector+' .bar').text(opts.addCommas(opts.currentContactUsage) + ' Used')
					.css({'color':'#3B3C43','font-size':'17px','width':'100%'}); 
		}
		else{
			$(id.selector+' .bar').text(opts.addCommas(opts.currentContactUsage) + ' Used')
					.css({'color':'#3B3C43','font-size':'17px','width':opts.percentageUsed()+'%'});
		} 
        
		$(id.selector+' .percentage-out-of').text(opts.addCommas(Math.ceil(opts.percentageUsed()) + '% OF ' + opts.currentContactEntitlement));
		$(id.selector+' .alert-amount').text(remainingAmt);
		
	}else{}

}

function createDefaultProgressBarMarkUp(id, opts){
	
	var element;

	if( opts.type === "subscription" ){
		
		element = "<div class='progress-bar'>";
		    element += "<div class='row pg-bar-calculation'>";
				element += "<div class='heading'>";
					element += "<span class='title'>"+opts.title+"</span>";
					element += "<span class='percentage-out-of'>&nbsp</span>";
					element += "<!--[if IE]>";
					element += "<span class='flag'></span>";
					element += "-->";
					element += "<!--[if gt IE 8]><!-->";
					element += "<span class='flag'></span>";
					element += "<!--<![endif]-->";
				element += "</div>";
				element += "<div id='progress-bar-"+id.selectorValue+"' class='progress'>";
					element += "<div class='bar'></div>";
				element += "</div>  <!--close #progress-bar-"+id.selectorValue+"-->";
			element += "</div> <!--close .row-->";
			element += "<div class='row pg-bar-alert-message'>";
					element += "<p class='alert success-message'>"+opts.message.success+"</p>";
					element += "<p class='alert danger-message'>"+opts.message.danger+"</p>";
					element += "<p class='alert error-message'>"+opts.message.error+"</p>";
			element += "</div> <!--close .row-->";
		element += "</div> <!--close .progress-bar-->";
		
	}else{}
	
	$(id.selector).append(element);	
}

(function( $ ){
	
	// progressBar method using data() call
	$.fn.progressBarData = function(){
		
		var $this,
			opts,
			id,
			defaults = {
		        currentContactUsage: 0,        		//contactusageData[0].count, //max
		        currentContactEntitlement: 100,    	//entitlementsData[0].Count, //used
			    title: "CURRENT CONTACT USAGE:",
		        background: null,			        //ie and fancy,
				theme: null,
			   	message: {
					success: "You're well within your limit and have room to grow. You currently have <span class='alert-amount'></span> contacts remaining.",
					danger: "Approaching the top of your contact band! You currently have <span class='alert-amount'></span> contacts remaining.",
					error: "You've exceeded expectations and are currently above your contact band by <span class='alert-amount'></span> contacts."
				},
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

		this.each(function() {

			var $this = $(this),
				id = { 
					// NOTE: need to fix so it checks for same data-id, potentially could cause issues
					"selector": '.progressBar[data-id='+$this.data('id')+']',
					"selectorValue": 'data-'+$this.data('id')
				},
				opts = {
			        currentContactUsage: $this.data('usage'),
			        currentContactEntitlement: $this.data('max'),
			        background: $this.data('background'),    
				    title: $this.data('title'),
					type: $this.data('type'),
					message: {
						under: $this.data('success'),
						caution: $this.data('danger'),
						warning: $this.data('error')
					}
				};

			opts = $.extend(true, defaults, opts);
			
			createDefaultProgressBarMarkUp(id, opts);
			
			createProgressBar(id, opts);
			
		});

	};

	$('.progressBar').progressBarData();
	
	// progressBar method used by plugin call
	$.fn.progressBar = function(options){
		
		var defaults, 
			opts,
			$this = $(this),
			id = { 
				"selector": $this.selector,
				"selectorValue": $this.selector.split('')[1]
			};
		
		defaults = {
	        currentContactUsage: 0,        		//contactusageData[0].count, //max
	        currentContactEntitlement: 100,    	//entitlementsData[0].Count, //used
	        background: null,		        	//ie and fancy,
			theme: null,
		    title: "CURRENT CONTACT USAGE:",
			type: 'subscription',
		   	message: {
				success: "You're well within your limit and have room to grow. You currently have <span class='alert-amount'></span> contacts remaining.",
				danger: "Approaching the top of your contact band! You currently have <span class='alert-amount'></span> contacts remaining.",
				error: "You've exceeded expectations and are currently above your contact band by <span class='alert-amount'></span> contacts."
			},
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

		createDefaultProgressBarMarkUp(id, opts);
		
        createProgressBar(id, opts);

        return this;

	};
	
} (jQuery) );
