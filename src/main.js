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
    console.log('Here you are the questions object');
    console.log(questions);
    clearInterval(waitingForFinish);
  }
},100);

// var test = new Test(questions);
// test.generateAllQuestions(questions);
