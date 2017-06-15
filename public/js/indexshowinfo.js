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
        // layer.open({
        //   title: 'price list',
        //   type: 1,
        //   skin: 'layui-layer-rim', //加上边框
        //   area: ['420px', '240px'], //宽高
        //   content: '价格内容'
        // });
        console.log("start");
        // $.prompt('success');
        // $.getJSON('js/indexinfo/pricelist.json', function(json){
        //   console.log("in json");
        //   console.log(json);
        //   layer.photos({
        //     photos: json //格式见API文档手册页
        //     ,anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机
        //   });
        // }); 

        // layer.photos({
        //   photos: '#layer-photos',
        //   anim: 0 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
        // });         

        layer.open({
          type: 1,
          title: false,
          closeBtn: 0,
          area: '1000px',
          skin: 'layui-layer-nobg', //没有背景色
          shadeClose: true,
          content: $('#layer-photos')
        });



        console.log("end");       
	}

var showInfo = function(){
    layer.open({
          title: ' ',
          type: 1,
          skin: 'layui-layer-rim', //加上边框
          area: ['420px', '240px'], //宽高
          content: 'Located in the Kelley Engineering Center, e.Cafe offers a wide range of dietary sensitive food, from Vegan to Vegetarian and Gluten Free. We offer Portland Roasting beans, as well as Pepsi products. You can also find a selection of fruits and veggies and pastries at our front counter.'
        });
}


var showTeam = function(){
    layer.open({
      type: 2,
      title: false,
      closeBtn: 0,
      shadeClose: true,
      area: ['90%','50%'],

      content: 'teammember.html',
    });
}


var price_list_button = document.getElementById('price-list-button');
if(price_list_button){
  price_list_button.addEventListener('click',showPriceList);
}
var about_ecafe_button = document.getElementById('about-ecafe-button');
if (about_ecafe_button) {
  about_ecafe_button.addEventListener('click',showInfo);
}


var development_team_button = document.getElementById('development-team-button');
if (development_team_button) {
  development_team_button.addEventListener('click',showTeam);
}


	
