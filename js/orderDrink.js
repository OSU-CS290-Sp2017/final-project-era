var drinkSelectRadioButtons = document.getElementsByClassName('drinks-size');

var testButton = document.getElementById('hotDrink-coffee-12');
function test(event){
	console.log("event"+event);
}
testButton.addEventListener('click', test);


// for(drinkSelectRadioButton in drinkSelectRadioButtons){

// 	// drinkSelectRadioButtons[drinkSelectRadioButtons].addEventListener('click', test);
// 	console.log("buttone =="+drinkSelectRadioButton);
// }

for (var i = 0; i < drinkSelectRadioButtons.length; i++) {
	// console.log(drinkSelectRadioButtons[i]);
	drinkSelectRadioButtons[i].addEventListener('click', function(event){
		console.log("event"+event+drinkSelectRadioButtons[i]);
	},false);
	// console.log("buttone =="+drinkSelectRadioButton);
}