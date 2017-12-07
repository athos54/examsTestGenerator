"use strict";
var questions = require('./questionsTema1.js');
var Test = require ('./Test.js');


console.log(questions);
var test = new Test(questions);
test.generateAllQuestions(questions);
