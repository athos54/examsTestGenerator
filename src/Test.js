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
