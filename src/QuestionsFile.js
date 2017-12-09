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
