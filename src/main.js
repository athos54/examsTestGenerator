"use strict";
var questions = require('./questionsTema1.js');
var Test = require ('./Test.js');
var QuestionFile = require ('./QuestionsFile.js');


var file = new QuestionFile();
var isBrowserSupported = file.isSupported();

if(isBrowserSupported == true){
  file.generateFileForm();
}

// var test = new Test(questions);
// test.generateAllQuestions(questions);
