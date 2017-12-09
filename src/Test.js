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
