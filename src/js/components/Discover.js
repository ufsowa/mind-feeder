import { select, templates } from '../settings.js';
import Song from './Song.js';

class Discover {
  constructor(initData) {
    const thisPage = this;

    thisPage.dom = {};
    thisPage.songsData = initData;
    thisPage.selectedSong = '';

    thisPage.getElements();
    thisPage.render();
    thisPage.initActions();

    thisPage.selectSong();
  }

  getElements(){
    const thisPage = this;

    thisPage.dom.container = document.querySelector(select.containerOf.discover);
  }

  render(){
    const thisPage = this;

    const htmlElement = document.createElement('div');
    htmlElement.innerHTML = templates.discover();
    thisPage.dom.container.appendChild(htmlElement);

    thisPage.dom.songsWrapper = document.querySelector(select.discover.songList);
  }

  initActions(){
    const thisPage = this;

    thisPage.dom.container.addEventListener('pageUpdated', function(){
      thisPage.selectSong();
    });
  }

  selectSong(){
    const thisPage = this;

    let selectedId = Math.floor(Math.random() * thisPage.songsData.length + 1) - 1;

    while (thisPage.selectedSong === selectedId){
      selectedId = Math.floor(Math.random() * thisPage.songsData.length + 1) - 1;
    }
    thisPage.selectedSong = selectedId;
    thisPage.dom.songsWrapper.replaceChildren(new Song(thisPage.songsData[selectedId], 'discover-player'));
    Song.initAudio('.discover-player');
  }
}

export default Discover;