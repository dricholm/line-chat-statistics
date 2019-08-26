# Line Chat Statistics

[![Build Status](https://travis-ci.com/dricholm/line-chat-statistics.svg?branch=master)](https://travis-ci.com/dricholm/line-chat-statistics)

## Description

This web app can read LINE chat logs and parse them on client-side for statistics. Made with Angular.

## Live demo

The web app is live on GitHub pages. You can try it out by clicking [here](https://dricholm.github.io/line-chat-statistics).

## Starting the web app

To run the web application you need [Node.js](https://nodejs.org). The following commands can be used:

- `npm start`: Start the application locally in english.
- `npm run start:ja`: Start the application locally in japanese.
- `npm run build`: Build the english application in dist folder.
- `npm run build:ja`: Build the japanese application in dist folder.
- `npm run deploy`: Build english and japanese version and deploy with [angular-cli-ghpages](https://github.com/angular-schule/angular-cli-ghpages). (Note: Need to install angular-cli-ghpages globally)
- `npm test`: Run unit tests.
- `npm run coverage`: Generate coverage in coverage folder.

## Used packages

- [Angular](https://angular.io)
- [angular-date-value-accessor](https://github.com/johanneshoppe/angular-date-value-accessor)
- [Bootstrap](http://getbootstrap.com)
- [line-chat-parser](https://github.com/meyfa/line-chat-parser)
- [ngx-charts](https://github.com/swimlane/ngx-charts)
- [Prettier](https://prettier.io)
