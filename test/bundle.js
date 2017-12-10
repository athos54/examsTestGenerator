"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);throw new Error("Cannot find module '" + o + "'");
      }var f = n[o] = { exports: {} };t[o][0].call(f.exports, function (e) {
        var n = t[o][1][e];return s(n ? n : e);
      }, f, f.exports, e, t, n, r);
    }return n[o].exports;
  }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }return s;
})({ 1: [function (require, module, exports) {
    function QuestionsFile() {
      var questionObject = [];
      var done = false;

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

      function loadFile() {
        var selectedFile = document.querySelector('#fileinput').files[0];
        if (!selectedFile) {
          var testContent = require('./testCsvFile.js').a;
          selectedFile = new File([testContent], 'testCsvFile.csv', { type: "text/csv" });
        }
        var reader = new FileReader();
        reader.readAsText(selectedFile, "UTF-8");
        reader.onload = function (content) {
          parseFileFromContent(content);
        };
        reader.onerror = function (evt) {
          alert('Error reading file');
        };
      }

      function parseFileFromContent(content) {
        var textResultArray = convertStringMultilineOnArray(content.target.result);
        textResultArray.forEach(function (line, index) {
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
          isCorrect: textResultArray[3]
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
          answers: []
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
  }, { "./testCsvFile.js": 2 }], 2: [function (require, module, exports) {
    exports.a = "type,number,text,correct answer\n  query,1,La primera caracteristica a analizar en un sistema seguro es:,FALSE\n  answer,1,Confidencialidad,FALSE\n  answer,2,Integridad,TRUE\n  answer,3,Disponibilidad,FALSE\n  answer,4,No repudio,FALSE\n  query,2,Indica qu\xE9 sentencia es falsa:,FALSE\n  answer,1,La integridad permite asegurar que los datos no se han falseado,FALSE\n  answer,2,Confidencialidad es desvelar datos a usuarios no autorizados; que comprende tambi\xE9n la privacidad (la protecci\xF3n de datos personales).,FALSE\n  answer,3,Disponibilidad es que la informacion se encuentre accesible en todo momento a los distintos usuarios autorizados,TRUE\n  query,3,Una de las siguientes medidas no pertenece a la seguridad logica,FALSE\n  answer,1,Contrase\xF1as,TRUE\n  answer,2,SAI,FALSE\n  answer,3,Copia de seguridad,FALSE\n  answer,4,SW antimalware,FALSE\n  query,4,\xBFQue elemento de un sistema informatico se considera mas critico a la hora de protegerlo,FALSE\n  answer,1,Comunicaciones,TRUE\n  answer,2,Software,TRUE\n  answer,3,Hardware,FALSE\n  answer,4,Datos,FALSE\n  query,5,Un hacker:,FALSE\n  answer,1,Siempre tiene una finalidad maliciosa,TRUE\n  answer,2,La mayoria de las veces tiene una finalidad maliciosa,TRUE\n  answer,3,\"A veces posee una finalidad maliciosa, entonces se denomina cracker\",FALSE\n  answer,4,Es un curioso con una finalidad conocida,FALSE\n  query,6,El phishing,FALSE\n  answer,1,es un tipo de fraude bancario,TRUE\n  answer,2,Es un tipo de malware o virus,FALSE\n  answer,3,se contrarresta con un spyware,FALSE\n  answer,4,se propaga mediante correo electronico siempre,FALSE\n  query,7,Cual es el estandar iso en materia de auditoria de sistemas de informacion,FALSE\n  answer,1,ISO 9001,TRUE\n  answer,2,ISO 27000,FALSE\n  answer,3,ISO 27002,FALSE\n  answer,4,ISO 27001,FALSE\n  answer,5,COBIT,FALSE\n  query,8,y el estandar de buenas practicas en materia de seguridad informatica,FALSE\n  answer,1,ISO 9001,TRUE\n  answer,2,ISO 27000,FALSE\n  answer,3,ISO 27002,FALSE\n  answer,4,ISO 27001,FALSE\n  answer,5,COBIT,FALSE\n  query,9,con respecto a un analisis forense,FALSE\n  answer,1,se realiza siempre a posteriori de detectar vulnerabilidades,TRUE\n  answer,2,se debe realizar semanalmente,TRUE\n  answer,3,se realiza tan solo cuando el sistema de informacion \u201Cha muerto\u201D,FALSE\n  answer,4,Se realiza siempre a priori de detectar vulnerabilidades,FALSE\n  query,10,una vez se realiza una auditoria,FALSE\n  answer,1,si todo se encuentra correcto no es necesario volver a realizar auditorias,TRUE\n  answer,2,es recomendable volver a realizarlas periodicamente,FALSE\n  answer,3,es poco probable que todo este perfecto,FALSE\n  answer,4,\"es recomendable volver a realizarlas periodicamente, pero ya no tan exhaustivas\",TRUE\n  ";

    // module.exports = testFileContent;
  }, {}], 3: [function (require, module, exports) {
    var assert = chai.assert;

    var QuestionFile = require('../src/QuestionsFile.js');

    var file = new QuestionFile();
    file.generateFileForm();

    var label = document.querySelector('#filelabel');
    var input = document.querySelector('#fileinput');
    var button = document.querySelector('#filebutton');

    // document.body.removeChild(label);
    // document.body.removeChild(input);
    // document.body.removeChild(button);

    describe('File form:', function () {
      it('Label is an object', function () {
        assert.equal(typeof label === "undefined" ? "undefined" : _typeof(label), 'object');
      });

      it('Input is an object', function () {
        assert.equal(typeof input === "undefined" ? "undefined" : _typeof(input), 'object');
      });

      it('Button is an object', function () {
        assert.equal(typeof button === "undefined" ? "undefined" : _typeof(button), 'object');
      });

      it('On click generate test I get an object', function () {
        button.click();
        // this.questionObject = questionObject;
        var questionObject = file.getQuestions();

        assert.equal(typeof questionObject === "undefined" ? "undefined" : _typeof(questionObject), 'object');
      });
    });

    describe('questionObject', function () {
      var _loop = function _loop(i) {
        it("item " + i + " must have question property", function (done) {
          var questionObject = file.getQuestions();
          setTimeout(function () {
            // console.log(questionObject)
            assert.property(questionObject[i], 'question');
            done();
          }, 50);
        }, 1500);

        it("item " + i + " must have answers property", function (done) {
          var questionObject = file.getQuestions();
          setTimeout(function () {
            assert.property(questionObject[i], 'answers');
            done();
          }, 50);
        }, 1500);
      };

      for (var i = 0; i < 10; i++) {
        _loop(i);
      }
    });
  }, { "../src/QuestionsFile.js": 1 }] }, {}, [3]);