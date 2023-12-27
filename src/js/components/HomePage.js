import { select, templates } from '../settings.js';
import Song from './Song.js';

class HomePage {
  constructor(initData) {
    const thisPage = this;

    thisPage.dom = {};

    thisPage.initElements();
    thisPage.renderPage();
    thisPage.renderData(initData);
  }

  initElements() {
    const thisPage = this;

    thisPage.dom.container = document.querySelector(select.containerOf.homePage);
  }

  renderPage() {
    const thisPage = this;

    const htmlElement = document.createElement('div');
    htmlElement.innerHTML = templates.homePage();
    thisPage.dom.container.appendChild(htmlElement);
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
}

export default HomePage;