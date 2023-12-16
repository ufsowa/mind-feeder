import { select, templates } from './settings.js';

const htmlElement = document.createElement('div');
htmlElement.innerHTML = templates.homePage();

console.log('page wrapper: ', select.containerOf.homePage);

const homePageContainer = document.querySelector(select.containerOf.homePage);

console.log('page wrapper: ', homePageContainer);

homePageContainer.appendChild(htmlElement);