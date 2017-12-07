# examTestGenerator

## Install dev tools:
npm install --global browserify
npm install --global watchify

## Generate bundle.js
browserify main.js -o bundle.js

## watch for changes
watchify main.js -o bundle.js -v
