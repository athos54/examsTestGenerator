(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function QuestionsFile(){
  var questionObject = [];
  var done = false;

  QuestionsFile.prototype.isSupported = function (){
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      return true;
    } else {
      return false;
    }
  }

  QuestionsFile.prototype.generateFileForm = function (){
    generateFileFormLabel();
    generateFileFormInput();
    generateFileFormButton();
  }

  QuestionsFile.prototype.getQuestions = function (){
    return questionObject;
  }

  QuestionsFile.prototype.isProcessFinished = function (){
    return done;
  }

  function generateFileFormInput (){
    let input = document.createElement ('input');
    input.setAttribute('name','fileinput');
    input.setAttribute('id','fileinput');
    input.setAttribute('type','file');
    appendToBody(input);
  }

  function generateFileFormLabel (){
    let label = document.createElement('label');
    label.innerHTML = 'Select question csv file: ';
    appendToBody(label);
  }

  function generateFileFormButton (){
    let button = document.createElement('button');
    button.innerHTML = 'Generate Test';
    button.addEventListener('click', loadFile.bind(this), false);
    appendToBody(button);
  }

  function loadFile(){
    let selectedFile = document.querySelector('#fileinput').files[0];
    if (selectedFile) {
      var reader = new FileReader();
      reader.readAsText(selectedFile, "UTF-8");
      reader.onload = (content) => {
        parseFileFromContent(content);
      }
      reader.onerror = function (evt) {
        alert ('Error reading file');
      }
    }
  }

  function parseFileFromContent (content){
    let textResultArray = convertStringMultilineOnArray(content.target.result);
    textResultArray.forEach((line,index)=>{
      let firstLine = 0;
      if(index != firstLine){
        let lineArray = convertStringCsvOnArray(line);
        checkLineType(lineArray);
      }
      markProcessAsFinished(textResultArray.length,index);
    })
  }

  function markProcessAsFinished(arrayLength,index){
    if(arrayLength-1==index){
      done = true;
    }
  }

  function convertStringMultilineOnArray (string){
    let textResultArray = string.split("\n");
    return textResultArray;
  }

  function convertStringCsvOnArray (string){
    let textResultArray = string.split(",");
    return textResultArray;
  }

  function checkLineType (lineArray){
    if(thisLineIsQuery(lineArray)){
      addNewQuestionToQuestionsObject(lineArray);
    }else if(thisLineIsAnswer(lineArray)){
      addNewAnswerToQuestion(lineArray);
    }
  }

  function addNewAnswerToQuestion (lineArray){
    questionObject[getLastItemOfArray()].answers.push(lineArray);
  }

  function addNewQuestionToQuestionsObject (line){
    let newQuestion = {
      question: line,
      answers: []
    };
    questionObject.push(newQuestion);
  }

  function getLastItemOfArray (){
    return questionObject.length - 1;
  }

  function thisLineIsQuery (line){
    if (line[0]=='query'){
      return true;
    }else{
      return false;
    }
  }

  function thisLineIsAnswer (line){
    if(line[0]=='answer'){
      return true;
    }else{
      return false;
    }
  }

  function appendToBody (element){
    let label = document.body.appendChild(element);
  }

}

module.exports = QuestionsFile;

},{}],2:[function(require,module,exports){
function Test(questions){
  this.questions = questions;
}

Test.prototype.generateAllQuestions = function (){
  for (var question in this.questions) {
    var oneOfTheQuestions = this.questions[question];
    if (!this.questions.hasOwnProperty(question)) continue;
    this.wrapQuestion (oneOfTheQuestions);
    this.generateBr();
  }
}

Test.prototype.wrapQuestion = function ( question ){
  this.generateQuestion(question);
  this.generateAnswers(question.number,question.answers);
}

Test.prototype.generateQuestion = function(question){
  let questionDiv = document.createElement('div');
  let questionSpan = document.createElement('span');

  questionSpan.innerHTML = question.question;
  questionDiv.appendChild(questionSpan);
  this.appendToBody(questionDiv);
}

Test.prototype.generateAnswers = function (questionNumber,answers){
  for (var answer in answers) {
    var answerName = answer;
    var oneOfTheAnswers = answers[answer];

    if (!answers.hasOwnProperty(answer)) continue;

    this.generateAnswerInput(questionNumber,oneOfTheAnswers.text,answerName);
    this.generateAnswerLabel(questionNumber,oneOfTheAnswers.text,answerName);
    this.generateBr();
  }
}

Test.prototype.generateBr = function (){
  let br = document.createElement('br');
  this.appendToBody(br);
}

Test.prototype.generateAnswerLabel = function (questionNumber,answerText,answerName){
  let questionLabel = document.createElement('label');
  questionLabel.setAttribute('for','question_' + questionNumber + '_' + answerName);
  questionLabel.innerHTML = answerText;
  this.appendToBody(questionLabel);
}

Test.prototype.generateAnswerInput = function (questionNumber,answerValue,answerName){
  let answerDiv = document.createElement('div');
  let questionRadio = document.createElement('input');

  questionRadio.setAttribute('type', 'radio');
  questionRadio.setAttribute('name', 'question_' + questionNumber + '_' + answerName);
  questionRadio.setAttribute('id', 'question_' + questionNumber + '_' + answerName);

  questionRadio.value = answerValue;
  answerDiv.appendChild(questionRadio);
  this.appendToBody(questionRadio);
}

Test.prototype.appendToBody = function (element){
  document.body.appendChild(element);
}

module.exports = Test;

},{}],3:[function(require,module,exports){
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

},{"./QuestionsFile.js":1,"./Test.js":2}]},{},[3]);
