/* 
=======================
AUDIO ICON
=======================
*/
$('.speaker').click(function(e) {
	e.preventDefault();
	$(this).toggleClass('mute'); // icon display change when click
	$("#myAudio").prop("muted",!$("#myAudio").prop("muted")); // music on/off on click
});

/* 
=======================
GAME
=======================
*/

// dont't auto open the dialog box
$( "#dialog" ).dialog({
    autoOpen: false
});

//cheat
$(document).keypress(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		callDialog();
	}
});

// variables for the game
var BoxOpened = "";
var ImgOpened = "";
var Counter = 0;
var ImgFound = 0;
var gameOver = false;
var Source = "#boxcard";

//images for the game
var ImgSource = [
  "img/level1/hp1.jpg",
  "img/level1/hp2.jpg",
  "img/level1/hp3.jpg",
  "img/level1/hp4.jpg",
  "img/level1/hp5.jpg",
  "img/level1/hp6.jpg",
  "img/level1/hp7.jpg",
  "img/level1/hp8.jpg"
];

//assign card holder divs
$(function() {
	for (var y = 1; y < 3 ; y++) {
		$.each(ImgSource, function(i, val) {
			$(Source).append("<div id=card" + y + i + "><img src=" + val + " />");
		});
	}
	$(Source + " div").click(OpenCard);
	ShuffleImages();
});

// get random number for Shuffleimages() function
function RandomFunction(MaxValue, MinValue) {
	return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
}
	
function ShuffleImages() {
	var ImgAll = $(Source).children();
	var ImgThis = $(Source + " div:first-child");
	var ImgArr = new Array();

	for (var i = 0; i < ImgAll.length; i++) {
		ImgArr[i] = $("#" + ImgThis.attr("id") + " img").attr("src");
		ImgThis = ImgThis.next();
	}
		ImgThis = $(Source + " div:first-child");
	for (var z = 0; z < ImgAll.length; z++) {
		var RandomNumber = RandomFunction(0, ImgArr.length - 1);
		$("#" + ImgThis.attr("id") + " img").attr("src", ImgArr[RandomNumber]);
		ImgArr.splice(RandomNumber, 1);
		ImgThis = ImgThis.next();
	}
}

//set Timer
var timerOn = true;
$("#picbox").one("click", function(e){
	var sec = 0;
	var min = 0;
	var timer = setInterval(function(){
		sec ++;
		if(sec > 60){
			$(".timer span").text(parseInt(sec/60) + " min " + sec % 60 + " sec");
		} else {
			$(".timer span").text(sec + " sec");
		}
		if(timerOn === false){
		clearInterval(timer);
		}
	}, 1000);
})

// open card on click
function OpenCard() {
	var id = $(this).attr("id");
	if ($("#" + id + " img").is(":hidden")) {
		$(Source + " div").unbind("click", OpenCard);
		$("#" + id + " img").fadeIn('slow');
		if (ImgOpened == "") {
			$("#" + id + " img").css("box-shadow", "").css("transition", "");
			BoxOpened = id;
			ImgOpened = $("#" + id + " img").attr("src");
			setTimeout(function() {
				$(Source + " div").bind("click", OpenCard);
			}, 300);
		} else {
			CurrentOpened = $("#" + id + " img").attr("src");
			$("#" + id + " img").css("box-shadow", "").css("transition", "");
			$("#" + BoxOpened + " img").css("box-shadow", "").css("transition", "");
			if (ImgOpened != CurrentOpened) {
				setTimeout(function() {
					$("#" + id + " img").css("box-shadow", "0 0 1em 0.5em maroon").css("transition", "outline 0.6s linear");
					$("#" + BoxOpened + " img").css("box-shadow", "0 0 1em 0.5em maroon").css("transition", "outline 0.6s linear");
					setTimeout(function() {		
						$("#" + id + " img").fadeOut(500);
						$("#" + BoxOpened + " img").fadeOut(500);
						BoxOpened = "";
						ImgOpened = "";		
					}, 500);	
				}, 1000);
			} else {
				$("#" + id + " img").css("box-shadow", "0 0 1em 0.5em green").css("transition", "outline 0.6s linear");
				$("#" + BoxOpened + " img").css("box-shadow", "0 0 1em 0.5em green").css("transition", "outline 0.6s linear");
				setTimeout(function() {
					$("#" + id + " img").parent().css("visibility", "hidden");
					$("#" + BoxOpened + " img").parent().css("visibility", "hidden");
				BoxOpened = "";
				ImgOpened = "";
				}, 1000);
				ImgFound++;
			}
			setTimeout(function() {
				$(Source + " div").bind("click", OpenCard)
			}, 1501);	
		}
		Counter++;
		$("#counter").html("" + Counter);
		if (ImgFound == ImgSource.length) {
			$("#counter").prepend('<span id="success">You Found All Pictues With </span>');
			timerOn = false;
			setTimeout(function() {
				callDialog();
			}, 1500);
		}
	}
}

// game over dialog
function callDialog(){
	$('#dialog-confirm')
  // Dialog will slide down from top of document
    .on('dialogopen', function () {
    var widget = $(this).dialog('widget'),
        offset = widget.offset();
    widget
      .css('top', -widget.outerWidth() + 'px')
      .animate({ top: offset.top }, { duration: 1000 });
  })
    .dialog({
    resizable: false,
    draggable: false,
    height: 325,
    width: 550,
    modal: true
  });

$('#tabs').tabs({
  hide: {
    effect: 'slide',
    duration: 500
  }
});
}