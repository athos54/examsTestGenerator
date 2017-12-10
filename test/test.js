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

describe('File form:', () => {
  it('Label is an object', () => {
    assert.equal(typeof (label), 'object');
  });

  it('Input is an object', () => {
    assert.equal(typeof (input), 'object');
  });

  it('Button is an object', () => {
    assert.equal(typeof (button), 'object');
  });

  it('On click generate test I get an object', function () {
    button.click();
    // this.questionObject = questionObject;
    var questionObject = file.getQuestions();

    assert.equal(typeof (questionObject), 'object');
  });
});

describe('questionObject', () => {
  for (let i = 0; i < 10; i++) {
    it(`item ${i} must have question property`, (done) => {
      var questionObject = file.getQuestions();
      setTimeout(() => {
        // console.log(questionObject)
        assert.property(questionObject[i], 'question');
        done();
      }, 50);
    }, 1500);

    it(`item ${i} must have answers property`, (done) => {
      var questionObject = file.getQuestions();
      setTimeout(() => {
        assert.property(questionObject[i], 'answers');
        done();
      }, 50);
    }, 1500);
  }
});
