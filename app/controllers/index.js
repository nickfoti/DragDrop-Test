Titanium.UI.setBackgroundColor('#000');

var win = Titanium.UI.createWindow({
      title : 'dragDropKit',
      backgroundColor : '#fff'
});
var book = Ti.UI.createView({
      width : '100%',
      bottom : 0,
      right:0,
      height : '100%',
      backgroundColor:'transparent'
});
var view1 = Titanium.UI.createImageView({
      width : 262,
      bottom : 0,
      right:0,
      height : 218,
      image:'/images/empty.png'
});
var view2 = Titanium.UI.createImageView({
      width : 128,
      top : 20,
      left:20,
      height : 128,
      image:'/images/book.png'
});


view1.addEventListener('doubletap', function(e){
	view1.image = '/images/empty.png';
	view2.animate({
			top:20,
			left:20,
			opacity:1,
			duration:200,
			curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
	});	
});

view2.addEventListener('touchend', function(e){
	//alert(e.x + ' x / y '+e.y);
	if((e.x < 500)||(e.y < 600)) {
		this.animate({
			top:20,
			left:20,
			duration:200,
			curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
		});
	} else {
		view2.opacity = 0;
		view1.image = '/images/full.png';
	};
});


Alloy.Globals.DD.attach({
      view : view2,
      container : book
});


book.add(view2);
win.add(book);
win.add(view1);
win.open();