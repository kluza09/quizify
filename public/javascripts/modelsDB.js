var mongoose = require('mongoose');

var QuizQestionModel = mongoose.model('quest',{
  category:String,
  questionContent:String,
  answer:[{id:String,answerContent:String}],
  correctID:String
},"quiz")

var UserModel = mongoose.model('user',{
  name:String,
  email:String,
  password:String,
  active:String
},"users")


module.exports = {
  QuizQestionModel: QuizQestionModel,
  UserModel: UserModel
};
