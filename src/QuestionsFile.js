function QuestionsFile() {
  const questionObject = [];
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
    const body = document.body;
    const label = document.querySelector('#filelabel');
    const input = document.querySelector('#fileinput');
    const button = document.querySelector('#filebutton');
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
    const input = document.createElement('input');
    input.setAttribute('name', 'fileinput');
    input.setAttribute('id', 'fileinput');
    input.setAttribute('type', 'file');
    appendToBody(input);
  }

  function generateFileFormLabel() {
    const label = document.createElement('label');
    label.setAttribute('id', 'filelabel');
    label.innerHTML = 'Select question csv file: ';
    appendToBody(label);
  }

  function generateFileFormButton() {
    const button = document.createElement('button');
    button.setAttribute('id', 'filebutton');
    button.innerHTML = 'Generate Test';
    button.addEventListener('click', loadFile.bind(this), false);
    appendToBody(button);
  }

  function loadFile() {
    const selectedFile = document.querySelector('#fileinput').files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsText(selectedFile, 'UTF-8');
      reader.onload = (content) => {
        parseFileFromContent(content);
      };
      reader.onerror = function (evt) {
        alert('Error reading file');
      };
    }
  }

  function parseFileFromContent(content) {
    const textResultArray = convertStringMultilineOnArray(content.target.result);
    textResultArray.forEach((line, index) => {
      const firstLine = 0;
      if (index != firstLine) {
        const lineObject = convertStringCsvOnArray(line);
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
    const textResultArray = string.split('\n');
    return textResultArray;
  }

  function convertStringCsvOnArray(string) {
    const textResultArray = string.split(',');
    const textResultObject = {
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
    const newQuestion = {
      question: line,
      answers: [],
    };
    questionObject.push(newQuestion);
  }

  function getLastItemOfArray() {
    return questionObject.length - 1;
  }

  function thisLineIsQuery(line) {
    if (line.type == 'query') {
      return true;
    }
    return false;
  }

  function thisLineIsAnswer(line) {
    if (line.type == 'answer') {
      return true;
    }
    return false;
  }

  function appendToBody(element) {
    const label = document.body.appendChild(element);
  }
}

module.exports = QuestionsFile;
