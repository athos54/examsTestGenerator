# examTestGenerator

This small project is for learn solid programing thins. All comments will be welcome. Pull requests too.

The object of this small program is generate a text exam in real-time getting questions and answer from a csv file with this structure.

Note: First line will be removed.

> type,number,text,true/false
>
> query,1,La primera caracteristica a analizar en un sistema seguro es,FALSE
>
> answer,1,Confidencialidad,TRUE
>
> answer,2,Integridad,FALSE
>
> answer,3,Disponibilidad,FALSE
>
> answer,4,No repudio,FALSE
>
> query,1,Esta es la segunda pregunta,TRUE
>
> answer,1,primera respuesta,FALSE
>
> answer,2,segunda respuesta,TRUE
>
> answer,3,tercera respuesta,FALSE
>
> answer,4,cuarta respueta,FALSE

## How to use

* Download dist folder, generate your own file question.csv file. The name of your file don't matter. You can use the template on theme folder to generate your csv file.

* Then, open index.html file with your browser, select your csv an do click on `Generate Test` button.


![how-to-use](how-to-use2.gif)


## For dev

### Install dev tools:
npm install --global browserify watchify

### Generate bundle.js
go to src folder and execute:


`browserify main.js -o ../dist/bundle.js`

### watch for changes
`watchify main.js -o ../dist/bundle.js -v`
