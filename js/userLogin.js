// This js code is used for user login.
// Once user click the "login" button, the "user login" block will appear.
// In the (user login) block, 
// if users do not have an account: click "create Account", pop up a new window
// if users have an account: 		input name, id, password, then click "login" then login
//


 // popup the create new twitter window:
var addLoginContainer = document.getElementById('user-login-box');

var createLoginButton = document.getElementById('popUp-login-box');
createLoginButton.addEventListener('click', addNewLoginPanel);
function addNewLoginPanel(event){
	addLoginContainer.classList = "";
}

// close the login window:
var closeLoginPanelButton = document.getElementById('login-close-button');
function closeLoginPanel(event){
	addLoginContainer.classList.add("hidden");
}
closeLoginPanelButton.addEventListener('click', closeLoginPanel);



