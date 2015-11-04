function checkAnswer(ansID,correctID,but){
  $("#quiz p").removeAttr("onclick");
  $(but).removeClass('normal-ans')
  if(ansID==correctID){
    $(but).addClass('correct-ans');
  } else {
    $(but).addClass('wrong-ans');
    setTimeout(function(){
      $("p[value='"+correctID+"']").removeClass('normal-ans').addClass('correct-ans');
    },500)
  }
  $(".next").show();
}

//random shuffle array elements
function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

module.exports = shuffle;
