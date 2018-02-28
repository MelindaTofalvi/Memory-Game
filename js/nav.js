//call animation whne page loaded
$(document).ready(function(){
  setTimeout(function(){
    myMove();
  }, 1000); // delay animation by 1 sec
  
});

// move Harry 
function myMove() {
  var elem = document.getElementById("harry");   
  var pos = 0;
  var id = setInterval(frame, 30);
  function frame() {
    if (pos == 70) {
      clearInterval(id);
        callDialog();
    } else {
      pos++; 
      elem.style.right = pos + '%'; 
    }
  }
}

//dialog box when animation finished
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


// click on buttons on nav3.html
$("#close").click(function(){
  window.close();
})