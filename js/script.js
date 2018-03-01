/* 
=======================
INDEX PAGE - BACKGROUND
=======================
*/
var gradient = document.querySelector(".gradient");
document.addEventListener("mousemove", onMouseMove);

function onMouseMove(event) {
  gradient.style.backgroundImage = 'radial-gradient(at ' + event.clientX + 'px ' + event.clientY + 'px, rgba(98, 161, 224,.7) 0, #4D4FA7 70%)';
}


/* 
=======================
INDEX PAGE - audio icon
=======================
*/
$('.speaker').click(function(e) {
	e.preventDefault();
	$(this).toggleClass('mute'); // icon display change when click
	$("#myAudio").prop("muted",!$("#myAudio").prop("muted")); // music on/off on click
});