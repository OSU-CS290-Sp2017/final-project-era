var drinkSelectRadioButtons = document.getElementsByClassName('drinks-size');

var createOrderButton = document.getElementById('create-order-button');

var drinkValue;
var drinkDescription;
var drinkName;

// From radio button return, get:
// drink name, drink value, drink description
for (var i = 0; i < drinkSelectRadioButtons.length; i++) {
	drinkSelectRadioButtons[i].addEventListener('click', function(event){

		drinkName = this.parentNode.parentNode.cells[0].innerHTML.trim();
		drinkValue = this.nextSibling.textContent.trim();
		if (drinkValue.includes(",")){
			drinkValue = drinkValue.split(",")[0].trim(); 
		}
		drinkDescription = this.id;

	},false);
}

// by click the shopping cart button, get:
// drink name, drink value, drink description
// and post to server
createOrderButton.addEventListener('click', function(event2){
	var userName = getUserNameFromButton();
	console.log("event==> drinkName: "+drinkName+";drinkValue = "+drinkValue+
		"---drinkDescription ="+drinkDescription+
		"--userName ="+userName);
	//get user name from the button
	

	if(userName != null){
		console.log("heli1==> userName != null now");
		storeUserOrder(userName,drinkName,drinkDescription, drinkValue, function(err){
			if (err) {
				console.log("heli12==> one err");
				alert("Unable to place current order.  Got this error:\n\n" + err);
			} 
			else {
				console.log("heli22==> no err");
				// var photoCardTemplate = Handlebars.templates.shoppingCartContent;
				// var templateArgs = {
				// 	name: userName,
				// 	orderName:drinkName,
				// 	orderPrice:drinkValue,
				// 	orderDescription:drinkDescription
				// };

				// var photoCardHTML = photoCardTemplate(templateArgs);
	   //        	console.log("url==>"+photoCardHTML);

	   //        	var photoCardContainer = document.querySelector('.photo-card-container');
	   //        	photoCardContainer.insertAdjacentHTML('beforeend', photoCardHTML);

	      	}
	  });
	}else{
		alert("You have to log in first");
	}

});
function getUserNameFromButton(){
	var loginButton = document.getElementById('popUp-login-box');
	return loginButton.textContent;
}



function storeUserOrder(userName,drinkName,drinkDescription, drinkValue, callback){
	var postURL = "/drink";
	var postRequest = new XMLHttpRequest();
	postRequest.open('POST', postURL);
	postRequest.setRequestHeader('Content-Type', 'application/json');
	console.log("heli01==>postRequest == "+postRequest);
	postRequest.addEventListener('load', function (event) { 
		console.log("event:status = "+event.target.status);
		var error;
		if (event.target.status !== 200) {
			error = event.target.response;
		}
		callback(error);
	});

	var postBody = {
		name: userName,
		orderName:drinkName,
		orderPrice:drinkValue,
		orderDescription:drinkDescription
	};
	console.log("req = "+JSON.stringify(postBody));
	postRequest.send(JSON.stringify(postBody)); 
}