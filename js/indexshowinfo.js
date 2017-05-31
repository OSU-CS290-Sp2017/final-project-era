// This js code is used for user login.
// Once user click the "login" button, the "user login" block will appear.
// In the (user login) block, 
// if users do not have an account: click "create Account", pop up a new window
// if users have an account: 		input name, id, password, then click "login" then login
//

function PopupCenter(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
}





var showPriceList = function(){
		var iframe = document.createElement('iframe');
		iframe.src = 'http://google.com';
		document.body.appendChild(iframe);
		alert('you click');
		console.log('hello');
		PopupCenter('http://www.google.com','xtf','900','500');  
	}

var price_list_button = document.getElementById('price-list-button');
console.log(price_list_button);
price_list_button.addEventListener('click',showPriceList);



	
