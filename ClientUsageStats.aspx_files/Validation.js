// DO NOT MODIFY THIS (AWR -- 20060626)
// These must be kept in synch with \EloquaNet\_Framework\Validation\InputValidation.vb
ValidationType_RequireNone                  = 0x0000

ValidationType_RequireNotEmpty              = 0x0001

ValidationType_RequireDate                  = 0x0002
ValidationType_RequireTime                  = 0x0004

ValidationType_MaximumSize                  = 0x0008
ValidationType_RequireNoSpaces              = 0x0010
ValidationType_RequireAlphaNumeric          = 0x0020
ValidationType_RequireNoSingleQuotes        = 0x0040
ValidationType_RequireNoDoubleQuotes        = 0x0080
ValidationType_RequireNoQuotes              = 0x00C0

ValidationType_RequireNumeric               = 0x0100
ValidationType_RequireInteger               = 0x0200
ValidationType_RequireNonNegative           = 0x0400
ValidationType_RequireNonZero               = 0x0800

ValidationType_RequireEmailAddress          = 0x1000
ValidationType_RequireURLAddress            = 0x2000
ValidationType_RequireIPAddress             = 0x4000

// Regular expressions for testing.
// These are from http://regexlib.com/
RegExp_RequireNoSpaces                      = /[^A-Za-z0-9_]/g;
RegExp_RequireTime                          = /^(([0]?[0-9]|[0-1][0-9])|[2][0-3]):([0-5][0-9])$/g;  // validate HH:MM (24 format with optional leading 0 for single digit hours)
/*
RegExp_RequireIPAddress                     = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/g;
RegExp_RequireURLAddress                    = /(?#WebOrIP)((?#protocol)((http|https):\/\/)?(?#subDomain)(([a-zA-Z0-9]+\.(?#domain)[a-zA-Z0-9\-]+(?#TLD)(\.[a-zA-Z]+){1,2})|(?#IPAddress)((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])))+(?#Port)(:[1-9][0-9]*)?)+(?#Path)((\/((?#dirOrFileName)[a-zA-Z0-9_\-\%\~\+]+)?)*)?(?#extension)(\.([a-zA-Z0-9_]+))?(?#parameters)(\?([a-zA-Z0-9_\-]+\=[a-z-A-Z0-9_\-\%\~\+]+)?(?#additionalParameters)(\&([a-zA-Z0-9_\-]+\=[a-z-A-Z0-9_\-\%\~\+]+)?)*)?/g;
RegExp_RequireEmailAddress                  = /^([A-Za-z0-9\!\#\$\%\&\'\*\+\-\/\=\?\^\_\`\{\}\|\~]+|"([\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|\\[\x0-\x7F])*")(\.([A-Za-z0-9\!\#\$\%\&\'\*\+\-\/\=\?\^\_\`\{\}\|\~]+|"([\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|\\[\x0-\x7F])*"))*@([A-Za-z0-9]([A-Za-z0-9\-]*[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9\-]*[A-Za-z0-9])?)*|(1[0-9]{0,2}|2([0-4][0-9]?|5[0-4]?|[6-9])?|[3-9][0-9]?)(\.(0|1[0-9]{0,2}|2([0-4][0-9]?|5[0-5]?|[6-9])?|[3-9][0-9]?)){2}\.(1[0-9]{0,2}|2([0-4][0-9]?|5[0-4]?|[6-9])?|[3-9][0-9]?))$/g;
*/
Validation_MaxInteger                       = 2147483647

function IsInputValid(){
    // we only validate input elements of type text
    var inputs = document.getElementsByTagName('input');
    var blnValid = true;
    var strFailedIDs = '';
    for(var i=0;i<inputs.length;++i){
        switch (inputs[i].type) {
            case 'text':
                if(!inputs[i].disabled){
                    var failureType = IsValid(inputs[i]); 
                    if (failureType != ValidationType_RequireNone) {
                        // set the focus
				        if(inputs[i].focus){inputs[i].focus();}
				        if(inputs[i].select){inputs[i].select();}
    			        
			            // turn the input red
			            inputs[i].style.backgroundColor = '#993300';
    			        
			            // add to the message string for the alert
			            if (strFailedIDs.length > 0) strFailedIDs += '|';
			            strFailedIDs += failureType + '.' +inputs[i].id;
                        blnValid = false;			        
			        }
                }
                break;
            default:
                break;
        }
    }
    if (!blnValid) {
        var strMessage = '<i>Please update the following before proceeding:</i>';
        var arrFailedIDs = strFailedIDs.split('|');
        var labels = document.getElementsByTagName('label');
        for(var i=0;i<arrFailedIDs.length;++i){
            var pivot = arrFailedIDs[i].indexOf('.');
            var failureType = arrFailedIDs[i].substring(0, pivot);
            var inputID = arrFailedIDs[i].substring(pivot + 1);
            var labelText = '';
            for(var j=0;j<labels.length;++j){
                if(labels[j].htmlFor == inputID){
                    labelText = labels[j].innerText;
                    break;
                }
            }
            
            switch (parseInt(failureType, 10)) {
                case ValidationType_RequireNotEmpty:
                    strMessage += '<br>\u2022  ' + labelText + ' cannot be empty.\n';
                    break;
                case ValidationType_MaximumSize:
                    var maxSize = document.getElementById(inputID).getAttribute('maxsize');
                    strMessage += '<br>\u2022  ' + labelText + ' cannot be longer than ' + maxSize + ' characters.\n';
                    break;
                case ValidationType_RequireTime:
                    strMessage += '<br>\u2022  ' + labelText + ' must be a valid 24-hour time.\n';
                    break;
                default:
                    break;
            }
        }
        Notification(strMessage, 6);
    }
    return blnValid;
}

function IsValid(e){
    var blnValid = true;
    if(e){
        var strValue = e.value;
        var validationType = e.getAttribute('validate');
        if (!!validationType) {
            if (validationType & ValidationType_RequireNotEmpty) {
                if (!(strValue) || (strValue.length == 0)) return ValidationType_RequireNotEmpty;
            }
            if (!!strValue) {
                if (validationType & ValidationType_RequireDate) { 
                    alert('Date Validation is not completed yet');
                }
                if (validationType & ValidationType_RequireTime) { 
                    var re = new RegExp(RegExp_RequireTime)
                    var val = re.exec(strValue)
                    if (val == null) return ValidationType_RequireTime;
                }
            
                if (validationType & ValidationType_MaximumSize) {
                    var maxSize = e.getAttribute('maxsize');
                    if (!!maxSize) {
                        if (strValue.length > maxSize) return ValidationType_MaximumSize;
                    }
                }
                if (validationType & ValidationType_RequireNoSpaces) { 
                    if (strValue.indexOf(' ') >= 0) return ValidationType_RequireNoSpaces;
                }
                if (validationType & ValidationType_RequireAlphaNumeric) { 
	                if (RegExp_RequireNoSpaces.test(strValue)) return ValidationType_RequireAlphaNumeric;
                }
                // Note that ValidationType_RequireNoQuotes is (ValidationType_RequireNoSingleQuotes + ValidationType_RequireNoDoubleQuotes)
                if (validationType & ValidationType_RequireNoSingleQuotes) { 
                    if (strValue.indexOf('\'') >= 0) return ValidationType_RequireNoSingleQuotes;
                }
                if (validationType & ValidationType_RequireNoDoubleQuotes) { 
                    if (strValue.indexOf('"') >= 0) return ValidationType_RequireNoDoubleQuotes;
                }
                
                if (validationType & ValidationType_RequireNumeric) {
                    if (parseFloat(strValue) == NaN) return ValidationType_RequireNumeric;
                }
                if (validationType & ValidationType_RequireInteger) { 
                    if (parseInt(strValue, 10) == NaN) return ValidationType_RequireInteger;
                }
                if (validationType & ValidationType_RequireNonNegative) {
                    if (parseFloat(strValue) < 0) return ValidationType_RequireNonNegative;
                }
                if (validationType & ValidationType_RequireNonZero) {
                    if (parseFloat(strValue) != 0) return ValidationType_RequireNonNegative;
                }
                /*
                if (validationType & ValidationType_RequireEmailAddress) { 
	                if (RegExp_RequireEmailAddress.test(strValue)) return ValidationType_RequireEmailAddress;
                }
                if (validationType & ValidationType_RequireURLAddress) { 
	                if (RegExp_RequireURLAddress.test(strValue)) return ValidationType_RequireURLAddress;
                }
                if (validationType & ValidationType_RequireIPAddress) { 
	                if (RegExp_RequireIPAddress.test(strValue)) return ValidationType_RequireIPAddress;
                }
                */
            }
        }
    }
    return ValidationType_RequireNone;
}
