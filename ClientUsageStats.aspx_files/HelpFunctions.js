function LoadCSHelp(starttopic){
	if(starttopic && starttopic != ''){
	    newWindow = window.open('/Help/help.aspx?xsrfToken=' + getXsrfToken() + '&StartTopic='+starttopic, '_newHelp', 'resizable=yes');
	    
	}else{
	    newWindow = window.open('/Help/help.aspx?xsrfToken=' + getXsrfToken(), '_newHelp', 'resizable=yes');
	}
	
	newWindow.focus();
}
