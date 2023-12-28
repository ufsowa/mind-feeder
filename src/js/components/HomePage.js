import { select, templates } from '../settings.js';
import Song from './Song.js';

class HomePage {
  constructor(initData) {
    const thisPage = this;

    thisPage.dom = {};

    thisPage.getElements();
    thisPage.renderPage();
    thisPage.renderData(initData);
    thisPage.initActions();
  }

  getElements() {
    const thisPage = this;

    thisPage.dom.container = document.querySelector(select.containerOf.homePage);
  }

  renderPage() {
    const thisPage = this;

    const htmlElement = document.createElement('div');
    htmlElement.innerHTML = templates.homePage();
    thisPage.dom.container.appendChild(htmlElement);

    thisPage.dom.admin = thisPage.dom.container.querySelector(select.homePage.subscribe);
  }

  renderData(songsData) {
    const thisPage = this;

    thisPage.dom.songsList = document.querySelector(select.homePage.songsList);

    console.log('page elements: ', thisPage.dom);

    for(let songData of songsData) {
      const songItem = new Song(songData, 'play-list');

      thisPage.dom.songsList.appendChild(songItem);
    }
  }

  initActions(){
    const thisPage = this;

    thisPage.dom.admin.addEventListener('click', function(event){
      event.preventDefault();

      const clickedElement = event.target.parentNode;
      const redirectLink = clickedElement.getAttribute('href').replace('#', '');
      console.log('Subscribe', clickedElement, redirectLink);

      const redirectEvent = new CustomEvent('pageRedirected', {
        bubbles: true,
        detail: {
          pageId: redirectLink,
        }
      });

      thisPage.dom.container.dispatchEvent(redirectEvent);
    });
  }
}

export default HomePage;