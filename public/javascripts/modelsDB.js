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
  desc:String,
  active:String
},"users")

var ArchModel = mongoose.model('archivum',{
  player: String,
  questions:[{questionNumber:Number,clikedID:Number}],
  score: Number,
  date: String
},"archivs")


module.exports = {
  QuizQestionModel: QuizQestionModel,
  UserModel: UserModel,
  ArchModel: ArchModel
};
