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
/*Ends*/
//var blnClicked used in manager/managerinterface.aspx;
var blnClicked = false;

var currentEvent = window.event;
var menuDisappearDelay=350;  // in miliseconds
var menu;
var menuframe;
var elqContextMenuEntity = -1;
var intCurrentMenuIndex;

//~VS- jQuery
function DynamicHide(e) {
    //check whether child exits in menu
    if (isBrowserIE) {
        if (!menu.contains(e.toElement))
            DelayHideMenu(1);
    }
    else {
        if (jQuery("#" + menu.id).children('has(e.target)'))
            DelayHideMenu(1);
    }
}


function DelayHideMenu(m) {
    delayhide = setTimeout(HideMenu, menuDisappearDelay *m);
}
function ClearHideMenu() {if (typeof delayhide != 'undefined') { clearTimeout(delayhide) } }
function HideMenu() {
    if (menu && menu.style) {
        menu.style.visibility = 'hidden'
    }
    if (menuframe && menuframe.style) {
        menuframe.style.visibility = 'hidden'
    }
}

//[FX] 20061109 - PB4641 menu appears over printed reports
function hideElqMenu(){ HideMenu(); }

// Menu Positioning
function LeftOffset(e){return !e?0:(e.offsetLeft+LeftOffset(e.offsetParent))}
function TopOffset(e){return !e?0:(e.offsetTop+TopOffset(e.offsetParent))}


function LeftOffset__(e) { return !e ? 0 : (e.offsetLeft + LeftOffset(e.offsetParent)) }
function TopOffset__(e) { return !e ? 0 : (e.offsetTop + TopOffset(e.offsetParent)) }



/*
function LeftOffset(e) {

    // This gets the element belongs to the event
    var element = $(e.target || e.srcElement);
    if (!e) {
        return 0;
    } else {
        return e.position().left + e.parent().position.left;
    }
}
*/

var prevWidth = 0;
var arrWidth = new Array();

//check whether width is already present in array
function CheckArrayContainsW(w) {
    for (var i = 0; i < arrWidth.length; i++) {
        if (arrWidth[i] == w || arrWidth[i] + 2 == w || arrWidth[i] - 2 == w)
            return arrWidth[i];
    }
}

//inserts new width if found in array
function InsertIntoArray(w) {
    //insert first element
    if (arrWidth.length == 0) {
        arrWidth[0] = w; 
        return;
    }
    var eleExist = false;
    for (var i = 0; i < arrWidth.length; i++) {
        if (arrWidth[i] == w || arrWidth[i] + 2 == w  || arrWidth[i] - 2 == w)
            eleExist = true;
    }
    //insert only if not already exist
    if (!eleExist)
        arrWidth[arrWidth.length] = w;
}
var chromeFlag = true;
function SizeToContent(e, w) {
    e.style.width = w;
    for (var it = e.firstChild; it; it = it.nextSibling) {
        if (it.offsetWidth > w) {
            w = it.offsetWidth
        }
        //HACK: E10 OR-8734
        if (isBrowserChrome && chromeFlag) {
            if (it.firstChild && it.firstChild.tagName == 'IMG') {
                if (it.firstChild.src.indexOf('action_create.gif') > -1) {
                    if (w < 120) {
                        w = w + 20;
                        chromeFlag = false;
                    }
                }
            }
        }
    }
    //~VS- change the width for the float:left style
    InsertIntoArray(w);
    w = CheckArrayContainsW(w)
    jQuery(e).width(w + 2);
    for (var it = e.firstChild; it; it = it.nextSibling) {
        if (!!it.style) 
        {
            if (jQuery.browser.msie) {
                if (it.tagName != 'HR') {
                    jQuery(it).css('margin', '2px 0px 2px 0px').css('padding', '2px 0px 0px 0px').css('float', 'left');
                }
            }
            else {
                if (it.tagName != 'HR') {
                    if (!jQuery.browser.msie) {
                        if (!!it.style.display) {
                            if ((it.style.display == '') || (it.style.display == 'none')) {
                                jQuery(it).css('margin', '2px 0px 2px 0px').css('padding', '1px 0px 0px 0px').css('display', 'none');
                            } else {
                                jQuery(it).css('margin', '2px 0px 2px 0px').css('padding', '1px 0px 0px 0px').css('display', 'inline-block');
                            }
                        } else {
                            jQuery(it).css('margin', '2px 0px 2px 0px').css('padding', '1px 0px 0px 0px').css('display', 'inline-block');
                        }
                    }
                }
                else {
                    if (!((it.style.display == '') || (it.style.display == 'none'))) {
                        jQuery(it).css("display", "inline-block").css('color', '#ECE9D8');;
                    }
                }
            }
            jQuery(it).width(w);
        }
    }
}

function GetYScroll(e)
{
    if(!e){return 0;}
    return e.scrollTop+GetYScroll(e.offsetParent);
}
function GetXScroll(e)
{
    if(!e){return 0;}
    return e.scrollLeft+GetXScroll(e.offsetParent);
}

function IsOverflow(o){ return !!o&&(o=='auto'||o=='scroll'); }
function IsInOverflowX(e){
    if(!e){return false;}
    if(!!e&&!!e.style&&(IsOverflow(e.style.overflowX)||IsOverflow(e.style.overflow))){return true;}
    return IsInOverflowX(e.parentNode);
}
function IsInOverflowY(e){
    if(!e){return false;}
    if(!!e&&!!e.style&&(IsOverflow(e.style.overflowY)||IsOverflow(e.style.overflow))){return true;}
    return IsInOverflowY(e.parentNode);
}
function FitDimensionX(e,p0,mSize,d0,dSize,dScrollSize){
    var doesBodyScroll = document.body.scroll != "no" && (dScrollSize > dSize);    
    return FitDimension(IsInOverflowX(e),p0,mSize,d0,dSize, doesBodyScroll);
}
function FitDimensionY(e,p0,mSize,d0,dSize,dScrollSize){
    var doesBodyScroll = document.body.scroll != "no" && (dScrollSize > dSize);
    return FitDimension(IsInOverflowY(e),p0,mSize,d0,dSize, doesBodyScroll);
}

function FitDimension(isInO,p0,mSize,d0,dSize, useScrollingOffset){
    var offsetPx = 0; // default case: body does not scroll, scrolling is handled by an inner element eg. a DIV
    
    if (useScrollingOffset) { // if the entire body scrolls, offset our calculations by the magnitude of scroll
        offsetPx = d0;
    }
    
    if(isInO) {
        if(p0+mSize<d0+dSize){ //menu fits within window bottom edge, we're good
            return p0-d0 + offsetPx;
        }
        else { //menu goes past bottom edge, so realign the edges
	        return (offsetPx+dSize)-mSize;
	    }
    }
    if(p0+mSize<d0+dSize){ return p0; }
    return (d0+dSize)-mSize;
}

function FitInWindow(e, x, y, r, eV) 
{
    if (r.className == 'ContextMenuHighlight' || r.className == 'TopMenuDarkHighlight') {
        jQuery(e).css('left', FitDimensionX(r, x, e.offsetWidth, GetXScroll(r), document.body.offsetWidth, document.body.scrollWidth));
        jQuery(e).css('top', FitDimensionY(r, y, e.offsetHeight, GetYScroll(r), document.body.offsetHeight, document.body.scrollHeight));
    }
    else 
    {
        jQuery(e).css('left', FitDimensionX(r, x, e.offsetWidth, 0, document.body.offsetWidth, document.body.scrollWidth));
        jQuery(e).css('top', y);
    }
    if (e.style.pixelTop < 0) {
        jQuery(e).css('top', 0);
    }
}



function ShowContextMenu(e, menuobj, par) {
    //var IE = document.all && document.getElementById;
    
    //Find out how close the mouse is to the corner of the window
    var rightedge = jQuery.browser.msie ? document.body.clientWidth - event.clientX : window.innerWidth - e.clientX;
    var bottomedge = jQuery.browser.msie ? document.body.clientHeight - event.clientY : window.innerHeight - e.clientY;

    //if the horizontal distance isn't enough to accomodate the width of the context menu
    //if (rightedge < menuobj.offsetWidth)
    //move the horizontal position of the menu to the left by it's width
        //menuobj.style.left = IE ? document.body.scrollLeft + event.clientX - menuobj.offsetWidth : window.pageXOffset + e.clientX - menuobj.offsetWidth
    //else
    //change the horizontal position of the menu where the mouse was clicked
    //same concept with the vertical position

     if (jQuery.browser.msie) {
        jQuery(menuobj).css('left', document.body.scrollLeft + event.clientX);
        if (bottomedge < menuobj.offsetHeight) {
            //EC-9107
            jQuery(menuobj).css('top', document.body.scrollTop + event.clientY - (menuobj.offsetHeight-bottomedge));
        } else {
            jQuery(menuobj).css('top', document.body.scrollTop + event.clientY);
        }
    } else {
        jQuery(menuobj).css('left', window.pageXOffset + e.clientX);
        if (bottomedge < menuobj.offsetHeight) {
            jQuery(menuobj).css('top', window.pageYOffset + e.clientY - (menuobj.offsetHeight - bottomedge));
        } else {
            jQuery(menuobj).css('top', window.pageYOffset + e.clientY);
        }
    }
    return false;
}




/*function ShowContextMenu(e, menuobj, par) {

var imgObj = $('#' + par.id).children()[0]
//menuobj.style.left = $(imgObj).position().left;
//menuobj.style.top = $(imgObj).position().top;
var obj = $('#Span16').children()[0];
alert($(obj).position().top + ':' + $(obj).position().left);
    
//    var IE = document.all && document.getElementById
//    var FF = document.getElementById && !document.all

//    //Find out how close the mouse is to the corner of the window
//    var rightedge = IE ? document.body.clientWidth - LeftOffset(imgObj) : window.innerWidth - LeftOffset(imgObj)
//    var bottomedge = IE ? document.body.clientHeight - TopOffset(imgObj) : window.innerHeight - TopOffset(imgObj)
//    
//    //if the horizontal distance isn't enough to accomodate the width of the context menu
//    if (rightedge < menuobj.offsetWidth)
//    //move the horizontal position of the menu to the left by it's width
//        menuobj.style.left = IE ? document.body.scrollLeft + LeftOffset(imgObj) - menuobj.offsetWidth : window.pageXOffset + LeftOffset(imgObj) - menuobj.offsetWidth
//    else
//    //position the horizontal position of the menu where the mouse was clicked
//        menuobj.style.left = IE ? document.body.scrollLeft + LeftOffset(imgObj) : window.pageXOffset + LeftOffset(imgObj)

//    //same concept with the vertical position
//    if (bottomedge < menuobj.offsetHeight)
//        menuobj.style.top = IE ? document.body.scrollTop + TopOffset(imgObj) - menuobj.offsetHeight : window.pageYOffset + TopOffset(imgObj) - menuobj.offsetHeight
//    else
//        menuobj.style.top = IE ? document.body.scrollTop + TopOffset(imgObj) : window.pageYOffset + TopOffset(imgObj)

//    menuobj.style.visibility = "visible"
return false
}*/





function HandleEvent(){
    if (window.event){event.cancelBubble=true}
    else if(typeof(e) != 'undefined'){if(e.stopPropagation){e.stopPropagation()}}
}
function GetMenuElement(id) {
    var m = document.getElementById(id);    
    if (m.parentNode != document.body) 
    {
        m = document.body.insertBefore(m, document.body.firstChild);
    }   
    return m;
}
function UpdateMenuFrame(id, aElement) {
    menuframe = document.getElementById('elqmenuiframe' + id);
    if (!menuframe) {
        menu.insertAdjacentHTML('beforeBegin', '<iframe id=\'elqmenuiframe' + id + '\' src=\'/EloquaIncludes/elqBlank.htm\' scrolling=\'no\' frameborder=\'5\' style=\'position:absolute;visibility:none;width:0px;height:0;top:0;left:0;border:none;display:block;z-index:499;\'></iframe>');
        menuframe = document.getElementById('elqmenuiframe' + id);
    }
    if (menuframe) {
        menuframe.style.width = menu.offsetWidth;
        menuframe.style.height = menu.offsetHeight;
        menuframe.style.top = menu.style.top;
        menuframe.style.left = menu.style.left;
        menuframe.style.visibility='visible';
    }
}

// Main Menu Display
function ShowMenu(aElement, e, id){
    HandleEvent();
    ClearHideMenu();
    HideMenu();
    menu = GetMenuElement(id);
    if (menu) {
        menu.style.display='block';
        SizeToContent(menu,aElement.offsetWidth);
        //--VS:~Workaround for Context menu.
        if (jQuery.browser.mozilla && aElement.className == 'ContextMenuHighlight') 
            ShowContextMenu(e, menu, aElement)
        else {
            if (aElement.className == 'ContextMenuHighlight') {
                ShowContextMenu(e, menu, aElement)
            }
            else {
                FitInWindow(menu, LeftOffset(aElement) + 1, TopOffset(aElement) + aElement.offsetHeight + 3, aElement, e);
            }
        }
        //dropdowncontent.show(aElement,menu,e);
        menu.onmouseout=function(){DynamicHide(e)}
        menu.onmouseover = function() { ClearHideMenu(); }
        menu.style.visibility = 'visible';
        UpdateMenuFrame(id, aElement);
    }
}
