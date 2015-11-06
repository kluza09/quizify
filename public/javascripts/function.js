//checking answer
function checkAnswer(ansID,correctID,but){
  var isCorrectAns;

  $("#quiz p").removeAttr("onclick");
  $(but).removeClass('normal-ans')

  if(ansID==correctID){
    isCorrectAns = "true";
    $(but).addClass('correct-ans');
  } else {
    isCorrectAns = "false";
    $(but).addClass('wrong-ans');
    setTimeout(function(){
      $("p[value='"+correctID+"']").removeClass('normal-ans').addClass('correct-ans');
    },500)
  }
  $(".next").show();

  $.post('quizpage', { correct : isCorrectAns});
}



//random shuffle array elements
function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

module.exports = shuffle;
