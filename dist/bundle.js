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

  QuestionsFile.prototype.deleteFileForm = function (){
    body = document.body
    label = document.querySelector('#filelabel');
    input = document.querySelector('#fileinput');
    button = document.querySelector('#filebutton');
    body.removeChild(label);
    body.removeChild(input);
    body.removeChild(button);
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
    label.setAttribute('id','filelabel');
    label.innerHTML = 'Select question csv file: ';
    appendToBody(label);
  }

  function generateFileFormButton (){
    let button = document.createElement('button');
    button.setAttribute('id','filebutton');
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
        let lineObject = convertStringCsvOnArray(line);
        checkLineType(lineObject);
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
    let textResultObject = {
      type: textResultArray[0],
      number: textResultArray[1],
      text: textResultArray[2],
      isCorrect: textResultArray[3]
    };

    return textResultObject;
  }

  function checkLineType (lineObject){
    if(thisLineIsQuery(lineObject)){
      addNewQuestionToQuestionsObject(lineObject);
    }else if(thisLineIsAnswer(lineObject)){
      addNewAnswerToQuestion(lineObject);
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
    if (line.type=='query'){
      return true;
    }else{
      return false;
    }
  }

  function thisLineIsAnswer (line){
    if(line.type=='answer'){
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
  this.questions.forEach(element=>{
    buildQuestion(element);
    console.log('buclebuildquiestion')
  })
}

function buildQuestion(element){
  let hasQuestionMoreThanOneCorrectAnswer = checkIfQuestionHasMoreThanOneCorrectAnswer(element);

  let questionContainerHtml = generateQuestionContainerHtml(element.question.number);
  let questionHtml = generateQuestionHtml(element.question);

  questionContainerHtml.appendChild(questionHtml);


  if(hasQuestionMoreThanOneCorrectAnswer==true){
    console.log('mas de una correcta')
    var answers = generateCheckboxAnswer(element.answers,element.question.number);
  }else{
    console.log('solo una correcta')
    var answers = generateRadioAnswer(element.answers,element.question.number);
  }
  questionContainerHtml.appendChild(answers);
  appendToBody(questionContainerHtml);

}

function generateRadioAnswer(answers,questionNumber){
  var answersContainer = document.createElement('div');
  answersContainer.setAttribute('class','answersContainer');

  answers.forEach(answer=>{
    var answerContainer = document.createElement('div');
    answerContainer.setAttribute('class','answerContainer');

    let radio = document.createElement('input');
    radio.setAttribute('type','radio');
    radio.setAttribute('name','question_'+questionNumber);
    radio.setAttribute('id','question_'+questionNumber+'_answer_'+answer.number);

    let label = document.createElement('label');
    label.setAttribute('class','answer');
    label.setAttribute('for','question_'+questionNumber+'_answer_'+answer.number);
    label.innerHTML = answer.text;

    answerContainer.appendChild(radio);
    answerContainer.appendChild(label);
    answersContainer.appendChild(answerContainer);
  })

  return answersContainer;
}

function generateCheckboxAnswer(answers,questionNumber){
  var answersContainer = document.createElement('div');
  answersContainer.setAttribute('class','answersContainer');

  answers.forEach(answer=>{
    var answerContainer = document.createElement('div');
    answerContainer.setAttribute('class','answerContainer');

    let checkbox = document.createElement('input');
    checkbox.setAttribute('type','checkbox');
    checkbox.setAttribute('id','question_'+questionNumber+'_answer_'+answer.number);


    let label = document.createElement('label');
    label.setAttribute('class','answer');
    label.setAttribute('for','question_'+questionNumber+'_answer_'+answer.number);
    label.innerHTML = answer.text;

    answerContainer.appendChild(checkbox);
    answerContainer.appendChild(label);
    answersContainer.appendChild(answerContainer);
  })
  return answersContainer;
}

function generateQuestionHtml(question){
  let questionHtml = document.createElement('p');
  questionHtml.setAttribute('class','question');
  questionHtml.innerHTML = question.text;
  return questionHtml;
}

function generateQuestionContainerHtml(numberOfQuestion){
  let questionContainer = document.createElement('div');
  questionContainer.setAttribute('class','questionContainer');
  questionContainer.setAttribute('id','question_'+numberOfQuestion);
  return questionContainer;
}

function checkIfQuestionHasMoreThanOneCorrectAnswer(question){
  let onlyOneCorrectAnswer = 1;
  let correctAnswers = numberOfTrueAnswers(question);

  if (correctAnswers > onlyOneCorrectAnswer){
    return true;
  }else{
    return false;
  }
}

function numberOfTrueAnswers(question){
  var countOfTrueAnswers = 0;
  question.answers.forEach(answer=>{
    if(answer.isCorrect.toLowerCase()=='true'){
      countOfTrueAnswers++;
    }
  })
  console.log('countOfTrueAnswers',countOfTrueAnswers);
  return countOfTrueAnswers;
}

function appendToBody(element){
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
    var test = new Test(questions);
    test.generateAllQuestions(questions);
    file.deleteFileForm();

    clearInterval(waitingForFinish);
  }
},100);

},{"./QuestionsFile.js":1,"./Test.js":2}]},{},[3]);
