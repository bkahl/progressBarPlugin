var XMLRequest;
var count = 0;
var requestQueueArray = new Array();
var tempRequest;
var failure =0;
var queueThreshold  = 40;
var objType = '';
var blnDebug = true;
//takes parameters for a request, and pushes them onto the request Queue
//if the request object is available it'll process it immediately,
//otherwise a timeout is set and it will occur at some other interval
function request(url, readyStateChangedFunction, async, type)
{
	requestQueueArray.push(new requestObject(url, readyStateChangedFunction, async, type));
	if (!callInProgress(XMLRequest))
	{
		processRequest();
		count ++;
		if (count > 20){count = 0;}
	}
	else{checkRequestQueue();}
}
//this function actually sends the request to the remote sever.
//if an exception occurs the user has the opportunity to re-try the action
function processRequest()
{
	try
	{
		tempRequest = requestQueueArray.pop();
		
		var urlArray = tempRequest.url.split("?")
		var url = urlArray[0];
		var querystring = urlArray[1];
		
		if (url == '')
		    url = tempRequest.url
		
		XMLRequest = null;
		XMLRequest = CreateXMLHTTP();

		//onreadystatechange is not called for synchronous call in FireFox
		if (isBrowserIE || tempRequest.async) {
		    XMLRequest.onreadystatechange = tempRequest.method;
		}
		XMLRequest.open('POST', url, tempRequest.async);
		XMLRequest.setRequestHeader("Pragma", "no-cache");
		XMLRequest.setRequestHeader("Cache-Control","no-cache");
                
        if (querystring) {
            XMLRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            XMLRequest.send(querystring);
        } else {
		    XMLRequest.send(null);
		}
		if (!isBrowserIE && !tempRequest.async) {
		    tempRequest.method(); 
		}
		checkRequestQueue();
		tempRequest = null;
	}
	catch(e){
		if (blnDebug) alert(e.message);
	}
}
//this function handles the creation of the built in XMLHTTP Object.  
//If other browsers need to be supported, just this function needs to be changed.
function CreateXMLHTTP()
{	
	var returnObject = null;

	if (window.ActiveXObject)
	{
		if (objType != ''){try{returnObject = new ActiveXObject(objType);}catch(x){}}
		else
		{
			try{returnObject = new ActiveXObject('MSXML2.XMLHTTP.4.0'); objType = 'Msxml2.XMLHTTP.4.0';}catch(x){}
			if (returnObject == null)
			{
				try{returnObject = new ActiveXObject('MSXML2.XMLHTTP.3.0'); objType = 'MSXML2.XMLHTTP.3.0';}catch(x){}
			}
			if (returnObject == null)
			{
				try{returnObject = new ActiveXObject('MSXML2.XMLHTTP'); objType = 'MSXML2.XMLHTTP';}catch(x){}
			}
			if (returnObject == null)
			{
				try{returnObject = new ActiveXObject('Microsoft.XMLHTTP'); objType = 'Microsoft.XMLHTTP';}catch(x){}
			}
		}
	}
	else
	{	
		try{returnObject = new XMLHttpRequest();}catch(x){}
	}
	return returnObject;
}

function CreateXMLDOM()
{
	try{return new ActiveXObject('MSXML2.DOMDocument.4.0');}catch(x){}
	try{return new ActiveXObject('MSXML2.DOMDocument.3.0');}catch(x){}
	try{return new ActiveXObject('MSXML2.DOMDocument');}catch(x){}
	try{return new ActiveXObject('Microsoft.XMLDOM');}catch(x){}
	throw(new Error(-1,'Cant Create XMLDOM'));
}

//handles various types of error messages which may happend whilst processing the request.
function RequestError(type, message)
{
	switch(type)
	{
		case 'timeout':
			failure = failure + 1;
			alert('A timeout occured during your request. XMLHTTP object state: ' + message);
			break;
		case 'exception':
			alert('An excpetion occured during your request.' + message);
			break;
		default:
			alert('An unknown error occurred during your request.');
			break;
	}	
}

//this function checks to see if the request object is currently busy/waiting or if it
//is free to handle the next event.
function callInProgress() {
	var returnVal = false;
	if (XMLRequest)
	{
		switch ( XMLRequest.readyState ) {
			case 1:
				returnVal = true;
				break;
			case 2:
				returnVal = true;
				break;
			case 3:
				returnVal = true;
				break;
		}
	}
	return returnVal;
}


//This function handles the processing of events.  If the queue starts building up,
//it will increase the timeout length, and hopefully conditions will get better.
//It will puke when the queue gets too large, and just force a *hard* refresh.
function checkRequestQueue()
{
	if (checkRequestQueue != null)
	{
		if (requestQueueArray.length > 0) 
		{
			if (!callInProgress(XMLRequest))
			{
				processRequest();
			}
			else if (requestQueueArray.length < queueThreshold)
			{
				setTimeout('checkRequestQueue();', 50);
			}
			else if (requestQueueArray.length > queueThreshold)
			{
				ReloadPolling();
			}
		}
	}
}

//This is the object which gets stored in the queue array.  It holds the basic information required in order to make a request.
function requestObject(iUrl, iMethod, iAsync, iType)
{
	this.url = iUrl;
	this.method = iMethod;
	this.async = iAsync;
	this.type = iType;
}

function ReloadPolling(){
	requestQueueArray = null;
	requestQueueArray = new Array();
}

function handleError(err, strResponseText)
{
	if (blnDebug){ alert(err);}
}

if(typeof Array.prototype.pop=='undefined')
Array.prototype.pop=function(){
var b=this[this.length-1];
this.length--;
return b;
};

if(typeof Array.prototype.push=='undefined')
Array.prototype.push=function(){
var i=0,b=this.length,a=arguments;
for(i;i<a.length;i++)
this[b+i]=a[i];
return this.length;
};