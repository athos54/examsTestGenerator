"use strict";
var Test = require ('./Test.js');
var QuestionFile = require ('./QuestionsFile.js');

var file = new QuestionFile();

var isBrowserSupported = file.isSupported();
if(isBrowserSupported == true){
  file.generateFileForm();
}

let waitingForFinish = setInterval(()=>{
  if(file.isProcessFinished()==true){
    let questions = file.getQuestions();

    var test = new Test(questions);
    test.generateAllQuestions(questions);
    file.deleteFileForm();

    clearInterval(waitingForFinish);
  }
},100);
