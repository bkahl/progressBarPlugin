/***************************************************************************
 *	Author:	Brad Kahl
 *	Date:	11.7.12
 *	Description: dynamically creates a progress bar that shows 3 different
				 colors "red","yellow","green" based upon size.
 **************************************************************************/
function createProgressBar(id, opts){
	
	var elements;
	
	if( opts.background ){
		$('html').removeClass('ie').removeClass('fancy');
		$('body').addClass(opts.background);
	}

	if( opts.type === "subscription" ){
		if ( opts.percentageUsed() >= 100 ) {
		    var img = "<img src='images/warning-flag.png'/><span class='calculatedAmount'></span>";
		    $(id.selector+' .warning-message').show();
		    $(id.selector+' .warning-message > span').text(opts.addCommas(Math.ceil(opts.currentContactUsage-opts.currentContactEntitlement)));
		    $('#progress-bar-'+id.selectorValue).addClass('progress-danger');
		    $(id.selector+' .flag').html(img);
		    $(id.selector+' .calculatedAmount').text(opts.addCommas(Math.ceil(opts.currentContactUsage-opts.currentContactEntitlement)) + ' Over');
		} else if ( opts.percentageUsed() > 80) {
		    var img = "<img src='images/caution-flag.png'/><span class='calculatedAmount'></span>";
		    $(id.selector+' .caution-message').show();
		    $(id.selector+' .caution-amount').text(opts.addCommas(Math.ceil(opts.currentContactEntitlement-opts.currentContactUsage)));
		    $('#progress-bar-'+id.selectorValue).addClass('progress-info');
		    $(id.selector+' .flag').html(img);
		    $(id.selector+' .calculatedAmount').text(opts.addCommas(Math.ceil(opts.currentContactEntitlement-opts.currentContactUsage)) + ' Remaining');
		} else {
		    var img = "<img src='images/under-flag.png'/><span class='calculatedAmount'></span>";
		    $(id.selector+' .under-message').show();
		    $('#progress-bar-'+id.selectorValue).addClass('progress-success');
		    $(id.selector+' .flag').html(img);
		    $(id.selector+' .calculatedAmount').text(opts.addCommas(Math.ceil(opts.currentContactEntitlement-opts.currentContactUsage)) + ' Remaining');
		}

		if(opts.percentageUsed() > 100){ 
			$(id.selector+' .bar').text(opts.addCommas(opts.currentContactUsage) + ' Used')
					.css({'color':'#3B3C43','font-size':'17px','width':'100%'}); 
		}
		else{
			$(id.selector+' .bar').text(opts.addCommas(opts.currentContactUsage) + ' Used')
					.css({'color':'#3B3C43','font-size':'17px','width':opts.percentageUsed()+'%'});
		} 
        
		$(id.selector+' .progressBarData').text(opts.addCommas(Math.ceil(opts.percentageUsed()) + '% OF ' + opts.currentContactEntitlement));
	}else{}

}

function createDefaultProgressBarMarkUp(id, opts){
	
	var element;

	if( opts.type === "subscription" ){
		
		element = "<div class='progress-bar'>";
		    element += "<div class='row'>";
		        element += "<div class='span7'>";
					element += "<br/>";
					element += "<br/>";
					element += "<div>";
						element += "<h6>";
							element += "<span class='title'>"+opts.title+"</span>";
							element += "<span class='progressBarData'>&nbsp</span>";
							element += "<!--[if IE]>";
							element += "<span class='flag' style='width: 335px; text-align: right; right: 130px; position: relative;'></span>";
							element += "-->";
							element += "<!--[if !IE]>";
							element += "<span class='flag'></span>";
							element += "-->";
							element += "<span class='flag'></span>";
						element += "</h6>";
					element += "</div>";
					element += "<div style='clear: both;'></div>";
					element += "<div id='progress-bar-"+id.selectorValue+"' class='progress'>";
						element += "<div class='bar'></div>";
					element += "</div>  <!--close #progress-bar-"+id.selectorValue+"-->";
				element += "</div> <!--close .span7-->";
			element += "</div> <!--close .row-->";
			element += "<br/>";
			element += "<div class='row'>";
				element += "<div class='span7'>";
					element += "<div class='under-message alert alert-success'>"+opts.message.under+"</div>";
					element += "<div class='caution-message alert'>"+opts.message.caution+"</div>";
					element += "<div class='warning-message alert alert-error'>"+opts.message.warning+"</div>";
				element += "</div> <!--close .span7-->";
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
		        background: null,         			//fancy or ie
			    title: "CURRENT CONTACT USAGE:",
				type: 'subscription',
			   	message: {
					under: "You're well within your limit and have room to grow.",
					caution: "Approaching the top of your contact band! You currently have <span class='caution-amount'></span> contacts remaining.",
					warning: "You've exceeded expectations and are currently above your contact band by <span class='caution-amount'></span> contacts."
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
						under: $this.data('under'),
						caution: $this.data('caution'),
						warning: $this.data('warning')
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
	        background: null,         			//fancy or ie
		    title: "CURRENT CONTACT USAGE:",
			type: 'subscription',
		   	message: {
				under: "You're well within your limit and have room to grow.",
				caution: "Approaching the top of your contact band! You currently have <span class='caution-amount'></span> contacts remaining.",
				warning: "You've exceeded expectations and are currently above your contact band by <span class='caution-amount'></span> contacts."
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
