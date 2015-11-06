function isLogged(){
  if(global.CurrentUser !== undefined && global.CurrentUser.active == "1"){
    return true;
  } else {
    return false;
  }
}

function setUserLog(content){
  content.active = "1";
  content.save(function(err){});
  global.CurrentUser = content;
}

function destroySession(){
  delete global.CurrentUser;
}

function isQuestionRepeat(index,array){
  for(var i = 0; i < array.length; i++){
    if(index==array[i]){
      return true;
    }
  }
  return false;
}

module.exports = {
  isLogged: isLogged,
  setUserLog: setUserLog,
  destroySession: destroySession,
  isQuestionRepeat: isQuestionRepeat
}
