
function verify_date(input) {
    // Accepts a wide variety of dates including Jun 3, 1998, 11/09/49, etc
    var ms = Date.parse(input) // milliseconds since January 1, 1970
    if (isNaN(ms)) {
        //alert("Bad DATE!");
        return false;
    }

    var dt = new Date(input);
    var remainder = input.replace(dt.getFullYear(), '').replace(dt.getMonth() + 1, '').replace(dt.getDate(), '');
    remainder = remainder.replace(monthsofyear[dt.getMonth()], '').replace(monthsofyearshort[dt.getMonth()], '');
    remainder = remainder.replace(/[\s/,]*/g, '')

    return (remainder.length == 0);
    //var dobj = new Date(t);
    //alert((dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getYear());
    //return true;
}

var monthsofyear   = new Array('January','February','March',
                                   'April','May','June',
                                   'July','August','September',
                                   'October','November','December');

var monthsofyearshort   = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec');

var daysofmonth    = new Array(31, 28, 31, 30, 31, 30,
                                    31, 31, 30, 31, 30, 31);
var daysofmonthLY  = new Array(31, 29, 31, 30, 31, 30,
                                    31, 31, 30, 31, 30, 31);

function LeapYear(year) {
    if ((year/4)   != Math.floor(year/4))   return false;
    if ((year/100) != Math.floor(year/100)) return true;
    if ((year/400) != Math.floor(year/400)) return false;
    return true;
}

function ValidDate(day,month,year){
	//alert('day=' + day + ', month=' + month + ', year=' + year);
	month = month - 1;

	//quick checks
	if(day > 31 || day < 1 || month > 11 || month < 0 || year > 3000 || year < 1753){
		return false;
	}

    if( (LeapYear(year) && (day > daysofmonthLY[month])) || (!LeapYear(year) && (day > daysofmonth[month]))){
        return false;
    }
    else{
        return true;
    }
}

function validateDate(date){
    //alert(date);
	if(date.indexOf('//') > 0){
		return false;
	}

	// NaN is never equal to itself.
    if(Date.parse(date) != Date.parse(date)){
        return false;
    }
    else{
    	var delimPos;
    	var delim;
    	delim = '/';
    	delimPos = date.indexOf(delim);
    	if(delimPos == -1){
    		return false;
    	}
    	else{
	        var varMonth = date.substring(0,delimPos);
	        date = date.substring(delimPos + 1, date.length);
	        delimPos = date.indexOf(delim);
	        if(delimPos == -1){
	        	return false;
	        }
	        else{
		        var varDay = date.substring(0, delimPos);
		        date = date.substring(delimPos + 1, date.length);
		        var varYear = date;
				if (isNaN(varMonth) || isNaN(varDay) || isNaN(varYear) || varMonth.length > 2 || varDay.length > 2 || varYear.length > 4){
					return false;
				}
				if(!ValidDate(varDay, varMonth, varYear)){
					return false;
				}
				else{
					return true;
				}
			}
		}
    }
}

function validateDateTime(date){
    //alert(date);
	if(date.indexOf('//') > 0){
		return false;
	}

	// NaN is never equal to itself.
    if(Date.parse(date) != Date.parse(date)){
        return false;
    }
    else{
    	var delimPos;
    	var delim;
    	delim = '/';
    	delimPos = date.indexOf(delim);
    	if(delimPos == -1){
    		return false;
    	}
    	else{
	        var varMonth = date.substring(0,delimPos);
	        date = date.substring(delimPos + 1, date.length);
	        delimPos = date.indexOf(delim);
	        if(delimPos == -1){
	        	return false;
	        }
	        else{
		        var varDay = date.substring(0, delimPos);
		        
		        date = date.substring(delimPos + 1, date.length);
		        
		        //validating time
		        var delimTime = ':';
		        var delimTimePos = date.indexOf(delimTime);
		        
		        var delimBreak = ' ';
		        var delimBreakPos = date.indexOf(delimBreak);
		        
		        var varYear;
		        
	        
		        if(delimTimePos == -1){
		            varYear = date;
		        }
		        else{
		            varYear = date.substring(0,delimBreakPos);
		        }
				
				if (isNaN(varMonth) || isNaN(varDay) || isNaN(varYear) || varMonth.length > 2 || varDay.length > 2 || varYear.length > 4){
				    return false;
				}
				if(!ValidDate(varDay, varMonth, varYear)){
				    return false;
				}
				else{
				    if(delimTimePos == -1)
				    {
				        return true;
				    }
				    else{
				        date = date.substring(delimBreakPos + 1, date.length);
				    }
				}
		        //if this code is reached, there is a time input attached to the date
		        
		        if(date.indexOf('::') > 0 || date.indexOf(': ') > 0 || date.indexOf(' :') > 0){
		            return false;
	            }   
		        
		        delimTimePos = date.indexOf(delimTime);
		        var varHour = date.substring(0, delimTimePos);
		        
		        date = date.substring(delimTimePos + 1, date.length);
		        
		        delimTimePos = date.indexOf(delimTime);
		        var varSecond = 0;
		        
		        //seconds included
		        if(delimTimePos != -1){
		            varSecond = date.substring(0, delimTimePos);
		            date = date.substring(delimTimePos + 1, date.length);
		        }
		            
		        delimBreakPos = date.indexOf(delimBreak);
		        if(delimBreakPos == -1){
		            return false;
		        }
		        else{
		            var varMinute = date.substring(0,delimBreakPos);
		            date = date.substring(delimBreakPos + 1, date.length);
		            var varAmPm = date.toUpperCase();
		        }
	
		        if (isNaN(varHour) || isNaN(varMinute) || isNaN(varSecond)){
		                return false;   
		        }

		        if(!ValidTime(varHour,varMinute,varSecond,varAmPm)){
		            return false;
		        }
		        else{
		            return true;
		        }
			    
			 }   
		}
    }
}

function ValidTime(hour,minute,second,ampm){
	//quick checks
	if(hour > 12 || hour < 1 || minute > 59 || minute < 0 || second > 59 || second < 0){
		return false;
	}
	else{
	    if(ampm == "AM" || ampm == "PM"){
	        return true;
	    }
	    else {
	        return false;
	    }
    }
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