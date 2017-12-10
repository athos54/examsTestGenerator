function Test(questions) {
  this.questions = questions;
}

Test.prototype.generateAllQuestions = function () {
  this.questions.forEach((element) => {
    buildQuestion(element);
  });
};

function buildQuestion(element) {
  const questionContainerHtml = generateQuestionContainerHtml(element.question.number);

  const questionHtml = generateQuestionHtml(element.question);
  questionContainerHtml.appendChild(questionHtml);

  const answers = generateAnswersHtml(element);
  questionContainerHtml.appendChild(answers);

  appendToBody(questionContainerHtml);
}

function generateAnswersHtml(element) {
  const hasQuestionMoreThanOneCorrectAnswer = checkIfQuestionHasMoreThanOneCorrectAnswer(element);
  let answers;
  if (hasQuestionMoreThanOneCorrectAnswer == true) {
    answers = generateAnswerPackage(element.answers, element.question.number, 'checkbox');
  } else {
    answers = generateAnswerPackage(element.answers, element.question.number, 'radio');
  }
  return answers;
}

function generateAnswerPackage(answers, questionNumber, type) {
  let answersContainer = document.createElement('div');
  answersContainer.setAttribute('class', 'answersContainer');

  answers.forEach((answer) => {
    const oneAnswerContainer = createOneAnswerContainer();
    const input = createOneAnswerInput(type, questionNumber, answer.number);
    const label = createOneLabelForInput(questionNumber, answer.number, answer.text);
    answersContainer = packageAnswer(answersContainer, oneAnswerContainer, input, label);
  });

  return answersContainer;
}

function packageAnswer(answersContainer, oneAnswerContainer, input, label) {
  oneAnswerContainer.appendChild(input);
  oneAnswerContainer.appendChild(label);
  answersContainer.appendChild(oneAnswerContainer);
  return answersContainer;
}

function createOneLabelForInput(questionNumber, answerNumber, answerText) {
  const label = document.createElement('label');
  label.setAttribute('class', 'answer');
  label.setAttribute('for', `question_${questionNumber}_answer_${answerNumber}`);
  label.innerHTML = answerText;
  return label;
}

function createOneAnswerInput(type, questionNumber, answerNumber) {
  const input = document.createElement('input');
  input.setAttribute('type', type);
  input.setAttribute('name', `question_${questionNumber}`);
  input.setAttribute('id', `question_${questionNumber}_answer_${answerNumber}`);
  return input;
}

function createOneAnswerContainer() {
  const answerContainer = document.createElement('div');
  answerContainer.setAttribute('class', 'answerContainer');
  return answerContainer;
}

function generateQuestionHtml(question) {
  const questionHtml = document.createElement('p');
  questionHtml.setAttribute('class', 'question');
  questionHtml.innerHTML = question.text;
  return questionHtml;
}

function generateQuestionContainerHtml(numberOfQuestion) {
  const questionContainer = document.createElement('div');
  questionContainer.setAttribute('class', 'questionContainer');
  questionContainer.setAttribute('id', `question_${numberOfQuestion}`);
  return questionContainer;
}

function checkIfQuestionHasMoreThanOneCorrectAnswer(question) {
  const onlyOneCorrectAnswer = 1;
  const correctAnswers = numberOfTrueAnswers(question);

  if (correctAnswers > onlyOneCorrectAnswer) {
    return true;
  }
  return false;
}

function numberOfTrueAnswers(question) {
  let countOfTrueAnswers = 0;
  question.answers.forEach((answer) => {
    if (answer.isCorrect.toLowerCase() == 'true') {
      countOfTrueAnswers++;
    }
  });
  return countOfTrueAnswers;
}

function appendToBody(element) {
  document.body.appendChild(element);
}

module.exports = Test;
