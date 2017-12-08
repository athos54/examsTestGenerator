function QuestionsFile(){

}

QuestionsFile.prototype.isSupported = function (){
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    return true;
  } else {
    return false;
  }
}

QuestionsFile.prototype.generateFileForm = function (){
  this.generateFileFormLabel();
  this.generateFileFormInput();
  this.generateFileFormButton();
}

QuestionsFile.prototype.generateFileFormInput = function (){
  let input = document.createElement ('input');
  input.setAttribute('name','fileinput');
  input.setAttribute('id','fileinput');
  input.setAttribute('type','file');
  this.appendToBody(input);
}

QuestionsFile.prototype.generateFileFormLabel = function (){
  let label = document.createElement('label');
  label.innerHTML = 'Selecciona el csv de las preguntas: ';
  this.appendToBody(label);
}

QuestionsFile.prototype.generateFileFormButton = function (){
  let button = document.createElement('button');
  button.innerHTML = 'Generar Test';
  button.addEventListener('click', this.loadFile);
  this.appendToBody(button);
}

QuestionsFile.prototype.loadFile = function (){
  let selectedFile = document.querySelector('#fileinput').files[0];
  if (selectedFile) {
    var reader = new FileReader();
    reader.readAsText(selectedFile, "UTF-8");
    reader.onload = function (content) {
      let questionObject = [];

      let textResult = content.target.result;
      let textResultArray = textResult.split("\n");
      textResultArray.forEach((line,index)=>{
        if(index!=0){
          let lineArray = line.split(',');
          if (lineArray[0]=='query'){
            let newQuestion = {
              question: lineArray,
              answers: []
            };
            questionObject.push(newQuestion);
          }else if(lineArray[0]=='answer'){
            let lastQuestionObjectItem = questionObject.length - 1;
            questionObject[lastQuestionObjectItem].answers.push(lineArray);
          }
        }
      })
      console.log(questionObject);
    }
    reader.onerror = function (evt) {
      alert ('Error al leer el archivo');
    }
  }
}


QuestionsFile.prototype.appendToBody = function (element){
  let label = document.body.appendChild(element);
}



module.exports = QuestionsFile;
