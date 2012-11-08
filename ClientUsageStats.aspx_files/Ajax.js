//This function checks to make sure the request object has returned with proper statuses
function isStatusOK() {
    if (XMLRequest != null) {
        if (XMLRequest.readyState) {
            if (XMLRequest.readyState == 4) {
                if (XMLRequest.status) {
                    if (XMLRequest.status == 200) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

// Loading bar for AJAX
// If you want to never display the loading bar, on your page, set neverDisplayLoadingBar = true
var loadingCounter = 0;
var neverDisplayLoadingBar = false
function SetLoading() {
    ++loadingCounter;
    window.setTimeout(ShowLoading, 250);
}
function ShowLoading() {
    if (loadingCounter > 0 && !neverDisplayLoadingBar) {
        var loading = document.getElementById('loading');
        if (loading && document.body) {
            loading.style.display = 'block';
            loading.style.left = 0;
            loading.style.top = (document.body.offsetHeight - 30);
        }
    }
}
function HideLoading() {
    if (--loadingCounter <= 0) {
        var loading = document.getElementById('loading');
        if (loading) {
            loading.style.display = 'none';
        }
    }
}

// Helpers for getting the ajax page and div and callback mappings
var RegExpAJAXID = /(?:\?|\&)AJAXID=([^\&]+)(?:|\&).*$/i;
function GetAJAXID(strPage) {
    if (!!strPage) {
        var parseResult = RegExpAJAXID.exec(strPage);
        if (parseResult && parseResult[1]) { return parseResult[1]; }

        strPage = strPage.toLowerCase();
        for (var page in AJAXIDMap) {
            if (strPage.indexOf(page.toLowerCase()) >= 0) {
                return AJAXIDMap[page];
            }
        }
    }
    return null;
}
function GetAJAXPage(strID) {
    if (!!strID) {
        return AJAXPageMap[strID];
    }
    return null;
}
function GetAJAXCallback(strID) {
    if (!!strID) {
        return AJAXCallbackMap[strID];
    }
    return null;
}

// Helpers for calling into AJAX
function CallAJAX(strPathAndQueryString, callback /* = AJAXCallback */) {
    if (!callback) { callback = AJAXCallback; }
    SetLoading();
    request(strPathAndQueryString, callback, true);
}
function CallAJAXByID(strID, strQueryString, callback /* = AJAXCallback */) {
    if (!strQueryString) { strQueryString = ''; }
    if (strQueryString.indexOf('?') == 0) { strQueryString = strQueryString.substring(1); }
    if (strQueryString.indexOf('&') != 0) { strQueryString = '&' + strQueryString; }
    CallAJAX(CombinePathAndQueryString(GetAJAXPage(strID), 'AJAXID=' + strID + strQueryString), callback);
}

// Helpers for getting called from AJAX
function AJAXIsError(i) { return i >= 100 }
function AJAXIsVisible(i) { return i != 5 }

function AlertArrays() {
    var str = 'AJAXID:\n';
    for (var page in AJAXIDMap) { str += '[' + page + '] = ' + AJAXIDMap[page] + '\n'; }
    str += '\nAJAXPageMap:\n';
    for (var page in AJAXPageMap) { str += '[' + page + '] = ' + AJAXPageMap[page] + '\n'; }
    str += '\nAJAXCallbackMap:\n';
    for (var page in AJAXCallbackMap) { str += '[' + page + '] = ' + AJAXCallbackMap[page] + '\n'; }
    alert(str);
}

var AJAXCallbackMap = {};
var AJAXPageMap = {};
var AJAXIDMap = {};

function InsertAJAXCallback(strID, strCallback) {
    if (!!strID && !!strCallback) { AJAXCallbackMap[strID] = strCallback; }
}
function InsertAJAXMapping(strID, strPage) {
    if (!!strID && !!strPage) {
        AJAXPageMap[strID] = strPage;
        AJAXIDMap[strPage] = strID;
    }
}
function AJAXHandleErrors(AJAXTag) { }
function InsertAJAXCallbacksForPage() { }

// The tag we are expecting is <AJAXStatus Status="#" QueryString="xxx"[ Text="xxx"][ Notification="#"]/>
var RegExpAJAXStatus = /^<AJAXStatus Status="([0-9]+)" QueryString="(\S*)"(?:| Text="(.*)" Notification="(.*)")\/>([\s\S]*)$/;
var RegExpScriptTagStart = /<\s*script\s+language\s*=\s*(?:javascript|"javascript")\s*(?:type\s*=\s*"[^"]+")?[^\/>]*>/i;
var RegExpScriptTagSrc = /<\s*script\s+language\s*=\s*(?:javascript|"javascript")\s*(?:type\s*=\s*"[^"]+")?\s*src\s*=\s*"([^"]+)"[^>]*(?:\/>|>\s*<\/script>)/i;

function AJAXCallback() {
    if (isStatusOK()) {
        HideLoading();
        var AJAXTag = { 'outerHTML': '', 'Status': -1, 'QueryString': '', 'Text': '', 'Notification': 0, 'innerHTML': '', 'source': '', 'srcs': null, 'xml': null };
        if (!!XMLRequest.responseText) {
            //Nadeem: Jira Bug: WF-4068, This error comes when responseText is very large, Firfox throw exception when using RegExp
            try {
                var parseResult = RegExpAJAXStatus.exec(XMLRequest.responseText);
                if (parseResult) {
                    AJAXTag.outerHTML = parseResult[0];
                    AJAXTag.Status = parseResult[1];
                    AJAXTag.QueryString = parseResult[2];
                    AJAXTag.Text = parseResult[3];
                    AJAXTag.Notification = parseResult[4];
                    AJAXTag.innerHTML = parseResult[5];
                    AJAXTag.source = GetJavascriptTags(AJAXTag.innerHTML);
                    AJAXTag.srcs = GetJavascriptTagSrc(AJAXTag.innerHTML);
                    AJAXTag.xml = XMLRequest.responseXML;
                }
            } catch (e) {
                if(!isBrowserIE)//Call only for firefox
                    HandleException(e, AJAXTag);
            }
        }
        if (AJAXTag.Status >= 0 && !AJAXIsError(AJAXTag.Status)) {
            var divID = GetAJAXID(AJAXTag.QueryString);
            if (AJAXIsVisible(AJAXTag.Status)) {
                if (!!divID) {
                    var div = document.getElementById(divID);
                    if (!!div && !!div.tagName && div.tagName.toLowerCase() != 'input') { div.innerHTML = AJAXTag.innerHTML; }
                }
            }
            UpdateDOMWithJavascriptSrcs(AJAXTag.srcs);
            UpdateDOMWithJavascript(divID, AJAXTag.source);
            /* These functions self-destruct (ie set themselves to null) so they can only be run once.
            This is done so that the same function name can be used on the parent page (called when it is rendered),
            and again on the child AJAX pages (this does not implicitly run, so we need to explicitly call it here).
            This works because with javascript, code that is written later in the DOM will take precedence.
            */
            // Check InsertAJAXMappingsForPage is undefined
            try {
                if (InsertAJAXMappingsForPage) { InsertAJAXMappingsForPage(); }
            } catch (err) { /* Only need to handle 'InsertAJAXMappingsForPage is undefined' */ }
            // Check CallAJAXForPage is undefined
            try {
                if (CallAJAXForPage) { CallAJAXForPage(); }
            } catch (err) { /* Only need to handle 'CallAJAXForPage is undefined' */ }
            var callbackFnc = GetAJAXCallback(divID);
            if (!!callbackFnc) {
                eval(callbackFnc);
            }
        }
        AJAXHandleErrors(AJAXTag);
        Notification(AJAXTag.Text, AJAXTag.Notification);
        //SetFocusOnInvalid();
    }
}

function GetJavascriptTags(strHTML) {
    var javascriptTags = '';
    if (!!strHTML) {
        // prefix the string with a space, so we definitely get something before the first tag
        // we then throw-away the first matched element, to avoid finding an end script in the first section
        strHTML = ' ' + strHTML;
        if (RegExpScriptTagStart.test(strHTML)) {
            var contents = strHTML.split(RegExpScriptTagStart);
            for (var i = 1; i < contents.length; ++i) {
                var endIndex = contents[i].indexOf('</script>');
                if (endIndex > 0) {
                    javascriptTags += contents[i].substr(0, endIndex) + '\n';
                }
            }
        }
    }
    return javascriptTags;
}

function GetJavascriptTagSrc(strHTML) {
    var srcs = null;
    if (!!strHTML) {
        if (RegExpScriptTagSrc.test(strHTML)) {
            var match = RegExpScriptTagSrc.exec(strHTML);
            srcs = new Array();
            srcs.push(match[1]);

            var otherSrcs = GetJavascriptTagSrc(strHTML.substr(match.index + match[0].length));
            if (!!otherSrcs) { srcs.concat(otherSrcs); }
        }
    }
    return srcs;
}

function UpdateDOMWithJavascript(strDivID, strScript) {
    if (!!strDivID) {
        var scriptTag = document.getElementById(strDivID + 'Javascript');
        if (!scriptTag) {
            scriptTag = document.createElement('script');
            if (!!document.body) {
                document.body.appendChild(scriptTag);
            }
            scriptTag.language = 'javascript';
            scriptTag.id = strDivID + 'Javascript';
        } //Nadeem: Firefox enhancement, on FF every time new <script> must be created to make JS interpreter excecute the block.
        else if (!jQuery.browser.msie && !!scriptTag) {
            var scriptTagOld = scriptTag;
            scriptTag = document.createElement('script');
            if (!!document.body) {
                document.body.replaceChild(scriptTag, scriptTagOld);
            }
            scriptTag.language = 'javascript';
            scriptTag.id = strDivID + 'Javascript';
        }
        if (!!scriptTag) { scriptTag.text = strScript; }
    }
}

function UpdateDOMWithJavascriptSrcs(scripts) {
    if (!!scripts) {
        for (var i = 0; i < scripts.length; ++i) {
            var isInCurrentScripts = false;
            var currentScripts = document.getElementsByTagName('script');
            for (var j = 0; j < currentScripts.length; ++j) {
                if (!!currentScripts[j].src && currentScripts[j].src.toLowerCase() == scripts[i].toLowerCase()) {
                    isInCurrentScripts = true;
                    break;
                }
            }
            if (!isInCurrentScripts) {
                var scriptTag = document.createElement('script');
                document.body.insertBefore(scriptTag, document.body.firstChild);
                scriptTag.language = 'javascript';
                scriptTag.type = 'text/javascript';
                scriptTag.src = scripts[i];
            }
        }
    }
}
function HandleException(e, AJAXTag) {
    if (e == "InternalError: script stack space quota is exhausted") {
        var inAngleBracket;
        if (XMLRequest.responseText.indexOf("Notification") > 0) {
            //getting the value enclosed in angele brackets
            inAngleBracket = XMLRequest.responseText.substring(0, XMLRequest.responseText.indexOf("/>", XMLRequest.responseText.indexOf("Notification")) + 2)

            //getting value enclosed between thedouble quotes after keyword QueryString
            var queryStringIndex = inAngleBracket.indexOf("QueryString=") + "QueryString=".length + 1;
            AJAXTag.QueryString = inAngleBracket.substring(queryStringIndex, inAngleBracket.indexOf("\"", queryStringIndex));

            //getting value enclosed between thedouble quotes after keyword Text 
            var textIndex = inAngleBracket.indexOf("Text=") + "Text=".length + 1;
            AJAXTag.Text = inAngleBracket.substring(textIndex, inAngleBracket.indexOf("\" ", textIndex));

            //getting value enclosed between thedouble quotes after keyword Notification
            var notificationIndex = inAngleBracket.indexOf("Notification=") + "Notification=".length + 1;
            AJAXTag.Notification = inAngleBracket.substring(notificationIndex, inAngleBracket.indexOf("\"/>", notificationIndex));
            
        } else {

            //getting the value enclosed in angele brackets
            inAngleBracket = XMLRequest.responseText.substring(0, XMLRequest.responseText.indexOf("/>", XMLRequest.responseText.indexOf("QueryString")) + 2)

            //getting value enclosed between thedouble quotes after keyword QueryString
            var queryStringIndex = inAngleBracket.indexOf("QueryString=") + "QueryString=".length + 1;
            AJAXTag.QueryString = inAngleBracket.substring(queryStringIndex, inAngleBracket.indexOf("\"", queryStringIndex));
            AJAXTag.Text = null;
            AJAXTag.Notification = null;
        }

        //getting value enclosed between thedouble quotes after keyword QueryString
        var statusIndex = inAngleBracket.indexOf("Status=") + "Status=".length + 1;
        AJAXTag.Status = inAngleBracket.substring(statusIndex, inAngleBracket.indexOf("\"", statusIndex));

        AJAXTag.innerHTML = XMLRequest.responseText;
        AJAXTag.outerHTML = XMLRequest.responseText;
        AJAXTag.source = GetJavascriptTags(AJAXTag.innerHTML);
        AJAXTag.srcs = GetJavascriptTagSrc(AJAXTag.innerHTML);
        AJAXTag.xml = XMLRequest.responseXML;
      }

   }
