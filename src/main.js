

const Test = require('./Test.js');
const QuestionFile = require('./QuestionsFile.js');

const file = new QuestionFile();

const isBrowserSupported = file.isSupported();
if (isBrowserSupported == true) {
  file.generateFileForm();
}

const waitingForFinish = setInterval(() => {
  if (file.isProcessFinished() == true) {
    const questions = file.getQuestions();

    const test = new Test(questions);
    test.generateAllQuestions(questions);
    file.deleteFileForm();

    clearInterval(waitingForFinish);
  }
}, 100);
