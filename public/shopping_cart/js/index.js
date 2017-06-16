var fadeTime = 100;


/* Assign actions */
$('.product-quantity input').change( function() {
  updateQuantity(this);
});

$('.product-removal button').click( function() {
  removeItem(this);
});


/* Recalculate cart */
function recalculateCart()
{
  var subtotal = 0;

  /* Sum up row totals */
  $('.product').each(function () {
    subtotal += parseFloat($(this).children('.product-line-price').text());
  });

  /* Calculate totals */
  var total = subtotal;

  /* Update totals display */
  $('.totals-value').fadeOut(fadeTime, function() {
    $('#cart-subtotal').html(subtotal.toFixed(2));
    
    $('#cart-total').html(total.toFixed(2));
    if(total == 0){
      $('.checkout').fadeOut(fadeTime);
    }else{
      $('.checkout').fadeIn(fadeTime);
    }
    $('.totals-value').fadeIn(fadeTime);
  });
}


/* Update quantity */
function updateQuantity(quantityInput)
{
  /* Calculate line price */
  var productRow = $(quantityInput).parent().parent();
  var price = parseFloat(productRow.children('.product-price').text());
  var quantity = $(quantityInput).val();
  var linePrice = price * quantity;

  /* Update line price display and recalc cart totals */
  productRow.children('.product-line-price').each(function () {
    $(this).fadeOut(fadeTime, function() {
      $(this).text(linePrice.toFixed(2));
      recalculateCart();
      $(this).fadeIn(fadeTime);
    });
  });
}


/* Remove item from cart */
function removeItem(removeButton)
{
  /* Remove row from DOM and recalc cart total */
  var productRow = $(removeButton).parent().parent();
  productRow.slideUp(fadeTime, function() {
    productRow.remove();
    recalculateCart();
  });
}

/* check out, post to server */
var checkOutButton = document.getElementById('checkOutButton');
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
    });
  }else{
    alert("You have to log in first");
  }
});
function getUserNameFromButton(){
  var loginButton = document.getElementById('getNameOnShoppingCart');
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

