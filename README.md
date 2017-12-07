# examTestGenerator

The object of this small program is generate a text exam in real-time getting questions and answer from a file with this structure

> What is your favorite color?

> Red

> Blue

> Green

> (empty-line)

> Second question

> Answer 1

> Answer 2

> Answer 3

> ...

## For dev

### Install dev tools:
npm install --global browserify
npm install --global watchify

### Generate bundle.js
browserify main.js -o bundle.js

### watch for changes
watchify main.js -o bundle.js -v
