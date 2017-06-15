var drinkSelectRadioButtons = document.getElementsByClassName('drinks-size');

var createOrderButton = document.getElementById('create-order-button');

var drinkValue;
var drinkDescription;

for (var i = 0; i < drinkSelectRadioButtons.length; i++) {
	drinkSelectRadioButtons[i].addEventListener('click', function(event){
		drinkValue = this.nextSibling.textContent.trim();
		if (drinkValue.includes(",")){
			drinkValue = drinkValue.split(",")[0].trim(); 
		}
		console.log("event2"+drinkValue+"------"+this.id);
		drinkDescription = this.id;
		createOrderButton.addEventListener('click', function(event2){
			console.log("event3"+drinkValue+"---!---"+drinkDescription);
		});
	},false);
}

console.log("event22"+drinkValue);