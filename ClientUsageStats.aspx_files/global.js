/* ----------- Global Javascript Event Handling: Start ---------- */
 
var EventType = {
	RefreshRecentItems: 1,
	Rename: 2,
	Highlight: 3,
	RemovedItem: 4,
	AddedItem: 5,
	RefreshTreeview: 6
};

var RemovalType = {
	Delete: 1,
	Archive: 2
};



function RaiseAddedItemEvent(productType){
    var eh = GetEventHelper();
    if (eh) {
        var args = [];
        eh.RaiseEvent(productType, EventType.AddedItem, args);
    }
}

function AddAddedItemEventHandler(handlerFunction, productType) {
    var eh = GetEventHelper();
    if (eh) {
        eh.AddHandler(handlerFunction, productType, EventType.AddedItem);
    }
}

function RaiseRemovedItemEvent(productType,productId,removalType) {
    var eh = GetEventHelper();
    if (eh) {
        var args = [];
        args[0] = productType;
        args[1] = productId;
        args[2] = removalType;
        eh.RaiseEvent(productType, EventType.RemovedItem, args);
    }
}

function AddRemovedItemEventHandler(handlerFunction, productType) {
    
    var eh = GetEventHelper();
    if (eh) {
        eh.AddHandler(handlerFunction, productType, EventType.RemovedItem);
    }
}

function RefreshRecentItems(productType, TagID) {
    var eh = GetEventHelper();   
    if (eh) {
        eh.RaiseEvent(productType, EventType.RefreshRecentItems, TagID);
    }
    if (typeof RefreshSearchSelectResults != 'undefined'){
        if(typeof RefreshSearchSelectResults === 'function'){
            try{RefreshSearchSelectResults();}catch(e){}
        }       
    }
}

function AddRecentItemRefreshHandler(handlerFunction, productType) {
    var eh = GetEventHelper();
    if (eh) {
        eh.AddHandler(handlerFunction, productType, EventType.RefreshRecentItems);
    }
}

function AddTreeviewRefreshHandler(handlerFunction, productType) {
	var eh = GetEventHelper();
	if (eh) {
		eh.AddHandler(handlerFunction, productType, EventType.RefreshTreeview);
	}
}

function RaiseTreeviewRefreshEvent(productType) {
    var eh = GetEventHelper();   
    if (eh) {
        eh.RaiseEvent(productType, EventType.RefreshTreeview);
    }
}

//***EXAMPLE****
//AddRecentItemRefreshHandler(FUNCTION_TO_CALL,PRODUCT_TYPE);

function RaiseRenameEvent(productType, productId, newName) {
    var eh = GetEventHelper();
    if (eh) {
        var args = [];
        args[0] = productType;
        args[1] = productId;
        args[2] = newName;
        eh.RaiseEvent(productType, EventType.Rename, args);
    }
}

function AddRenameEventHandler(handlerFunction, productType) {
    var eh = GetEventHelper();
    if (eh) {
        eh.AddHandler(handlerFunction, productType, EventType.Rename);
    }
}

//***EXAMPLE****

//AddRenameEventHandler(FUNCTION_TO_CALL,PRODUCT_TYPE);

//function FUNCTION_TO_CALL(args){
//var itemId=args[0];
//var newName=args[1];
//}


function RaiseHighlightEvent(productType, productId) {
    var eh = GetEventHelper();
    if (eh) {
        var args = [];
        args[0] = productType;
        args[1] = productId;
        eh.RaiseEvent(productType, EventType.Highlight, args);
    }	
}

function AddHighlightEventHandler(handlerFunction, productType) {
    var eh = GetEventHelper();
    if (eh) {
        eh.AddHandler(handlerFunction, productType, EventType.Highlight);
    }
}

function GetEventHelper() {
    try {
        if (!top.EventHelper) {
            if ((window.dialogArguments) && (window.dialogArguments[0])){
                var callingWindow = window.dialogArguments[0];
                if ((callingWindow) && (callingWindow.top) && (callingWindow.top.EventHelper)) {
                     top.EventHelper = callingWindow.top.EventHelper;
                }
            }
        }
        if (!top.EventHelper) {
            top.EventHelper = new EventHelperObject();
        }
        return top.EventHelper;
    } catch(e) {
        //dont have permission to top object.. for now just return a fresh object
        return new EventHelperObject();
    }
}

function EventHelperObject() {
	//recent=1
	//rename=2
    this.Listeners = [];
    this.AddHandler = function AddHandler(handler,pt,eventType,args){
                            var currentLength = this.Listeners.length;
                            this.Listeners[currentLength]=[];
                            this.Listeners[currentLength][0]=handler;
                            this.Listeners[currentLength][1]=pt;
                            this.Listeners[currentLength][2]=eventType;
                            //alert(this.Listeners.length);
                        }
    this.RaiseEvent = function RaiseEvent(productType,eventType,args){
                                    //alert(this.Listeners.length);
                                    for (var i=0; i < this.Listeners.length; i++){
                                        if (!!this.Listeners[i]){
                                            try{
                                                if ((this.Listeners[i][1]==productType)&&(this.Listeners[i][2]==eventType)){
                                                    this.Listeners[i][0](args);
                                                    //alert(this.Listeners[i][0]);
                                                }
                                            }catch(err){
                                                /*script has been freed*/
                                                this.Listeners[i]=null;
                                            }
                                        }
                                    }
    }
}

GetEventHelper();

/* ----------- Global Javascript Event Handling: End ---------- */





function formatMultiSelectList(elementName){
		    
	var elem = document.getElementById(elementName + '_modified');
	
	var elemValue = '';

	for (var i = 0; i < elem.length; i++) {
        if (elem.options[i].selected) {
            elemValue += elem.options[i].value + '::';
        }
    }
    
    elemValue = elemValue.substring(0, elemValue.length-2);
    
    var newElem = document.getElementById(elementName);
    newElem.value = elemValue;  
   
}

function AddQueryStringParameter(url, parameterName, parameterValue) {
    // add a query string parameter to a url in a way that ensures that the url remains valid
    // for example, AddQueryStringParameter("http://www.junk.com?c=d&a=z", "a", "b") would return
    // "http://www.junk.com?c=d&a=b" since it knows that a parameter named "a" already exists in the url
 
    // query string parameter is not already in the url
    var pattern = new RegExp("[&\?]" + parameterName + "=", "i");
    if (!pattern.test(url)) {
        if (url.indexOf("?") >= 0) {
            return url + "&" + parameterName + "=" + parameterValue;
        } else {
            return url + "?" + parameterName + "=" + parameterValue;
        }  
    }

    // special case if this is the only query-string parameter    
    pattern = new RegExp("[\?]" + parameterName + "=[^&]*$", "i");
    if (pattern.test(url)) {
        return url.replace(pattern, "?") + parameterName + "=" + parameterValue;
    }

    // special case if this is the first (of more than one) query-string parameter
    pattern = new RegExp("[\?]" + parameterName + "=[^&]*&", "i");
    if (pattern.test(url)) {
        return url.replace(pattern, "?") + "&" + parameterName + "=" + parameterValue;
    }

    // special case if this is a query string parameter in the middle
    pattern = new RegExp("&" + parameterName + "=[^&]*&", "gi");         
    if (pattern.test(url)) {
        return url.replace(pattern, "&") + "&" + parameterName + "=" + parameterValue;
    }

    // special case if this is the last (of more than one) query string parameter
    pattern = new RegExp("&" + parameterName + "=[^&]*$", "i");
    if (pattern.test(url)) {
        return url.replace(pattern, "") + "&" + parameterName + "=" + parameterValue;
    }
}

function CombinePathAndQueryString(path, queryString) {
    var combination = path;
    if (combination.indexOf('?') != -1) {
        combination += '&';
    } else {
        combination += '?';
    }
    combination += queryString;
    return combination;
}


function htmlEncode(string) {
	if (!string || string == "") { return ""; };
	var encodedString = "";
	for (var i = 0; i < string.length; i++) {
		encodedString += htmlEncodeCharacter(string.charAt(i));
	}                                             
	return encodedString;
}

function htmlEncodeCharacter(character) {
	if (!character || character == "") { return ""; };
	var characterCode = character.charCodeAt(0);
	switch(characterCode) {
		case 32: 
		case 44: case 45: case 46:
		case 48: case 49: case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57: case 76: case 77:
		case 65: case 66: case 67: case 68: case 69: case 70: case 71: case 72: case 73: case 74: case 75: case 78:
		case 79: case 80: case 81: case 82: case 83: case 84: case 85: case 86: case 87: case 88: case 89: case 90:
		case 95:
		case 97: case 98: case 99: case 100: case 101: case 102: case 103: case 104: case 105: case 106: case 107:
		case 108: case 109: case 110: case 111: case 112: case 113: case 114: case 115: case 116: case 117:
		case 118: case 119: case 120:
			return character; break;
		case 128:
			return "&#8364;"; break;
		case 130:
			return "&#8218;"; break;
		case 131:
			return "&#402;"; break;
		case 132:
			return "&#8222;"; break;
		case 133:
			return "&#8230;"; break;
		case 134:
			return "&#8224;"; break;
		case 135:
			return "&#8225;"; break;
		case 136:
			return "&#710;"; break;
		case 137:
			return "&#8240;"; break;
		case 138:
			return "&#352;"; break;  
		case 139:
			return "&#8249;"; break;
		case 140:
			return "&#338;"; break;
		case 142:
			return "&#381;"; break;
		case 145:
			return "&#8216;"; break;
		case 146:
			return "&#8217;"; break;
		case 147:
			return "&#8220;"; break;
		case 148:
			return "&#8221;"; break;
		case 149:
			return "&#8226;"; break;
		case 150:
			return "&#8211;"; break;
		case 151:
			return "&#8212;"; break;
		case 152:
			return "&#732;"; break;
		case 153:
			return "&#8482;"; break;
		case 154:
			return "&#353;"; break;
		case 155:
			return "&#8250;"; break;
		case 156:
			return "&#339;"; break;
		case 158:
			return "&#382;"; break;
		case 159:
			return "&#376;"; break;				   
		default:
			return "&#" + characterCode + ";";
	}
}

function xmlEncode(text) {
    text = text.replace(/&/g, "&amp;");
    text = text.replace(/</g, "&lt;");
    text = text.replace(/>/g, "&gt;");
    text = text.replace(/\'/g, "&apos;");
    text = text.replace(/\"/g, "&quot;");
    return text;
}

/*Add this class used to trim the space of a string*/
String.prototype.trim   =   function(){   
          return   this.replace(/^\s+|\s+$/g,"");
}
/*End of this class.*/  


/*Action Panel - Start*/

function PageDisplayer(){

    this._constructor = function(targetFrame,forceModal) {
        this.TargetFrame = targetFrame;
        if (!!forceModal){
            this.ForceModal = forceModal;
        }else{
            this.ForceModal = false;
        }
    }

    this.OpenInFrame = function OpenInFrame(url, modalWindowType, title){
                    if (!this.ForceModal){
                        elqOpenInFrame(url,this.TargetFrame);
                    }else{
                        this.OpenInWindowWithEvents(url, modalWindowType, title);
                    }
                }
                
   this.OpenInWindow = function OpenInWindow(url,modalWindowType,title,dialogArgs){
                           elqOpenInWindow(url,modalWindowType,title,dialogArgs);  
                       }

                       this.OpenInWindowWithEvents = function OpenInWindowWithEvents(url, modalWindowType, title) {                          
                           var dialogArguments = [];
                           dialogArguments[0] = window;
                           if (!modalWindowType) {
                               modalWindowType = 0;
                           }
                           if (!title) {
                               title = '';
                           }
                           elqOpenInWindow(url, modalWindowType, title, dialogArguments);
                       }
                       
    this._constructor(arguments[0], arguments[1]);
}    

//Example: document.PageDisplayer.OpenInWindowWithEvents(URL,MODAL_SIZE,TITLE);

/*Action Panel - End*/

/*Lock the Page - Start */
function LockPage(lockType){     
    var dvLock = document.getElementById('dvLock');
    if(!dvLock){            
        var lock = document.createElement('div');
        lock.id = 'dvLock';        
        document.body.appendChild(lock);
        dvLock = document.getElementById('dvLock');       
    }       
    
    if(!!dvLock){
        if(lockType.toLowerCase()=='lock'){
            dvLock.style.position = 'absolute';
            dvLock.style.width = '100%';
            dvLock.style.height = '100%';
            dvLock.style.top = '0px';
            dvLock.style.left = '0px';
            dvLock.style.zIndex = '99';
            dvLock.style.backgroundColor = 'black';
            dvLock.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=80)';
            document.body.style.cursor='wait';
        }else{ //unlock
            dvLock.style.position = 'absolute';
            dvLock.style.width = '0px';
            dvLock.style.height = '0px';
            dvLock.style.top = '-10000px';
            dvLock.style.left = '-10000px';
            dvLock.style.zIndex = '-1';                
            dvLock.style.backgroundColor = 'transparent';
            document.body.style.cursor='default';
        }        
    }else{
        alert('Error locating the lock div');
    }
}
/*Lock the Page - End */
