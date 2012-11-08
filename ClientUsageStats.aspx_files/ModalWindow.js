/*
 *  STANDARD MODAL DIALOG SIZES
 */


function elqOpenInWindow(url, modalWindowType, title, dialogArguments) {
	var mdlWndw = new elqModalWindow (modalWindowType, title);
    mdlWndw.go(url,dialogArguments);
    return mdlWndw.returnValue;	
}

function elqOpenInFrame (url, targetFrame) {
        if (typeof(targetFrame) == "undefined")
            document.location.href = url;
        else
        {
            if (document.getElementById(targetFrame)) {
                document.getElementById(targetFrame).src = url;
            } else if (parent && parent.document.getElementById(targetFrame)){
                parent.document.getElementById(targetFrame).src = url;
            }  else if (parent && parent.parent && parent.parent.document.getElementById(targetFrame)) {
		        parent.parent.document.getElementById(targetFrame).src = url;	
            }  else if (parent && parent.parent && parent.parent.parent && parent.parent.parent.document.getElementById(targetFrame)) {
		        parent.parent.parent.document.getElementById(targetFrame).src = url;	
	        } else {
	            document.location.href = url;
            }
        }
}


function elqModalWindowType () {
    var a = arguments;
    this._constructor = function(width, height) {
        this.height = height;
        this.width =  width;
    }
    this.getHeight = function () { 
        return this.height; 
    }
    this.getWidth = function () {
        return this.width; 
    }
    this._constructor(a[0], a[1]);
}


function elqModalWindowSize(modalWindowType) {
    /* .NET Enumeration for size.
    Normal
    Large
    ObsoleteWizard
    Wizard
    Report
    Confirmation
    ConfirmationLarge
    Deletion
    Colour
    Manager
    */
    switch (modalWindowType) {
        case 0:
            return new elqModalWindowType (700,600);
            break;
        case 1:
            return new elqModalWindowType (800,800);
            break;
        case 2:
            return new elqModalWindowType (850,600);
            break;
        case 3:
            return new elqModalWindowType (600,425);
            break;    
        case 4:
            return new elqModalWindowType (800,650);
            break;
        case 5:
            return new elqModalWindowType (500,375);
            break;
        case 6:
            return new elqModalWindowType (700,500);
            break;    
        case 7:
            return new elqModalWindowType (650,450);
            break;    
        case 8:
            return new elqModalWindowType (500,650);
            break;
        case 9:
            return new elqModalWindowType (1024,600);
            break;  
		case 10:
			return new elqModalWindowType (840,800);
			break;
		default:
            alert('Not a valid modal window type');
            break;
    }
}


function elqModalWindow() {
    var a = arguments;
    this.go = function (url, dialogArgs) {
        this.setDialogArgs( dialogArgs );
        if (url.indexOf('?') >= 0) {
            url = url.replace(/\?/gi, '?OpenInModal=True&');
        } else {
            url = url + '?OpenInModal=True';
        }
        var rv = window.showModalDialog('/Agent/ModalLoad.aspx?xsrfToken=' + getXsrfToken() + '&' + encodeURI(url) + ((this.title.length > 0) ? ('&Title=' + this.title) : ''), this.dialogArgs, 'dialogWidth=' + this.width + 'px; dialogHeight=' + this.height + 'px;resizable:' + this.resizable + ';status:' + this.status + ';');
        if (rv) {
            this.returnValue = rv;
        }
    } 
    
    this.setDialogArgs = function (dialogArgs) {
        this.dialogArgs = (dialogArgs == null) ? this.dialogArgs : dialogArgs;
    }
    
    this._constructor = function (modalWindowType, title) {
        this.returnValue = 0;
        this.dialogArgs = '' ;   
        this.title = (title == null) ? '' : title;
        this.width = elqModalWindowSize(modalWindowType).getWidth();
        this.height = elqModalWindowSize(modalWindowType).getHeight();
        this.resizable = 'yes';
        this.status = 'no'; 
    }
    this._constructor(a[0], a[1]);
    
    
}


/**
 *OBSOLETE START
 */

function goTo(url, modalWidth, modalHeight, title, args, target) {
    if (target != null) {
        if (document.getElementById(target)) {
            document.getElementById(target).src = url;
        } else if (parent && parent.document.getElementById(target)){
            parent.document.getElementById(target).src = url;
        }
    }
}

    
//Normal
var intWindowDocWidth = elqModalWindowSize(0).getWidth();
var intWindowDocHeight = elqModalWindowSize(0).getHeight();

//Large
var intWindowDocWidthTempLarge = elqModalWindowSize(1).getWidth();
var intWindowDocHeightTempLarge = elqModalWindowSize(1).getHeight();

//ObsoleteWizard
var intWindowOldWizardWidth = elqModalWindowSize(2).getWidth();
var intWindowOldWizardHeight = elqModalWindowSize(2).getHeight();

//Wizard
var intWindowWizardWidth = elqModalWindowSize(3).getWidth();
var intWindowWizardHeight = elqModalWindowSize(3).getHeight();

//Report
var intWindowReportWidth = elqModalWindowSize(4).getWidth();
var intWindowReportHeight = elqModalWindowSize(4).getHeight();

//Confirmation
var intWindowSelectWidth = elqModalWindowSize(5).getWidth();
var intWindowSelectHeight = elqModalWindowSize(5).getHeight();

//ConfirmationLarge
var intWindowSelectLargeWidth = elqModalWindowSize(6).getWidth();
var intWindowSelectLargeHeight = elqModalWindowSize(6).getHeight();

//Deletion
var intWindowDelDepWidth = elqModalWindowSize(7).getWidth();
var intWindowDelDepHeight = elqModalWindowSize(7).getHeight();

//Colour
var intWindowColorPickerWidth = elqModalWindowSize(8).getWidth();
var intWindowColorPickerHeight = elqModalWindowSize(8).getHeight();

//Manager
var intWindowTabLevelMgrWidth = elqModalWindowSize(9).getWidth();
var intWindowTabLevelMgrHeight = elqModalWindowSize(9).getHeight();

//SearchSelect
var intWindowImageSelectorWidth = elqModalWindowSize(10).getWidth();
var intWindowImageSelectorHeight = elqModalWindowSize(10).getHeight();

/**
 *OBSOLETE END
 */