# What is progressBarPlugin?

progressBarPlugin is a jQjuery plugin that allows user's to dynamically load as many progress bars within
a webpage when needed by specifying it's selector id or by using jquery's data().  Currently, there's only one "type" of progress bar and that is the "subscription" progress bar.  You'll read more about it below.  

1. Subscription Progress Bar
	- allows users to keep track of their usage so that they don't go over their plan.
	- (ex) AT&T could use this to allow their client's to keep track of their data plan, so they know when
	       they've exceeded their GB (Giga Bytes) for the month.

## How to Install?

Either clone this project or download the zip file to get the jquery.progressBarPlugin.js file.

## How to Use?

### Basic Setup

First, add jquery.progressBarPlugin.js to your project "js" directory.

```html
|-- yourProject
|	|-- images
|	|-- css
|	|-- js
|		|-- jquery.progressBarPlugin.js
|	|-- index.html
```

Then, reference the jquery.progressBarPlugin.js file within your index.html file at the bottom of the "body" tag NOT in the "head" tag like so:

```html
<body>
	<script src="js/jquery.progressBarPlugin.js"></script>
</body>
```

Second, add progress-bar.css to your project "css" directory.

```html
|-- yourProject
|	|-- images
|	|-- css
|		|-- progress-bar.css
|		|-- main.css
|		|-- normalize.css
|	|-- js
|	|-- index.html
```

Then, reference the progress-bar.css file within the "head" tag of your index.html file like so:

```html
<html>
	<title></title>
	<head>
		<link rel="stylesheet" href="css/main.css">
		<link rel="stylesheet" href="css/normalize.css">
		<link rel="stylesheet" href="css/progress-bar.css">
	</head>
	<body>
	
	</body>
</html>
```
```html
***NOTE*** At some point I'll merge these 3 css files into a master.css file, which is recommended.
```

Lastly, add all the images from the zip/clone into your "images" directory like so:

```html
|-- yourProject
|	|-- images
|		|-- danger-flag.png
|		|-- error-flag.png
|		|-- fancy-background.png
|		|-- success-flag.png
|	|-- css
|	|-- js
|	|-- index.html
```

```html
***NOTE*** At some point I'll convert these images to a sprite, which is recommended.
```

### How To Use The Progress Bar Plugin

You can do this 1 of 2 ways, either by creating a dom element which you'll reference 
through a method call OR by creating a dom element and using jquery's data().  Listed below
are 2 examples showing how each are done.

```html
<body>
	<div class="container">
		// 1) Using Jquery's Data Method
		<div class="progressBar" data-id="1" data-type="subscription" style="width: 80%;" data-usage="85" data-max="100" data-title="subscription" data-success="your under" data-danger="getting close" data-error="youve gone over"></div>
		
		// 2) Creating a DOM element as a selector to be called through JS
		<div id="progressBar1"></div>
	</div>
</body>
```
Lastly, pass the property values of your progress bar into the progressBar() if you chose option 2 from above,
like so:

```html
<script>
	$().ready(function() {
		$('#progressBar1').progressBar({
	        currentContactUsage: 50				//actual amount that's been used
	        currentContactEntitlement: 100,	 	//max amount that can be used
	        background: 'fancy',				//fancy or ie
		    title: 'title',
			type: 'subscription',				//subscription is the ONLY option for now
		   	message: {
				success: "your under",
				danger: "getting close",
				error: "youve gone over"
			},
		});
	});
</script>
```
### Things To Note About quotePlugin Properties

1. currentContactUsage : any number | this is the amount being used by the user
2. currentContactEntitlement : any number. | this is the max amount the user can use before being charged extra
3. background : ie,fancy | ie background is loaded for ie users to fix some styling, defaults to fancy though
4. title : title of progress bar
5. type : subscription | only option for now, left it open for anyone to add addition ones
6. theme : none for now
7. message.success : message you want to show when user is way under
8. message.danger : message you want to show when user is getting close to their max amount
9. message.error : message you want to show when user when they've hit or gone over their amount

FYI : with option 7,8 or 9, you can pass it the following tag:

```html
	<span class='alert-amount'></span>
```

like so: 

```html
	<div class="progressBar" data-id="1" data-success="<span class='alert-amount'></span>" data-danger="<span class='alert-amount'></span>" data-error="<span class='alert-amount'></span>"></div>
```
or:

```html
<script>
	$().ready(function() {
		$('#progressBar1').progressBar({
		   	message: {
				success: "your under your amount by <span class='alert-amount'></span> mb",
				danger: "getting close to your max amount of gb, youve used <span class='alert-amount'></span> mb",
				error: "youve gone over your gb by <span class='alert-amount'></span> amount"
			},
		});
	});
</script>
```
NOTE: by default the progressBarPlugin calculates the remaining amount for the user and passes it to the listed above selector.  So, if you specify that tag like so in the above 2 examples, it will append the remaining number into the alerted message underneath the progress bar.


