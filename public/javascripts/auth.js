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

module.exports = {
  isLogged: isLogged,
  setUserLog: setUserLog,
  destroySession: destroySession
}
