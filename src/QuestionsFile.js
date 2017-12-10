function QuestionsFile() {
  var questionObject = [];
  let done = false;

  QuestionsFile.prototype.isSupported = function () {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      return true;
    }
    return false;
  };

  QuestionsFile.prototype.generateFileForm = function () {
    generateFileFormLabel();
    generateFileFormInput();
    generateFileFormButton();
  };

  QuestionsFile.prototype.deleteFileForm = function () {
    var body = document.body;
    var label = document.querySelector('#filelabel');
    var input = document.querySelector('#fileinput');
    var button = document.querySelector('#filebutton');
    body.removeChild(label);
    body.removeChild(input);
    body.removeChild(button);
  };

  QuestionsFile.prototype.getQuestions = function () {
    return questionObject;
  };

  QuestionsFile.prototype.isProcessFinished = function () {
    return done;
  };

  function generateFileFormInput() {
    var input = document.createElement('input');
    input.setAttribute('name', 'fileinput');
    input.setAttribute('id', 'fileinput');
    input.setAttribute('type', 'file');
    appendToBody(input);
  }

  function generateFileFormLabel() {
    var label = document.createElement('label');
    label.setAttribute('id', 'filelabel');
    label.innerHTML = 'Select question csv file: ';
    appendToBody(label);
  }

  function generateFileFormButton() {
    var button = document.createElement('button');
    button.setAttribute('id', 'filebutton');
    button.innerHTML = 'Generate Test';
    button.addEventListener('click', loadFile.bind(this), false);
    appendToBody(button);
  }

  function loadFile(){
      let selectedFile = document.querySelector('#fileinput').files[0];
      if (!selectedFile) {
        var testContent = require('./testCsvFile.js').a;
        selectedFile = new File ([testContent],'testCsvFile.csv',{type:"text/csv"})
      }
      var reader = new FileReader();
      reader.readAsText(selectedFile, "UTF-8");
      reader.onload = (content) => {
        parseFileFromContent(content);
      }
      reader.onerror = function (evt) {
        alert ('Error reading file');
      }
    }

  function parseFileFromContent(content) {
    var textResultArray = convertStringMultilineOnArray(content.target.result);
    textResultArray.forEach((line, index) => {
      var firstLine = 0;
      if (index != firstLine) {
        var lineObject = convertStringCsvOnArray(line);
        checkLineType(lineObject);
      }
      markProcessAsFinished(textResultArray.length, index);
    });
  }

  function markProcessAsFinished(arrayLength, index) {
    if (arrayLength - 1 == index) {
      done = true;
    }
  }

  function convertStringMultilineOnArray(string) {
    var textResultArray = string.split('\n');
    return textResultArray;
  }

  function convertStringCsvOnArray(string) {
    var textResultArray = string.split(',');
    var textResultObject = {
      type: textResultArray[0],
      number: textResultArray[1],
      text: textResultArray[2],
      isCorrect: textResultArray[3],
    };

    return textResultObject;
  }

  function checkLineType(lineObject) {
    if (thisLineIsQuery(lineObject)) {
      addNewQuestionToQuestionsObject(lineObject);
    } else if (thisLineIsAnswer(lineObject)) {
      addNewAnswerToQuestion(lineObject);
    }
  }

  function addNewAnswerToQuestion(lineArray) {
    questionObject[getLastItemOfArray()].answers.push(lineArray);
  }

  function addNewQuestionToQuestionsObject(line) {
    var newQuestion = {
      question: line,
      answers: [],
    };
    questionObject.push(newQuestion);
  }

  function getLastItemOfArray() {
    return questionObject.length - 1;
  }

  function thisLineIsQuery(line) {
    if (line.type.trim() == 'query') {
      return true;
    }
    return false;
  }

  function thisLineIsAnswer(line) {
    if (line.type.trim() == 'answer') {
      return true;
    }
    return false;
  }

  function appendToBody(element) {
    var label = document.body.appendChild(element);
  }
}

module.exports = QuestionsFile;
