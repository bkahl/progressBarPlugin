//obsolete
//function setBttnClass__(element, strClassName) 
//{
//    if (element) 
//    {
//            element.className = strClassName;
//            if (element.all) 
//            {
//                var eText = element.all('BttnText')
//                if (eText) 
//                {
//                    eText.className = strClassName;
//                }
//            }
//    }
//}

//~VS- jquery
//sets the Bttn Class 
function setBttnClass(element, strClassName) {
    $(element).attr('class', '');
    $(element).attr('class', strClassName);
    var childElements = $(element).children();
    if (childElements.length > 0) {
        $(element).children().find('#BttnText').attr('class', '');
        $(element).children().find('#BttnText').attr('class', strClassName);
        //Works correctly on FF but fails on IE : Applying Condition
//        if (!jQuery.browser.msie && $(element).children().find('img')) {
//            $(element).children().attr('class', '');
//            $(element).children().attr('class', strClassName);
//        }
    }
}

function setimageup(tgElmtID, grpBase){
    var tgElmt;
    tgElmt=document.getElementById(tgElmtID);
    tgElmt.src='/eloquaimages/' + grpBase + '-up.gif';
}
function setimagedown(tgElmtID, grpBase){
    var tgElmt;
    tgElmt=document.getElementById(tgElmtID);	
    tgElmt.src='/eloquaimages/' + grpBase + '-down.gif';
}
var blnExpConExpanded=false;
var strOriginalBorderStyle;
function SetExpConImage(){
	var blnPtExp;
	var ExpConDiv;
	if(parent.GetExpandedStatus){
		blnPtExp=parent.GetExpandedStatus();
	}else{
		blnPtExp=false;
	}
	if(blnPtExp){
		ExpConDiv=document.getElementById("ExpConContracted");
		if(ExpConDiv){
			document.getElementById("ExpConContracted").style.display='none';
		}
		ExpConDiv=document.getElementById("ExpConExpanded");
		if(ExpConDiv){
			document.getElementById("ExpConExpanded").style.display='inline';
		}
	}else{
		ExpConDiv=document.getElementById("ExpConContracted");
		if(ExpConDiv){
			document.getElementById("ExpConContracted").style.display='inline';
		}
		ExpConDiv=document.getElementById("ExpConExpanded");
		if(ExpConDiv){
			document.getElementById("ExpConExpanded").style.display='none';
		}
	}
}
function GetExpandedStatus(){
	return blnExpConExpanded;
}
function GetParentExpandedStatus(){
	var blnPtExp;
	if(parent.GetExpandedStatus){
		blnPtExp=parent.GetExpandedStatus();
	}else{
		blnPtExp=false;
	}
	return blnPtExp;
}
function ExpConForce(blnExp){
	if (this.ExpConForceLocal){
		ExpConForceLocal(blnExp);
	}
	if(parent.ExpConForce){
		if(parent != this){
			parent.ExpConForce(blnExp);
		}
	}
	if(blnExp){
		strOriginalBorderStyle=document.body.style.border;
		document.body.style.border=0;
	}else{
		document.body.style.border=strOriginalBorderStyle;
	}
	blnExpConExpanded=blnExp;
	SetExpConImage();
}
function ExpConFlip(){
	var blnExp;
	blnExp=GetParentExpandedStatus();
	if(parent.ExpConForce){
		if(parent != this){
			parent.ExpConForce(!blnExp);
		}
	}else{
		//alert('ExpConForce function not found in ' + parent.location.href + ' from ' + location.href);
	}
	SetExpConImage();
}

function convertToFull(strSimpleText){
	return strSimpleText;
	var re;
	re = /\n/g;
	var strHTMLText;
	strHTMLText = strSimpleText;
	strHTMLText = strHTMLText.replace(re, '<br>');

	re = /\r/g;
	strHTMLText = strHTMLText.replace(re, '');
	

	return strHTMLText;
}

function cancelSubmitOnEnter() {
	return !(window.event && window.event.keyCode == 13);
}

function browseSmartPacks(objectType) {

    
    elqOpenInFrame("/ImportExport/SmartPackImport.aspx?xsrfToken=" + getXsrfToken() + "&IdentifierCode=" + objectType, this.TargetFrame);   
}

function getUserFormID() {
	if(this.intUserFormID_JS){
	    return this.intUserFormID_JS;
	}
    else if(document.getElementById('UserFormList')){
	    return document.getElementById('UserFormList').value;
	}
	else{
	    return '';
	}
}


/*
$(document).ready(function() {

 $("#BttnText").hover(

        function() {
            $(this).removeClass("BttnLowNewToolbar2");
            $(this).addClass("BttnHighNewToolbar2");
        },

        function() {
            $(this).removeClass("BttnHighNewToolbar2");
            $(this).addClass("BttnLowNewToolbar2");
        }
    );

    $("#mydashboard2_20x20").hover(

        function() {
            $(this).removeClass("BttnLowNewToolbar2");
            $(this).addClass("BttnHighNewToolbar2");
        },

        function() {
            $(this).removeClass("BttnHighNewToolbar2");
            $(this).addClass("BttnLowNewToolbar2");
        }
    );



});*/