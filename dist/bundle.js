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
  })
}

function buildQuestion(element){
  let questionContainerHtml = generateQuestionContainerHtml(element.question.number);

  let questionHtml = generateQuestionHtml(element.question);
  questionContainerHtml.appendChild(questionHtml);

  let answers = generateAnswersHtml(element);
  questionContainerHtml.appendChild(answers);

  appendToBody(questionContainerHtml);
}

function generateAnswersHtml(element){
  let hasQuestionMoreThanOneCorrectAnswer = checkIfQuestionHasMoreThanOneCorrectAnswer(element);
  if(hasQuestionMoreThanOneCorrectAnswer==true){
    var answers = generateAnswerPackage(element.answers,element.question.number,'checkbox');
  }else{
    var answers = generateAnswerPackage(element.answers,element.question.number,'radio');
  }
  return answers;
}

function generateAnswerPackage(answers,questionNumber,type){
  var answersContainer = document.createElement('div');
  answersContainer.setAttribute('class','answersContainer');

  answers.forEach(answer=>{
    let oneAnswerContainer = createOneAnswerContainer();
    let input = createOneAnswerInput(type,questionNumber,answer.number);
    let label = createOneLabelForInput(questionNumber,answer.number,answer.text);
    answersContainer = packageAnswer(answersContainer,oneAnswerContainer,input,label);
  })

  return answersContainer;
}

function packageAnswer(answersContainer,oneAnswerContainer,input,label){
  oneAnswerContainer.appendChild(input);
  oneAnswerContainer.appendChild(label);
  answersContainer.appendChild(oneAnswerContainer);
  return answersContainer;
}

function createOneLabelForInput(questionNumber,answerNumber,answerText){
  let label = document.createElement('label');
  label.setAttribute('class','answer');
  label.setAttribute('for','question_'+questionNumber+'_answer_'+answerNumber);
  label.innerHTML = answerText;
  return label;
}

function createOneAnswerInput(type,questionNumber,answerNumber){
  let input = document.createElement('input');
  input.setAttribute('type',type);
  input.setAttribute('name','question_'+questionNumber);
  input.setAttribute('id','question_'+questionNumber+'_answer_'+answerNumber);
  return input;
}

function createOneAnswerContainer(){
  var answerContainer = document.createElement('div');
  answerContainer.setAttribute('class','answerContainer');
  return answerContainer;
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

    var test = new Test(questions);
    test.generateAllQuestions(questions);
    file.deleteFileForm();

    clearInterval(waitingForFinish);
  }
},100);

},{"./QuestionsFile.js":1,"./Test.js":2}]},{},[3]);
