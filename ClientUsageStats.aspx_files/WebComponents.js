var isBrowserIE = jQuery.browser.msie;
var isBrowserChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
var isSanitizeContentWithWhitelist = false;
/*Code changes for insertAdjacentHTML support for Firefox*/
if (typeof HTMLElement != "undefined" && !
HTMLElement.prototype.insertAdjacentElement) {
    HTMLElement.prototype.insertAdjacentElement = function
(where, parsedNode) {
        switch (where) {
            case 'beforeBegin':
                this.parentNode.insertBefore(parsedNode, this)
                break;
            case 'afterBegin':
                this.insertBefore(parsedNode, this.firstChild);
                break;
            case 'beforeEnd':
                this.appendChild(parsedNode);
                break;
            case 'afterEnd':
                if (this.nextSibling)
                    this.parentNode.insertBefore(parsedNode, this.nextSibling);
                else this.parentNode.appendChild(parsedNode);
                break;
        }
    }

    HTMLElement.prototype.insertAdjacentHTML = function
(where, htmlStr) {
        var r = this.ownerDocument.createRange();
        r.setStartBefore(this);
        var parsedHTML = r.createContextualFragment(htmlStr);
        this.insertAdjacentElement(where, parsedHTML)
    }


    HTMLElement.prototype.insertAdjacentText = function
(where, txtStr) {
        var parsedText = document.createTextNode(txtStr)
        this.insertAdjacentElement(where, parsedText)
    }
}

String.prototype.hex = function() {
    var b = "", x = this;
    if (x.substr(0, 1) != "r") { return x; }
    for (a in x = x.substr(4, x.length - 5).split(", "))
    { b += ((x[a] < 16) ? "0" : "") + (x[a] & 0xff).toString(16); }
    return "#" + b;
}
/*Ends*/

function SectionExpandContract(element) {
    if (element) {
        SectionSwitchArrowDirection(element);
        var content = GetSectionFromHeader(element);
        if (content) {
            content = content.parentNode.parentNode;
            if (content.style.display == 'none') {
                if(isBrowserIE)
                content.style.display = 'inline';
                else
                    content.style.display = '';
            } else {
                content.style.display = 'none';
            }
        }
    }
}
function SectionSwitchArrowDirection(element) {
    if (element) {
        if (element.className.indexOf('Up') >= 0) {
            element.className = element.className.replace('Up', 'Down');
        } else {
            element.className = element.className.replace('Down', 'Up');
        }
    }
}
function MouseOver(element) {
    if (element) {
        if (element.className.indexOf('Highlight') < 0) {
            element.className = element.className + 'Highlight';
        }
    }
}
function MouseOut(element) {
    if (element) {
        if (element.className.indexOf('Highlight') >= 0) {
            element.className = element.className.replace('Highlight', '');
        }
    }
}
function EnableButton(element) {
    if (element) {
        var src = element.getAttribute('onclickdisabled');
        if (src) {
            element.setAttribute('onclick', src);
        }
        src = element.getAttribute('onmouseoverdisabled');
        if (src) {
            element.setAttribute('onmouseover', src);
        }
        src = element.getAttribute('onmousedowndisabled');
        if (src) {
            element.setAttribute('onmousedown', src);
        }
        src = element.getAttribute('onmouseupdisabled');
        if (src) {
            element.setAttribute('onmouseup', src);
        }
        src = element.getAttribute('contenteditabledisabled');
        if (src) {
            element.setAttribute('contenteditable', src);
        }
        if (element.style) {
            if (isBrowserIE) {
            element.style.filter = element.style.filter.replace('progid:DXImageTransform.Microsoft.BasicImage(opacity=0.4,greyscale=1)', '');
            element.style.cursor = 'hand';
        }
            else {
                element.style.opacity = element.style.opacity.replace('0.4', '');
                element.style.cursor = 'pointer';
            }
        }
    }
}
function DisableButton(element) {
    if (element) {
        var src = element.getAttribute('onclick');
        if (src) {
            element.setAttribute('onclickdisabled', src);
            element.setAttribute('onclick', '');
        }
        src = element.getAttribute('onmouseover');
        if (src) {
            element.setAttribute('onmouseoverdisabled', src);
            element.setAttribute('onmouseover', '');
        }
        src = element.getAttribute('onmousedown');
        if (src) {
            element.setAttribute('onmousedowndisabled', src);
            element.setAttribute('onmousedown', '');
        }
        src = element.getAttribute('onmouseup');
        if (src) {
            element.setAttribute('onmouseupdisabled', src);
            element.setAttribute('onmouseup', '');
        }
        src = element.getAttribute('contenteditable');
        if (src) {
            element.setAttribute('contenteditabledisabled', src);
            element.setAttribute('contenteditable', 'false');
        }
        if (element.style) {
            if (isBrowserIE) {
            element.style.filter = 'progid:DXImageTransform.Microsoft.BasicImage(opacity=0.4,greyscale=1)';
            }
            else {
                element.style.opacity = 0.4;
            }
            element.style.cursor = 'normal';
        }
    }
}
function GetSectionFromHeader(span) {
    if (span) {
        // the structure is as follows:
        // <tr><td><table><tr><td><span>Header Text</span></td></tr></table></td></tr>
        // <tr><td><section/></td></tr>
        //Nadeem: FireFox enhancement
        //var headerRow = span.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        var headerRow = span.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
        if (isBrowserIE) {
            return headerRow.nextSibling.firstChild.firstChild;
        }
        else {
            //headerRow.nextSibling.childNodes[0] is having nodeType = 3
            return headerRow.nextSibling.childNodes[1].childNodes[0];
        }
    }
    return span;
}
//Nadeem: It will return outerHTML for every jQuery html dom object.
//Call to get outerHTML: yourElement.outerHTML();
//Call to set outerHTML: yourElement.outerHTML('<p>html string </p>');
jQuery.fn.outerHTML = function(str) {
    //return (str) ? this.before(str).remove() : jQuery("<p>").append(this.eq(0).clone()).html();
    //changed due to new jQuery file changes
    if (str) {
        return this.before(str).remove();
    } else {
        try {
        var objDummy = document.createElement('div');
            var clone = this[0].cloneNode(true)
            objDummy.appendChild(clone);
        return objDummy.innerHTML;
        } catch (ex) { }
    }
}

//Nadeem: It will return next valid node, return null if no sibling is found.
function GetNextValidNode(node) {
    while (!!node && node.nodeType == 3) {//Loop till the valid node is found
        node = node.nextSibling;
    }
    return node;
}
//Nadeem: It will return valid child node array, return empty array if no child found.
function GetValidChildNodes(parentNode) {
    var childArray = new Array();
    var node; 
    for (var count = 0; count < parentNode.childNodes.length; count++) {
        node = parentNode.childNodes[count];
        if (node.nodeType != 3) {
            childArray.push(node);
        }
    }
    return childArray;
    //return jQuery(parentNode).children();//Can be replaced by this jQuery single line statement.
}

//Nadeem: This will bind onchange event to every select element, and will set to option attribute 'selected' = 'selected'
//paramter : element will be jQuery object for html Select object, it may be array of Select
//Call example: AttachSelectOnChangeEvent(jQuery('select'));//Attach event to all the select found on the page
function AttachSelectOnChangeEvent(element) {
    if (!element)
        return;
    element.bind('change', function() {
        var index = this.selectedIndex;
        jQuery(this.options).each(function() {
            jQuery(this).removeAttr('selected')
        });
        this.options[index].setAttribute('selected', 'selected');
        this.options[index].selected = 'selected';
    });
}

function AttachOnChangeEvent(element, type, toDo) {
    if (!element || !type || !toDo)
        return;
    if (type == 'text' && toDo == 'setvalue') {
        element.bind('change', function() {
            this.setAttribute('value', this.value);
        }); 
    }
}


//Nadeem: strip the content to the specified lenght and add the third parameter
//Call: SetStrippedContent('span[name=imageSpanVisibleText]', 26, '...')//Search each span with the given name
function SetStrippedContent(jQueryExpression, length, strToAdd) {
    //jQueryExpression: any valid jQuery expression
    jQuery(jQueryExpression).each(
        function () {
                if (jQuery(this).text().length > length)
                    jQuery(this).text(jQuery(this).text().substring(0,length) + strToAdd);
            });
}
    
//Nadeem:FireFox enhancement: this function is modified to encorporate FF requirement
function ActivateTab(element) {
    if (element) {
        if (element.className.indexOf('TabActive') < 0) {
            //var row = element.parentElement.parentElement.parentElement.parentElement.parentElement.nextSibling;
            var row = element.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling;
            
            if (!isBrowserIE) {
                row = GetNextValidNode(row);
            }
            
            var tab;
            for (tab = element.parentNode.firstChild; tab; tab = tab.nextSibling) {

                if (!isBrowserIE) {
                    tab = GetNextValidNode(tab);
                    if (!tab)
                        break;
                }
                if (tab == element) {
                    tab.className = tab.className.replace('TabInActive', 'TabActive');
                    if (isBrowserIE) {
                        row.style.display = 'inline';
                    }
                    else if (!!row && row.nodeType != 3 ) {//For FF we need to check it nodeType
                        row.style.display = 'inline';
                    }
                } else if (!isBrowserIE) {
                    if (!!tab && tab.nodeType != 3 && !!tab.className && !!row && row.nodeType != 3) {
                        tab.className = tab.className.replace('TabActive', 'TabInActive');
                        row.style.display = 'none';
                    }
                }else {
                    tab.className = tab.className.replace('TabActive', 'TabInActive');
                    row.style.display = 'none';
                }
                if (isBrowserIE) {
                    row = row.nextSibling;
                }
                else if (!!row) {
                    row = GetNextValidNode(row.nextSibling);
                }
            }
        }
    }
}

function Hide(strElement) {
    var element = document.getElementById(strElement);
    if (element) {
        element.style.display = 'none';
    }
}

function Display(strElement, strDisplay) {
    var element = document.getElementById(strElement);
    if (element) {
        if (!strDisplay) {
            if (jQuery.browser.msie) {
                strDisplay = 'block';
            } else {
                strDisplay = '';
            }
         }
        element.style.display = strDisplay;
    }
}
function MoveOver(element) {
    if (element) {
        var src = element.getAttribute('src');
        if (src) {
            if (src.indexOf('Red') < 0) {
                element.setAttribute('src', src.replace('.gif', 'Red.gif'));
            }
        }
    }
}
function MoveOut(element) {
    if (element) {
        var src = element.getAttribute('src');
        if (src) {
            if (src.indexOf('Red') >= 0) {
                element.setAttribute('src', src.replace('Red', ''));
            }
        }
    }
}
function MoveAndDeleteOver(element) {
    if (element) {
        var src = element.getAttribute('src');
        if (src) {
            if ((src.indexOf('Red') < 0) && (src.indexOf('Delete') < 0)) {
                element.setAttribute('src', src.replace('.gif', 'Red.gif'));
            }
        }
    }
}
function MoveAndDeleteOut(element) {
	MoveOut(element);
}
function GetActiveSections(){
    var e=document.getElementsByName('ExpandableContents');
    var r='';
    if(e&&e.length){
        for(var i=0;i<e.length;++i){if(e[i]&&e[i].style.display=='inline'){r+=(r.length>0?',':'')+(i)}}
    }
    return r;
}
function InputChanged(e){
    if(e){
        var initial = e.getAttribute('initial');

        if(e.type=='checkbox'){e.value=(e.checked?'True':'False')}

        if(initial!=e.value){
        	if(e.type=='text'||e.type=='textarea'){
	            e.style.backgroundColor = '#DEE7F7';
        	}
        	e.setAttribute('dirty', '1');
        }else{
			if(e.type=='text'||e.type=='textarea'){
				if(e.getAttribute('invalid')!=null){
					e.style.backgroundColor = '#993300';
				}else{
					e.style.backgroundColor = '#FFFFFF';
				}
			}
            e.setAttribute('dirty', '0');
        }
    }
}
function InputRadioChanged(e){
	if(e){
		var radio=document.getElementById(e.id);
		for(var i=0;i<radio.length;++i){
            radio[i].setAttribute('dirty', '1');
		}
	}
}
function GetAllInputs(){
    var output = '';
    // <input type=x >
    var inputs = document.getElementsByTagName('input');
    for(var i=0;i<inputs.length;++i){
        // suppress viewstate and .NET inputs from passing through
        if (inputs[i].name.substr(0,2) != "__") {
            switch (inputs[i].type) {
                case 'checkbox':
                    output += '&' + inputs[i].id+  '=' + inputs[i].checked;
                    break;
                case 'radio':
                    if (inputs[i].checked) {
                        output += '&' + inputs[i].name + '=' + CustomEscape(inputs[i].value);
                    }
                    break;
                default:
                    output += '&' + inputs[i].id + '=' + CustomEscape(inputs[i].value);
                    break;
            }
        }
    }
    // <select >
    inputs = document.getElementsByTagName('select');
    for(var i=0;i<inputs.length;++i){
        output += '&'+inputs[i].name+'=';
        if(inputs[i].type=='select-multiple'){
            var selected = '';
            for(var j=0;j<inputs[i].childNodes.length;++j){
                if(inputs[i].childNodes[j].selected){
                    if(selected.length>0){ selected += ','; }
                    selected += CustomEscape(inputs[i].childNodes[j].value);
                }
            }
            output += selected;
        }else{
            output += inputs[i].value;
        }
    }
    // <textarea >
    inputs = document.getElementsByTagName('textarea');
    for (var i = 0; i < inputs.length; ++i) {
        if (jQuery.browser.msie) {
            output += '&' + inputs[i].name + '=' + escape(inputs[i].innerText);
        } else {
            output += '&' + inputs[i].name + '=' + escape(inputs[i].value);
        }
    }
    return output;
}
function SetFocusOnInvalid(){
    var e=document.forms[0].elements;
    for(var i=0;i<e.length;++i){
        if(e[i].getAttribute('invalid')!=null){
			if(!e[i].disabled){
				if(e[i].focus){e[i].focus();}
				if(e[i].select){e[i].select();}
			}
        }
    }
}

function ModalSelect(strType, strSelect, strAgent, strToolCode, strParamName, strAppend, strAppendFunc, intWidth, intHeight,title) {
    if (strType != 'Add' && strType != 'Edit') {
        alert('This has not yet been implemented.')
        return;
    }
    var select = document.getElementById(strSelect);
    if (!!select) {
        var strURL = '';
        if (strType == 'Add') {
            strURL = '/EloquaTool/EloquaToolAdd.aspx?xsrfToken=' + getXsrfToken() + '&AgentGUID=' + strAgent + '&ToolType=' + strToolCode + '&' + strParamName + '=' + select.value;
        } else {
            strURL = '/EloquaTool/EloquaToolEdit.aspx?xsrfToken=' + getXsrfToken() + '&AgentGUID=' + strAgent + '&ToolType=' + strToolCode + '&' + strParamName + '=' + select.value;
        }
        if (!!strAppend) { strURL += strAppend; }
        if (!!strAppendFunc) { strURL += eval(strAppendFunc); }
        var modalSize;
        if (intWidth <= 500)
        {
            modalSize = 5;
        } else if (intWidth > 500 && intWidth <= 700)
        {
            modalSize = 0;
        } else if (intWidth > 700 && intWidth <= 800)
        {
            modalSize = 1;
        } else if (intWidth > 800)
        {
            modalSize = 9;
        }
        if(!!title)
        {
            var varResponse = elqOpenInWindow(strURL, modalSize, title);
        }else
        {
            var varResponse = elqOpenInWindow(strURL, modalSize, '');
        }
        if (varResponse != 0 && varResponse) { 
            var avarResponse = varResponse.split(',');
            if (avarResponse.length > 1) { 
                if ((avarResponse[0] != '') && (avarResponse[0] != '0') && (avarResponse[0] != '-1')) { 
                    var oOption = document.createElement('OPTION');
                    select = document.getElementById(strSelect);
                    var found = false;
                    for(var i=0; i<select.options.length; i++)
                    {
                        if(select.options[i].value == avarResponse[0].toString())
                        {
                            found = true;
                            select.options[i].text = avarResponse[1].toString();
                            select.selectedIndex = i;
                        }
                    }
                    if(!found)
                    {
                        select.options.add(oOption,0);
                        oOption.text = UnEscapeModalReturn(avarResponse[1].toString());
                        oOption.value = avarResponse[0].toString();
                        select.selectedIndex = 0; 
                    }
                    if(isBrowserIE)
                        select.fireEvent('onchange'); 
                    else
                        fireEvent_FF(select,'change');
                    
                }
            }
        }
    }
}

var NotificationTypes = new Array('','InformationBox','TipBox','PreviewBox','SuccessBox','AlertBox','WarningBox','ErrorBox');
var NotificationLabels = new Array('','OVERVIEW','TIP','PREVIEW','SUCCESS','ALERT!','WARNING','ERROR');
function Notification(strText,intType) {
    if (!intType) {
        if (!!strText) { alert(strText); }
    } else {
        var notificationRow = document.getElementById('Notification');
        if (!!notificationRow) {
            if (0 < intType && intType < NotificationTypes.length) {
                //Nadeem: display:block is not required on FF
                if (isBrowserIE) {
                    notificationRow.style.display = 'block';
                }
                else {
                    notificationRow.style.display = '';
                }
                //[~VS]changing code for FF
                var notificationLabel; var notificationText;
                if (isBrowserIE) {
                    notificationLabel = notificationRow.all('NotificationLabel');
                    if (!!notificationLabel) {
                        notificationLabel.innerHTML = NotificationLabels[intType];
                        if (!!notificationLabel.parentNode) {
                            for (var i = 0; i < notificationLabel.parentNode.all.length; ++i) {
                                notificationLabel.parentNode.all(i).className = NotificationTypes[intType];
                            }
                        }
                    }
                    notificationText = notificationRow.all('NotificationText');
                    if (!!notificationText) { notificationText.innerHTML = strText;}
                }
                else {
                    notificationLabel = jQuery(notificationRow).contents().find('[id=NotificationLabel]');
                    if (!!notificationLabel) {
                        notificationLabel.html(NotificationLabels[intType]);
                        if (!!notificationLabel.parent()) {
                            //for (var i = 0; i < notificationLabel.parent().children().length; ++i) {
                            //notificationLabel.parentNode.all(i).className = NotificationTypes[intType];
                            //                            }
                            notificationLabel.parent().children().attr('class', NotificationTypes[intType]);
                        }
                    }
                    notificationText = jQuery(notificationRow).contents().find('[id=NotificationText]');
                    if (!!notificationText) { notificationText.html(strText);}
                }
            }
            else {
                notificationRow.style.display = 'none';
            }
        }
    }
}
function ChangeNLCondition(strID) {
    var hiddenInput = document.getElementById(strID);
    var row = document.getElementById(strID + '_');
    var items = document.getElementById(strID + '_ITEMS');
    if (!!hiddenInput && !!row && !!items){
        // set the value which gets stored
        var oldValue = hiddenInput.value;
        var newValue = oldValue;
        for (var i = 0; i < items.childNodes.length; ++i) {
            var item = items.childNodes[i];
            if (!!item.id && item.id != strID + '_ITEM_' + oldValue) {
                newValue = item.id.substring((strID + '_ITEM_').length);
                break;
            }
        }
        hiddenInput.value = newValue;
        //Nadeem: FF enhancement
        if (isBrowserIE) {
            // Hide the item that was displayed, and show the other one
            items.all(strID + '_ITEM_' + oldValue).style.display = 'none';
            var strNewID = strID + '_ITEM_' + newValue;
            items.all(strNewID).style.display = 'block';
            if (!!items.all(strNewID).OnActivateItem) {
                eval(items.all(strNewID).getAttribute('OnActivateItem'));
            }

            // Set the radio button
            var radio = row.all(strID + '_INPUT_' + oldValue);
            if (!!radio) { radio.checked = false; }
            radio = row.all(strID + '_INPUT_' + newValue);
            if (!!radio) { radio.checked = true; }

            // Set the select input value
            var select = row.all(strID + '_INPUT_');
            if (!!select) {
                select.value = newValue;
            }
        }
        else {
            // Hide the item that was displayed, and show the other one
            document.getElementById(strID + '_ITEM_' + oldValue).style.display = 'none';
            var strNewID = strID + '_ITEM_' + newValue;
            document.getElementById(strNewID).style.display = 'block';
            if (!!document.getElementById(strNewID).getAttribute('OnActivateItem')) {               
                eval(document.getElementById(strNewID).getAttribute('OnActivateItem'));
            }

            // Set the radio button
            var radio = document.getElementById(strID + '_INPUT_' + oldValue);
            if (!!radio) { radio.checked = false; }
            radio = document.getElementById(strID + '_INPUT_' + newValue);
            if (!!radio) { radio.checked = true; }

            // Set the select input value
            var select = document.getElementById(strID + '_INPUT_');
            if (!!select) {
                select.value = newValue;
            }
        }
    }
}
/*
function ActivateSectionTab(intSection) {
    for (var i = 0; true; i++) {
        var content = document.getElementById('Section' + i + 'Contents')
        var tab = document.getElementById('Section' + i);
        if (!(tab && content)) {
            break;
        }
        if (i == intSection) {
            if (content.style.display != 'inline') {
                content.style.display = 'inline';
                if (tab) {
                    tab.className = 'ElqTabActive';
                }
            }
        } else {
            if (content.style.display != 'none') {
                content.style.display = 'none';
                if (tab) {
                    tab.className = 'ElqTabInActive';
                }
            }
        }
    }
}
*/

var CurrentDashboardItemResizer = null;
var CurrentDashboardYStart = 0;
function DashboardMouseDown(dashboardItemResizer){
    if (!!dashboardItemResizer) {
        document.onmouseup = DashboardMouseUp;
        document.onmousemove = DashboardMouseMove;
        document.body.style.cursor = 'n-resize';
        /*
        for (var i = 0; i < window.frames.length; ++i) {
            window.frames(i).attachEvent('onmousemove', DashboardMouseMove);
            window.frames(i).attachEvent('onmouseup', DashboardMouseUp);
        }
        */
        
        CurrentDashboardItemResizer = dashboardItemResizer;
        CurrentDashboardYStart = parseInt(event.y, 10);

        var r = document.body.createControlRange();
        r.add(CurrentDashboardItemResizer);
        r.select();

        event.returnValue = false;
        event.cancelBubble = true;
    }
}

function DashboardResized() {}
function DashboardMouseUp(){
    document.onmouseup = null;
    document.onmousemove = null;
    document.body.style.cursor = 'auto';
    /*
    for (var i = 0; i < window.frames.length; ++i) {
        window.frames(i).detachEvent('onmousemove', DashboardMouseMove);
        window.frames(i).detachEvent('onmouseup', DashboardMouseUp);
    }
    */
    
    DashboardResized(CurrentDashboardItemResizer.parentNode.id);
    CurrentDashboardItemResizer = null;
    CurrentDashboardYStart = 0;

    event.returnValue = false;
    event.cancelBubble = true;
}

function DashboardMouseMove(){
    if (!!CurrentDashboardItemResizer) {
        var delta = parseInt((parseInt(event.y, 10) - CurrentDashboardYStart), 10);
        if (parseInt(CurrentDashboardItemResizer.DashboardHeight, 10) + delta > 180) {
            //document.cursor = 'n-resize';

            CurrentDashboardItemResizer.parentNode.style.height = parseInt(CurrentDashboardItemResizer.DashboardHeight, 10) + delta + 'px';
            
            var dashboardDisplay = CurrentDashboardItemResizer.parentNode.parentNode;
            if (!!dashboardDisplay) {
                for (var i = 0; i < dashboardDisplay.childNodes.length; ++i) {
                    var currentItem = dashboardDisplay.childNodes[i];
                    var currentItemResizer = currentItem.lastChild;
                    if (currentItemResizer.DashboardColumn == CurrentDashboardItemResizer.DashboardColumn && 
                        currentItemResizer.DashboardRow > CurrentDashboardItemResizer.DashboardRow) {
                        
                        currentItem.style.top = (delta + parseInt(currentItemResizer.CurrentTop, 10)) + 'px';
                    }
                }
            }
        }

        event.returnValue = false;
        event.cancelBubble = true;
    }
}



//This function executes the javascript part after ajax callback
function evalScript(scripts) {
    try {
        if (scripts != '') {
            var script = "";
            scripts = scripts.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, function() {
                if (scripts !== null) script += arguments[1] + '\n';
                return '';
            });
            if (script) (window.execScript) ? window.execScript(script) : window.setTimeout(script, 0);
        }
        return false;
    }
    catch (e) {
        alert(e)
    }
}

//[~VS]creating for FF
function fireEvent_FF(obj, eventName) {
    if (document.createEvent) {
        var evt = document.createEvent('HTMLEvents');
        if (evt.initEvent) {
            evt.initEvent(eventName, true, true);
        }
        if (obj != null && obj.dispatchEvent) {
            obj.dispatchEvent(evt);
        }
    }
}
//Creating for FF
function fireKeyPressEvent_FF(obj, eventName, keyCode) {
    if (document.createEvent) {
        var evt = document.createEvent('KeyEvents');
        if (evt.initKeyEvent) {
            evt.initKeyEvent('keypress', true, true, null, false, false, false, false, 0, keyCode);
        }
        if (obj != null && obj.dispatchEvent) {
            obj.dispatchEvent(evt);
        }
    }
}


//Firefox equivalent of element.insertAdjacentHTML
function InsertAdjacentElement_FF(refElement, where, elementToInsert) {
    if (!refElement || !where || !elementToInsert)
        return;
    switch (where) {
        case 'beforeBegin':
            refElement.parentNode.insertBefore(elementToInsert, refElement);
            break;
        case 'afterBegin':
            refElement.insertBefore(elementToInsert, jQuery(refElement).children(':first-child')[0]);
            break;
        case 'beforeEnd':
            refElement.appendChild(elementToInsert);
            break;
        case 'afterEnd':
            if (jQuery(refElement).next().length > 0)
                refElement.parentNode.insertBefore(elementToInsert, jQuery(refElement).next()[0]);
            else refElement.parentNode.appendChild(elementToInsert);
            break;
    }
}

//This function is used to bind the event, targetElement and its eventHandler
function BindEvent_FF(eventName, targetElement, eventHandler, useCapture) {
    try {
        if (useCapture == null)
            useCapture = false;
        if (eventName == 'onmouseenter') {
            targetElement.addEventListener('mouseover', function(event) { CallEventHandler_FF(targetElement, event, eventHandler) }, useCapture);
        } else if (eventName == 'onmouseleave') {
            targetElement.addEventListener('mouseout', function(event) { CallEventHandler_FF(targetElement, event, eventHandler) }, useCapture);
        } else if (eventName == 'onmouseout') {
            targetElement.addEventListener('mouseout', function(event) { CallEventHandler_FF(targetElement, event, eventHandler) }, useCapture);
        } else if (eventName == 'onmouseover') {
            targetElement.addEventListener('mouseover', function(event) { CallEventHandler_FF(targetElement, event, eventHandler) }, useCapture);
        }
    } catch (ex) {
        throw ex;
        //alert('Exception: Something Wrong in BindEvent_FF()' + ex.message);
    }
}
function CallEventHandler_FF(targetElement, eV, eventHandler) {
    try {
        var funcToCall = null;
        eventObj = eV;
        if (eV.relatedTarget == targetElement)
            return false;
        else if (!eV.relatedTarget) {
            funcToCall = eval(eventHandler);
            funcToCall(targetElement, eV);
        }
        else if (eV.relatedTarget.nodeType != 3) {
            if (!CheckIfChildElement(targetElement, eV.relatedTarget)) {
                funcToCall = eval(eventHandler);
                funcToCall(targetElement, eV);
            }
        }
    } catch (ex) {
        try {
            funcToCall = eval(eventHandler);
            funcToCall(targetElement, eV);
        }
        catch (ex) {
            throw ex; 
            //alert(' Exception: Mozilla Bug  XUL Element: ' + ex.message + '  *EventHandler Is : ' + eventHandler.toString() );
        }
    }
}

//Checks for parent-child relation
function CheckIfChildElement(parent, child) {
    if (!parent || !child || parent == child)
        return false;
    var tempParent = child.parentNode;
    while (tempParent) {
        if (tempParent == parent)
            break;
        tempParent = tempParent.parentNode;
    }

    if (tempParent == parent) {
        return true;
    }
    else
        return false;
}

//Replaces all occurences with stringToReplace and returns string
function ReplaceAll(Source, stringToFind, stringToReplace) {
    var tempStr = "";
    if (Source) {
        tempStr = Source;
        var index = tempStr.indexOf(stringToFind);
        while (index != -1) {
            tempStr = tempStr.replace(stringToFind, stringToReplace);
            index = tempStr.indexOf(stringToFind);
        }
    }
    return tempStr;
}
//Add margin in ordered/bulleted list
function AddStyleMargin(htmlobj, marginValue) {
    var obj = htmlobj.getElementsByTagName("ol");   
    if (obj) {
        for (var i = 0; i < obj.length; i++) {     
            obj[i].style.margin = marginValue;
        }
    }
    
    obj = htmlobj.getElementsByTagName("ul");
    if (obj) {
        for (var i = 0; i < obj.length; i++) {
            obj[i].style.margin = marginValue;
        }
    }
    
    obj = htmlobj.getElementsByTagName("blockquote");
    if (obj) {
        for (var i = 0; i < obj.length; i++) {
            obj[i].style.marginTop = marginValue;
            obj[i].style.marginBottom = marginValue;

            //get all the child p tags
            for (var j = 0; j < obj[i].childNodes.length; j++) {
                //set class=pDefault
                if (obj[i].childNodes[j].tagName.toLowerCase() == 'p') {
                    obj[i].childNodes[j].className = 'pDefault';
                }
            }
            
        }
    }
}


function LimitComboDisplayText(objCombo, reqTxtLengthInPx) {
    //case when width:px 
    var childLength = objCombo.options.length;
    for (var i = 0; i < childLength; i++) {
        jQuery(objCombo.options[i]).css('width', reqTxtLengthInPx)
    }
}

//This function handles the cut/copy/paste message
function ShowCopyPasteMessage(keyCombination) {
    alert("Currently not supported by your browser, use keyboard shortcuts instead.\n" + keyCombination);
}

function getBrowserName() {
    var browserName = '';
    if (jQuery.browser.mozilla)
        browserName = "Firefox";
    else if (jQuery.browser.msie)
        browserName = "Internet Explorer";
    else if (jQuery.browser.opera)
        browserName = "Opera";
    else if (jQuery.browser.safari)
        browserName = "Safari";
    else
        browserName = "Unknown";

    return browserName;
}

function getObjectPos(obj) {
    var pos = { left: 0, top: 0 };
    if (obj) {
        do {
            pos.left += obj.offsetLeft;
            pos.top += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }
    return pos;
}
