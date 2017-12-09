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
