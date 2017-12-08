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
    label.innerHTML = 'Select question csv file: ';
    appendToBody(label);
  }

  function generateFileFormButton (){
    let button = document.createElement('button');
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
        let lineArray = convertStringCsvOnArray(line);
        checkLineType(lineArray);
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
    return textResultArray;
  }

  function checkLineType (lineArray){
    if(thisLineIsQuery(lineArray)){
      addNewQuestionToQuestionsObject(lineArray);
    }else if(thisLineIsAnswer(lineArray)){
      addNewAnswerToQuestion(lineArray);
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
    if (line[0]=='query'){
      return true;
    }else{
      return false;
    }
  }

  function thisLineIsAnswer (line){
    if(line[0]=='answer'){
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
