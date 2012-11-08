function ValidateTextMaxLength(strValue, intLength){
	if(strValue.length > intLength){
		return false;
	}else{
		return true;
	}
}
function ValidateTextMinLength(strValue, intLength){
	if(strValue.length < intLength){
		return false;
	}else{
		return true;
	}
}

function ValidateNoSpace(strValue){
	if(strValue.indexOf(' ') >= 0){
		return false;
	}else{
		return true;
	}
}

function ValidateNoQuotes(strValue){
	//alert(strValue.indexOf('\''));
	if(strValue.indexOf('"') >= 0){return false;}
	if(strValue.indexOf('\'') >= 0){return false;}
	return true;
}

function ValidateNoSpecialChar(strValue){
	if(strValue.indexOf('!') >= 0){return false;}
	if(strValue.indexOf('#') >= 0){return false;}
	if(strValue.indexOf('%') >= 0){return false;}
	if(strValue.indexOf('&') >= 0){return false;}
	if(strValue.indexOf('*') >= 0){return false;}
	if(strValue.indexOf('(') >= 0){return false;}
	if(strValue.indexOf(')') >= 0){return false;}
	if(strValue.indexOf('+') >= 0){return false;}
	if(strValue.indexOf('=') >= 0){return false;}
	if(strValue.indexOf(':') >= 0){return false;}
	if(strValue.indexOf(';') >= 0){return false;}
	if(strValue.indexOf('"') >= 0){return false;}
	if(strValue.indexOf('\'') >= 0){return false;}
	if(strValue.indexOf('<') >= 0){return false;}
	if(strValue.indexOf('>') >= 0){return false;}
	if(strValue.indexOf(',') >= 0){return false;}
	if(strValue.indexOf('.') >= 0){return false;}
	if(strValue.indexOf('?') >= 0){return false;}
	if(strValue.indexOf('/') >= 0){return false;}
	return true;
}

function ValidateTextURL(strValue) {
    var varRegExp = /^(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}\.)+[\w]{2,4}(:[\d]+)?(\/([-+_~.\d\w\$ ]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w\/ ]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w\/]|%[a-fA-f\d]{2,2})*)?$/;

	return varRegExp.test(strValue);
}

function ValidateTextFTP(strValue){
	var varRegExp = /^(ftp\:\/\/)/;
	return varRegExp.test(strValue);
}

function ValidateTextDNS(strValue){

	var varRegExp = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/g;
    if (strValue.match(varRegExp) == null) {return false;}
    
	if(strValue.indexOf(' ') >= 0){return false;}
	if(strValue.indexOf('..') >= 0){return false;}

	// Hard coding for now.  These names are reserved.
	if(strValue == 'now.eloqua.com') {return false;}
	if(strValue == 'secure.eloqua.com') {return false;}

	var dnsParts = strValue.split(".");

	if ((dnsParts.length > 1) && (strValue.charAt(strValue.length - 1) != ".") && (strValue.charAt(0) != "."))
	{
		return true;
	}
}

function ValidateRegularChar(strValue) {
	var varRegExp = /[^A-Za-z0-9_\&\(\)\-\+\/\.\$\,\ ]/g;
	return !varRegExp.test(strValue);
}

function ValidateNumeric(strValue) {
	var varRegExp = /^\s*[-+]?\d+\s*$/;
	return varRegExp.test(strValue);
}

function ValidateInt32(strValue){
    if(ValidateNumeric(strValue)){
        if( strValue >= -2147483648 && strValue < 2147483648){
            return true;
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}

function ValidatePositiveInt(strValue) {
    if (!ValidateNumeric(strValue)) {
        return false;
    }
    var result = parseInt(strValue);
    return ((result != NaN) && (result > 0));
}

function ValidateNonNegativeInt(strValue) {
    if (!ValidateNumeric(strValue)) {
        return false;
    }
    var result = parseInt(strValue);
    return ((result != NaN) && (result >= 0));
}

function ValidateFloat(strValue) {
	var varRegExp = /^([-+]?)((\d+(\.\d*)?)|((\d*\.)?\d+))$/;
	return varRegExp.test(strValue);
}

function ValidateElqDecimal(strValue) {
	var varRegExp = /^([-+]?)((\d{1,15}(\.\d{0,4}))$|(^\s*[-+]?\d{1,15}\s*))$/;
	return varRegExp.test(strValue);
}

function ValidateNonWhiteSpace(strValue){
	var varRegExp = /\S/;
	return varRegExp.test(strValue);
}

function ValidateNoTab(strValue){
	return (strValue.search(/\t/) == -1);
}

function ValidateEmail(strValue) {
	//AR 20050110 - Commented out as does not allow first.last@company.com
	// simple validation -- check for @ and . in address, and that @ comes before .
	//var intAtIndex = strValue.indexOf('@');
	//return (0 < intAtIndex && intAtIndex < strValue.indexOf('.'));

	//AWR 20050113 - Updated this to fix the above problem
//	var varRegExp = /^[^@]+@[^@]+\.[^@]+$/;
//    return varRegExp.test(strValue);

    //RP 20060824 - client side version of .NET DLL EmailAddressValidator
	
    var varRegExp='^[A-Z0-9!#\\$%&\'\\*\\+\\-/=\\?\\^_`\\{\\|\\}~][A-Z0-9!#\\$%&\'\\*\\+\\-/=\\?\\^_`\\{\\|\\}~\\.]{0,62}@([A-Z0-9](?:[A-Z0-9\\-]{0,61}[A-Z0-9])?(\\.[A-Z0-9](?:[A-Z0-9\\-]{0,61}[A-Z0-9])?)+)$';
    if ((strValue) && (strValue != '')) {
    
        if (strValue.indexOf('..') > 0) { return false; }
        if (strValue.indexOf('.@') > 0) { return false; }
        
        var re = new RegExp(varRegExp,"i");
        var mtchs = re.exec(strValue); 
        if ((mtchs) && (mtchs.length=3) && (mtchs[1].length<=255) && ((mtchs[2].length>=3) & (mtchs[2].length<=7))){
            return true;
        }
    } 
    return false;
}

function ValidateMultipleEmails(elementId) {
    var emails = document.getElementById(elementId).value.split(/[;,]/);
    if(emails.length === 0) {
        return false;
    }
    
    for( var i in emails) {
        if(!ValidateEmail(emails[i])) {
            return false;
        }
    }

    return true;
}

function LTrim(str){
	if (str==null){return null;}
	for(var i=0;str.charAt(i)==" ";i++);
	return str.substring(i,str.length);
}
function RTrim(str){
	if (str==null){return null;}
	for(var i=str.length-1;str.charAt(i)==" ";i--);
	return str.substring(0,i+1);
}
function Trim(str){return LTrim(RTrim(str));}
   
    // MP 20070206 -- Validate multiple email address seperated by the characters ';,'
    function ValidateMultipleEmail(strValue)
    {
        var emailSplit = strValue.split(/[;,]/g);//Nadeem(WF-5908) in FF it is not giving the desired result strValue.split(/([;,])/g)
        var validEmail = true
        for (var x = 0; x <= emailSplit.length - 1; x++)
        {
            if (!ValidateEmail(Trim(emailSplit[x]))){
                validEmail = false;
                break;
            }
        }
        return validEmail
    }
    // MP 20070206 -- Perform multiple email validation and list any invalid addresses. Emails are seperated by characters ';,'
    function ListMultipleInvalidEmail(strValue)
    {
        var emailSplit = strValue.split(/[;,]/g)
        strInvalid = ''
        for (var x = 0; x <= emailSplit.length - 1; x++)
        {
            if (ValidateEmail(emailSplit[x]) == false)
              strInvalid = strInvalid + emailSplit[x] + '\n'
        }
        return strInvalid  
    }
function ValidateUnencodedURL (strValue) {
	//VC 20060518 - Based on the standards in http://www.ietf.org/rfc/rfc1738.txt
	var varRegExp = /[^A-Za-z0-9_\&\(\)\-\+\/\.\$\,\:\@\=\?\*\;\ ]/g;
	return !varRegExp.test(strValue);
}
/****************************************************************/


function UnEscapeModalReturn(strValue){
	var strTemp;
	var pattern;
	strTemp = strValue;
	pattern = /&quot;/g;
	strTemp = strTemp.replace(pattern, '"');
	pattern = /&amp;/g;
	strTemp = strTemp.replace(pattern, '&');
	pattern = /&comma;/g;
	strTemp = strTemp.replace(pattern, ',');
	pattern = /&lt;/g;
	strTemp = strTemp.replace(pattern, '<');
	pattern = /&gt;/g;
	strTemp = strTemp.replace(pattern, '>');
   
    pattern = /&#([0-9]+);/g;
    var matches = strTemp.match(pattern)
    if (matches) {
    for (var x=0; x<matches.length; x++) {
        var charCode = parseInt(matches[x].match(/[0-9]+/)[0]);
        strTemp = strTemp.replace(matches[x], String.fromCharCode(charCode));
	}
	}
	//strTemp = strTemp.replace('&quot;', '"');
	//strTemp = strTemp.replace('&amp;', '&');
	return strTemp;
}


function CustomEscape(strText){
	strText=strText.replace(/\?/g, '%3F');
	strText=strText.replace(/&/g, '%26');
	strText=strText.replace(/\+/g, '%2B');
	return strText;
}

//Validates the length of a string (used by UniSearch)
//ignores any leading or trailing spaces
//Return values
//answer = 0 - validation successful
//answer = 1 - string is blank
//answer = 2 - string has less than MinNoChar characters
//answer = 3 - string has more than MaxNoChar characters
function isBlank(str, MinNoChar, MaxNoChar) {
	if (str == '')
		return 1;

	var answer = 1;

	var j = 0;
	var jspace = 0;
	var wildcardchars = 0;
	var isPrevSpace = false;
	//check all the characters if they are spaces
	for (var i=0; i<str.length; i++) {
		if (str.charAt(i) != ' '){
			answer = 2;
			if (j == 0){
				str = str.substr(i);
				i = 0;
			}
			if (isPrevSpace){
				if (j != 0)
					j += jspace;
				jspace = 0;
				isPrevSpace = false;
			}
			if (str.charAt(i) != '*' && str.charAt(i) != '?'){
				j++;
			}else{
				wildcardchars++;
			}
			if (j >= MinNoChar)
				answer = 0;
			if (j + wildcardchars > MaxNoChar){
				answer = 3;
				break;
			}
		}else{
			jspace++;
			isPrevSpace = true;
		}
		//alert(j + '-' + jspace);
	}
	//alert("'" + str + "'");
	return answer;
}

    function LTrim(strText)
    {
        // MP 20070111 -- Trims leading spaces from input string
	    strText = strText.replace( /^\s+/g, '')
	    return strText;
    }

    function RTrim(strText)
    {
        // MP 20070111 -- Trims trialing spaces from input string
	    strText = strText.replace( /\s+$/g, '');
	    return strText;
    }

    function Trim(strText)
    {
        // MP 20070111 -- Trims leading and trailing spaces from input string
	    strText = strText.replace(/^\s+|\s+$/g, '');
	    return strText;
    }

    function TrimAll(strText)
    {
        // MP 20070206 -- Removes all spaces from the string
	    strText = strText.replace(/\s/g, '');
	    return strText;
    }
    
    function ReplaceText(strText, OldText, NewText)
    {
        // MP 20070206 -- Replaces the OldText with NexText within string strText
        var regex = new RegExp(OldText, "g");
        return strText.replace(regex, NewText)
    }
    
    function ValidateUSPhoneNumber(strValue)
    {
         if(strValue == '')
         {
            return true;
         }
        var regEx = /^((\(\d{3}\) ?)|(\d{3}-))\d{3}-\d{4}$/;
        return regEx.test(strValue);
    }
    
    function ValidateUSPhoneNumberFreeStyle(strValue)
    {
         if(strValue == '')
         {
            return true;
         }
        var regEx = new RegExp('\\D',"g");
        var replaced =  strValue.replace(regEx,'');
        if(replaced.length < 5)
        {
            return false;
        }
        return true;
    }
    
    function ValidateDueDate(strValue)
    {
        if(strValue == '')
        {
            return true;
        }
        if(!validateDate)
        {
            return false;
        }
        if(!validateDate(strValue))
        {
            return false;
        }
        var input = Date.parse(strValue);
        
        var today = new Date()
        
        var diff = input - today;
        if(Math.round(diff/1000/60/60/24) < 21)
        {
            return false;
        }
        return true;
    }


function HtmlDecode(s) 
{
    var out = "";
    if (s==null) return;

    var l = s.length; 
    for (var i=0; i<l; i++)
    {
        var ch = s.charAt(i);
        if (ch == '&') 
        {
            var semicolonIndex = s.indexOf(';', i+1); 
            if (semicolonIndex > 0) 
            { 
                var entity = s.substring(i + 1, semicolonIndex); 
                if (entity.length > 1 && entity.charAt(0) == '#') 
                { 
                    if (entity.charAt(1) == 'x' || entity.charAt(1) == 'X') 
                        ch = String.fromCharCode(eval('0'+entity.substring(1))); 
                    else 
                        ch = String.fromCharCode(eval(entity.substring(1))); 
                } 
                else 
                { 
                    switch (entity) 
                    { 
                        case 'quot': ch = String.fromCharCode(0x0022); break; 
                        case 'amp': ch = String.fromCharCode(0x0026); break; 
                        case 'lt': ch = String.fromCharCode(0x003c); break; 
                        case 'gt': ch = String.fromCharCode(0x003e); break; 
                        case 'nbsp': ch = String.fromCharCode(0x00a0); break; 
                        case 'iexcl': ch = String.fromCharCode(0x00a1); break; 
                        case 'cent': ch = String.fromCharCode(0x00a2); break; 
                        case 'pound': ch = String.fromCharCode(0x00a3); break; 
                        case 'curren': ch = String.fromCharCode(0x00a4); break; 
                        case 'yen': ch = String.fromCharCode(0x00a5); break; 
                        case 'brvbar': ch = String.fromCharCode(0x00a6); break; 
                        case 'sect': ch = String.fromCharCode(0x00a7); break; 
                        case 'uml': ch = String.fromCharCode(0x00a8); break; 
                        case 'copy': ch = String.fromCharCode(0x00a9); break; 
                        case 'ordf': ch = String.fromCharCode(0x00aa); break; 
                        case 'laquo': ch = String.fromCharCode(0x00ab); break; 
                        case 'not': ch = String.fromCharCode(0x00ac); break; 
                        case 'shy': ch = String.fromCharCode(0x00ad); break; 
                        case 'reg': ch = String.fromCharCode(0x00ae); break; 
                        case 'macr': ch = String.fromCharCode(0x00af); break; 
                        case 'deg': ch = String.fromCharCode(0x00b0); break; 
                        case 'plusmn': ch = String.fromCharCode(0x00b1); break; 
                        case 'sup2': ch = String.fromCharCode(0x00b2); break; 
                        case 'sup3': ch = String.fromCharCode(0x00b3); break; 
                        case 'acute': ch = String.fromCharCode(0x00b4); break; 
                        case 'micro': ch = String.fromCharCode(0x00b5); break; 
                        case 'para': ch = String.fromCharCode(0x00b6); break; 
                        case 'middot': ch = String.fromCharCode(0x00b7); break; 
                        case 'cedil': ch = String.fromCharCode(0x00b8); break; 
                        case 'sup1': ch = String.fromCharCode(0x00b9); break; 
                        case 'ordm': ch = String.fromCharCode(0x00ba); break; 
                        case 'raquo': ch = String.fromCharCode(0x00bb); break; 
                        case 'frac14': ch = String.fromCharCode(0x00bc); break; 
                        case 'frac12': ch = String.fromCharCode(0x00bd); break; 
                        case 'frac34': ch = String.fromCharCode(0x00be); break; 
                        case 'iquest': ch = String.fromCharCode(0x00bf); break; 
                        case 'Agrave': ch = String.fromCharCode(0x00c0); break; 
                        case 'Aacute': ch = String.fromCharCode(0x00c1); break; 
                        case 'Acirc': ch = String.fromCharCode(0x00c2); break; 
                        case 'Atilde': ch = String.fromCharCode(0x00c3); break; 
                        case 'Auml': ch = String.fromCharCode(0x00c4); break; 
                        case 'Aring': ch = String.fromCharCode(0x00c5); break; 
                        case 'AElig': ch = String.fromCharCode(0x00c6); break; 
                        case 'Ccedil': ch = String.fromCharCode(0x00c7); break; 
                        case 'Egrave': ch = String.fromCharCode(0x00c8); break; 
                        case 'Eacute': ch = String.fromCharCode(0x00c9); break; 
                        case 'Ecirc': ch = String.fromCharCode(0x00ca); break; 
                        case 'Euml': ch = String.fromCharCode(0x00cb); break; 
                        case 'Igrave': ch = String.fromCharCode(0x00cc); break; 
                        case 'Iacute': ch = String.fromCharCode(0x00cd); break; 
                        case 'Icirc': ch = String.fromCharCode(0x00ce ); break; 
                        case 'Iuml': ch = String.fromCharCode(0x00cf); break; 
                        case 'ETH': ch = String.fromCharCode(0x00d0); break; 
                        case 'Ntilde': ch = String.fromCharCode(0x00d1); break; 
                        case 'Ograve': ch = String.fromCharCode(0x00d2); break; 
                        case 'Oacute': ch = String.fromCharCode(0x00d3); break; 
                        case 'Ocirc': ch = String.fromCharCode(0x00d4); break; 
                        case 'Otilde': ch = String.fromCharCode(0x00d5); break; 
                        case 'Ouml': ch = String.fromCharCode(0x00d6); break; 
                        case 'times': ch = String.fromCharCode(0x00d7); break; 
                        case 'Oslash': ch = String.fromCharCode(0x00d8); break; 
                        case 'Ugrave': ch = String.fromCharCode(0x00d9); break; 
                        case 'Uacute': ch = String.fromCharCode(0x00da); break; 
                        case 'Ucirc': ch = String.fromCharCode(0x00db); break; 
                        case 'Uuml': ch = String.fromCharCode(0x00dc); break; 
                        case 'Yacute': ch = String.fromCharCode(0x00dd); break; 
                        case 'THORN': ch = String.fromCharCode(0x00de); break; 
                        case 'szlig': ch = String.fromCharCode(0x00df); break; 
                        case 'agrave': ch = String.fromCharCode(0x00e0); break; 
                        case 'aacute': ch = String.fromCharCode(0x00e1); break; 
                        case 'acirc': ch = String.fromCharCode(0x00e2); break; 
                        case 'atilde': ch = String.fromCharCode(0x00e3); break; 
                        case 'auml': ch = String.fromCharCode(0x00e4); break; 
                        case 'aring': ch = String.fromCharCode(0x00e5); break; 
                        case 'aelig': ch = String.fromCharCode(0x00e6); break; 
                        case 'ccedil': ch = String.fromCharCode(0x00e7); break; 
                        case 'egrave': ch = String.fromCharCode(0x00e8); break; 
                        case 'eacute': ch = String.fromCharCode(0x00e9); break; 
                        case 'ecirc': ch = String.fromCharCode(0x00ea); break; 
                        case 'euml': ch = String.fromCharCode(0x00eb); break; 
                        case 'igrave': ch = String.fromCharCode(0x00ec); break; 
                        case 'iacute': ch = String.fromCharCode(0x00ed); break; 
                        case 'icirc': ch = String.fromCharCode(0x00ee); break; 
                        case 'iuml': ch = String.fromCharCode(0x00ef); break; 
                        case 'eth': ch = String.fromCharCode(0x00f0); break; 
                        case 'ntilde': ch = String.fromCharCode(0x00f1); break; 
                        case 'ograve': ch = String.fromCharCode(0x00f2); break; 
                        case 'oacute': ch = String.fromCharCode(0x00f3); break; 
                        case 'ocirc': ch = String.fromCharCode(0x00f4); break; 
                        case 'otilde': ch = String.fromCharCode(0x00f5); break; 
                        case 'ouml': ch = String.fromCharCode(0x00f6); break; 
                        case 'divide': ch = String.fromCharCode(0x00f7); break; 
                        case 'oslash': ch = String.fromCharCode(0x00f8); break; 
                        case 'ugrave': ch = String.fromCharCode(0x00f9); break; 
                        case 'uacute': ch = String.fromCharCode(0x00fa); break; 
                        case 'ucirc': ch = String.fromCharCode(0x00fb); break; 
                        case 'uuml': ch = String.fromCharCode(0x00fc); break; 
                        case 'yacute': ch = String.fromCharCode(0x00fd); break; 
                        case 'thorn': ch = String.fromCharCode(0x00fe); break; 
                        case 'yuml': ch = String.fromCharCode(0x00ff); break; 
                        case 'OElig': ch = String.fromCharCode(0x0152); break; 
                        case 'oelig': ch = String.fromCharCode(0x0153); break; 
                        case 'Scaron': ch = String.fromCharCode(0x0160); break; 
                        case 'scaron': ch = String.fromCharCode(0x0161); break; 
                        case 'Yuml': ch = String.fromCharCode(0x0178); break; 
                        case 'fnof': ch = String.fromCharCode(0x0192); break; 
                        case 'circ': ch = String.fromCharCode(0x02c6); break; 
                        case 'tilde': ch = String.fromCharCode(0x02dc); break; 
                        case 'Alpha': ch = String.fromCharCode(0x0391); break; 
                        case 'Beta': ch = String.fromCharCode(0x0392); break; 
                        case 'Gamma': ch = String.fromCharCode(0x0393); break; 
                        case 'Delta': ch = String.fromCharCode(0x0394); break; 
                        case 'Epsilon': ch = String.fromCharCode(0x0395); break; 
                        case 'Zeta': ch = String.fromCharCode(0x0396); break; 
                        case 'Eta': ch = String.fromCharCode(0x0397); break; 
                        case 'Theta': ch = String.fromCharCode(0x0398); break; 
                        case 'Iota': ch = String.fromCharCode(0x0399); break; 
                        case 'Kappa': ch = String.fromCharCode(0x039a); break; 
                        case 'Lambda': ch = String.fromCharCode(0x039b); break; 
                        case 'Mu': ch = String.fromCharCode(0x039c); break; 
                        case 'Nu': ch = String.fromCharCode(0x039d); break; 
                        case 'Xi': ch = String.fromCharCode(0x039e); break; 
                        case 'Omicron': ch = String.fromCharCode(0x039f); break; 
                        case 'Pi': ch = String.fromCharCode(0x03a0); break; 
                        case ' Rho ': ch = String.fromCharCode(0x03a1); break; 
                        case 'Sigma': ch = String.fromCharCode(0x03a3); break; 
                        case 'Tau': ch = String.fromCharCode(0x03a4); break; 
                        case 'Upsilon': ch = String.fromCharCode(0x03a5); break; 
                        case 'Phi': ch = String.fromCharCode(0x03a6); break; 
                        case 'Chi': ch = String.fromCharCode(0x03a7); break; 
                        case 'Psi': ch = String.fromCharCode(0x03a8); break; 
                        case 'Omega': ch = String.fromCharCode(0x03a9); break; 
                        case 'alpha': ch = String.fromCharCode(0x03b1); break; 
                        case 'beta': ch = String.fromCharCode(0x03b2); break; 
                        case 'gamma': ch = String.fromCharCode(0x03b3); break; 
                        case 'delta': ch = String.fromCharCode(0x03b4); break; 
                        case 'epsilon': ch = String.fromCharCode(0x03b5); break; 
                        case 'zeta': ch = String.fromCharCode(0x03b6); break; 
                        case 'eta': ch = String.fromCharCode(0x03b7); break; 
                        case 'theta': ch = String.fromCharCode(0x03b8); break; 
                        case 'iota': ch = String.fromCharCode(0x03b9); break; 
                        case 'kappa': ch = String.fromCharCode(0x03ba); break; 
                        case 'lambda': ch = String.fromCharCode(0x03bb); break; 
                        case 'mu': ch = String.fromCharCode(0x03bc); break; 
                        case 'nu': ch = String.fromCharCode(0x03bd); break; 
                        case 'xi': ch = String.fromCharCode(0x03be); break; 
                        case 'omicron': ch = String.fromCharCode(0x03bf); break; 
                        case 'pi': ch = String.fromCharCode(0x03c0); break; 
                        case 'rho': ch = String.fromCharCode(0x03c1); break; 
                        case 'sigmaf': ch = String.fromCharCode(0x03c2); break; 
                        case 'sigma': ch = String.fromCharCode(0x03c3); break; 
                        case 'tau': ch = String.fromCharCode(0x03c4); break; 
                        case 'upsilon': ch = String.fromCharCode(0x03c5); break; 
                        case 'phi': ch = String.fromCharCode(0x03c6); break; 
                        case 'chi': ch = String.fromCharCode(0x03c7); break; 
                        case 'psi': ch = String.fromCharCode(0x03c8); break; 
                        case 'omega': ch = String.fromCharCode(0x03c9); break; 
                        case 'thetasym': ch = String.fromCharCode(0x03d1); break; 
                        case 'upsih': ch = String.fromCharCode(0x03d2); break; 
                        case 'piv': ch = String.fromCharCode(0x03d6); break; 
                        case 'ensp': ch = String.fromCharCode(0x2002); break; 
                        case 'emsp': ch = String.fromCharCode(0x2003); break; 
                        case 'thinsp': ch = String.fromCharCode(0x2009); break; 
                        case 'zwnj': ch = String.fromCharCode(0x200c); break; 
                        case 'zwj': ch = String.fromCharCode(0x200d); break; 
                        case 'lrm': ch = String.fromCharCode(0x200e); break; 
                        case 'rlm': ch = String.fromCharCode(0x200f); break; 
                        case 'ndash': ch = String.fromCharCode(0x2013); break; 
                        case 'mdash': ch = String.fromCharCode(0x2014); break; 
                        case 'lsquo': ch = String.fromCharCode(0x2018); break; 
                        case 'rsquo': ch = String.fromCharCode(0x2019); break; 
                        case 'sbquo': ch = String.fromCharCode(0x201a); break; 
                        case 'ldquo': ch = String.fromCharCode(0x201c); break; 
                        case 'rdquo': ch = String.fromCharCode(0x201d); break; 
                        case 'bdquo': ch = String.fromCharCode(0x201e); break; 
                        case 'dagger': ch = String.fromCharCode(0x2020); break; 
                        case 'Dagger': ch = String.fromCharCode(0x2021); break; 
                        case 'bull': ch = String.fromCharCode(0x2022); break; 
                        case 'hellip': ch = String.fromCharCode(0x2026); break; 
                        case 'permil': ch = String.fromCharCode(0x2030); break; 
                        case 'prime': ch = String.fromCharCode(0x2032); break; 
                        case 'Prime': ch = String.fromCharCode(0x2033); break; 
                        case 'lsaquo': ch = String.fromCharCode(0x2039); break; 
                        case 'rsaquo': ch = String.fromCharCode(0x203a); break; 
                        case 'oline': ch = String.fromCharCode(0x203e); break; 
                        case 'frasl': ch = String.fromCharCode(0x2044); break; 
                        case 'euro': ch = String.fromCharCode(0x20ac); break; 
                        case 'image': ch = String.fromCharCode(0x2111); break; 
                        case 'weierp': ch = String.fromCharCode(0x2118); break; 
                        case 'real': ch = String.fromCharCode(0x211c); break; 
                        case 'trade': ch = String.fromCharCode(0x2122); break; 
                        case 'alefsym': ch = String.fromCharCode(0x2135); break; 
                        case 'larr': ch = String.fromCharCode(0x2190); break; 
                        case 'uarr': ch = String.fromCharCode(0x2191); break; 
                        case 'rarr': ch = String.fromCharCode(0x2192); break; 
                        case 'darr': ch = String.fromCharCode(0x2193); break; 
                        case 'harr': ch = String.fromCharCode(0x2194); break; 
                        case 'crarr': ch = String.fromCharCode(0x21b5); break; 
                        case 'lArr': ch = String.fromCharCode(0x21d0); break; 
                        case 'uArr': ch = String.fromCharCode(0x21d1); break; 
                        case 'rArr': ch = String.fromCharCode(0x21d2); break; 
                        case 'dArr': ch = String.fromCharCode(0x21d3); break; 
                        case 'hArr': ch = String.fromCharCode(0x21d4); break; 
                        case 'forall': ch = String.fromCharCode(0x2200); break; 
                        case 'part': ch = String.fromCharCode(0x2202); break; 
                        case 'exist': ch = String.fromCharCode(0x2203); break; 
                        case 'empty': ch = String.fromCharCode(0x2205); break; 
                        case 'nabla': ch = String.fromCharCode(0x2207); break; 
                        case 'isin': ch = String.fromCharCode(0x2208); break; 
                        case 'notin': ch = String.fromCharCode(0x2209); break; 
                        case 'ni': ch = String.fromCharCode(0x220b); break; 
                        case 'prod': ch = String.fromCharCode(0x220f); break; 
                        case 'sum': ch = String.fromCharCode(0x2211); break; 
                        case 'minus': ch = String.fromCharCode(0x2212); break; 
                        case 'lowast': ch = String.fromCharCode(0x2217); break; 
                        case 'radic': ch = String.fromCharCode(0x221a); break; 
                        case 'prop': ch = String.fromCharCode(0x221d); break; 
                        case 'infin': ch = String.fromCharCode(0x221e); break; 
                        case 'ang': ch = String.fromCharCode(0x2220); break; 
                        case 'and': ch = String.fromCharCode(0x2227); break; 
                        case 'or': ch = String.fromCharCode(0x2228); break; 
                        case 'cap': ch = String.fromCharCode(0x2229); break; 
                        case 'cup': ch = String.fromCharCode(0x222a); break; 
                        case 'int': ch = String.fromCharCode(0x222b); break; 
                        case 'there4': ch = String.fromCharCode(0x2234); break; 
                        case 'sim': ch = String.fromCharCode(0x223c); break; 
                        case 'cong': ch = String.fromCharCode(0x2245); break; 
                        case 'asymp': ch = String.fromCharCode(0x2248); break; 
                        case 'ne': ch = String.fromCharCode(0x2260); break; 
                        case 'equiv': ch = String.fromCharCode(0x2261); break; 
                        case 'le': ch = String.fromCharCode(0x2264); break; 
                        case 'ge': ch = String.fromCharCode(0x2265); break; 
                        case 'sub': ch = String.fromCharCode(0x2282); break; 
                        case 'sup': ch = String.fromCharCode(0x2283); break; 
                        case 'nsub': ch = String.fromCharCode(0x2284); break; 
                        case 'sube': ch = String.fromCharCode(0x2286); break; 
                        case 'supe': ch = String.fromCharCode(0x2287); break; 
                        case 'oplus': ch = String.fromCharCode(0x2295); break; 
                        case 'otimes': ch = String.fromCharCode(0x2297); break; 
                        case 'perp': ch = String.fromCharCode(0x22a5); break; 
                        case 'sdot': ch = String.fromCharCode(0x22c5); break; 
                        case 'lceil': ch = String.fromCharCode(0x2308); break; 
                        case 'rceil': ch = String.fromCharCode(0x2309); break; 
                        case 'lfloor': ch = String.fromCharCode(0x230a); break; 
                        case 'rfloor': ch = String.fromCharCode(0x230b); break; 
                        case 'lang': ch = String.fromCharCode(0x2329); break; 
                        case 'rang': ch = String.fromCharCode(0x232a); break; 
                        case 'loz': ch = String.fromCharCode(0x25ca); break; 
                        case 'spades': ch = String.fromCharCode(0x2660); break; 
                        case 'clubs': ch = String.fromCharCode(0x2663); break; 
                        case 'hearts': ch = String.fromCharCode(0x2665); break; 
                        case 'diams': ch = String.fromCharCode(0x2666); break; 
                        default: ch = ''; break; 
                    } 
                } 
                i = semicolonIndex; 
            } 
        } 
        out += ch; 
    } 
    return out;
} 

function IsDateTime(input) {
    // Accepts a wide variety of dates including Jun 3, 1998, 11/09/49, etc
    var ms = Date.parse(input) // milliseconds since January 1, 1970
    if (isNaN(ms)) {
        return false;
    }
    var dt = new Date(input);
    //Checks for SQL 2005 limitation on the DateTime data type range
    if(dt.getFullYear() < 1753 || dt.getFullYear() > 9999)
    {
        return false;
    }
    //alert(dt.toString());
    return true;
}