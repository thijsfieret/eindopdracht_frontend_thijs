# Eindopdracht frontend Thijs Fieret

- Opleiding: Hbo ICT: Software Development
- Studentnummer: 800010923

## Inhoudsopgave

- Wat kun je doen met de applicatie
- Foto hoofdpagina
- Benodigheden om de applicatie te draaien
- Stappenplan installatie
- Npm commando's

## Wat kun je doen met de applicatie

De informatie over vermiste personen wordt op dit moment via verschillende kanalen aan burgers kenbaar gemaakt. B.v. via een Amber Alert of via Facebook. Probleem is dat er hierdoor geen volledig beeld ontstaat over welke personen vermist zijn. Een bericht kan makkelijk gemist worden en als iemand al wat langer vermist is, is het de vraag of men zich de berichten nog herinnert. Deze applicatie wil dat probleem oplossen door meer inzicht te geven welke volwassenen en welke kinderen er vermist zijn. Daarnaast wordt er relevante informatie gegeven die gerelateerd is aan vermissingen, zoals een lijst met de politiebureaus en zoekmogelijkheid op wijkagenten zijn in een bepaalde buurt. Omdat een vermissing ook gerelateerd kan zijn aan een opsporingsbericht, is het ook mogelijk opsporingsberichten te raadplegen.

## Foto hoofdpagina

![Als de foto niet wil laden ga dan naar main/src/assets/fotohomepagina.png of druk hieronder](https://github.com/thijsfieret/eindopdracht_frontend_thijs/blob/main/src/assets/fotohomepagina.png)
https://github.com/thijsfieret/eindopdracht_frontend_thijs/blob/main/src/assets/fotohomepagina.png

## Benodigheden om de applicatie te draaien

Om de applicatie te kunnen draaien heeft de gebruiker de volgende dingen nodig:
- Een werkende browser
- Een werkende internetverbinding
- Het programma [webstorm] (https://www.jetbrains.com/webstorm/) getest met versie 2021.2.3

## Installatiehandleiding

- Stap 1: Download en installeer webstorm met een account die over een licentie beschikt
- Stap 2: Download en installeer node.js. Dit kan via de volgende [link] (https://nodejs.org/en/)
- Stap 3: Clone de eindopdracht hierboven door op het knopje "code" te klikken en de ssh key te kopiëren
- Stap 4: Open webstorm. Kies hier voor de optie om een bestand de openen via een ssh key. Plak hierin de ssh key
- Stap 5: Klik onder in webstorm op het knopje "Ternminal"
- Stap 6: Typ onder in de terminal de volgende tekst: `npm install`
- Stap 7: Wanneer webstorm klaar is met npm downloaden typ je het volgende commando: `npm start`
- Stap 8: De browser opent nu als het goed is vanzelf de webpagina. Mocht dat niet het geval zijn klik dan [hier] (http://localhost:3000)
- Stap 9: Ga naar [https://cors-anywhere.herokuapp.com/corsdemo](https://cors-anywhere.herokuapp.com/corsdemo) En druk op de knop "Request temporary access to the demo server"

## NPM commando's 

Deze commando's komen van npm zelf. Je hebt naast npm start eigenlijk geen andere commando's nodig om de applicatie de draaien. Wanneer je klaar bent met de applicatie kun je simpelweg webstorm afsluiten.


Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
