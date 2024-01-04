import { select, templates } from '../settings.js';
import Song from './Song.js';

class Discover {
  constructor(initData) {
    const thisPage = this;

    thisPage.dom = {};
    thisPage.songsData = initData.songs;
    thisPage.categories = initData.categories;
    thisPage.selectedSongId = 0;

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

    console.log('Stats: ',thisPage.categories);

    const categoryKeys = Object.keys(thisPage.categories);
    let probability = [];
    let totalCount = 0;
    categoryKeys.forEach((item) => {
      const categoryCounts = thisPage.categories[item].counter;
      console.log(categoryCounts);
      totalCount+=categoryCounts;
      probability.push(categoryCounts);
    });
    //normalize
    const normalizedProb = probability.map(counter => {
      if(totalCount > 0){
        return counter/totalCount;
      } else 
        return 0;
    });
    const checkNormalization = normalizedProb.reduce((x,y) => x+y, 0);
    console.log('check: ', checkNormalization);
    // create target events
    const eventsTarget = [0];
    for(let i=0; i < normalizedProb.length; i++){
      const nextEvent = eventsTarget[i] + normalizedProb[i];
      eventsTarget.push(nextEvent);
    }
    // get seed
    const rndEvent = Math.random();
    let selectedCategory = categoryKeys[0];
    console.log(eventsTarget, rndEvent);
    // find the category with probability
    for(let i=0; i < eventsTarget.length-1; i++){
      console.log('i: ', i, eventsTarget[i+1]);
      if(rndEvent > eventsTarget[i] && rndEvent <= eventsTarget[i+1]){
        selectedCategory = categoryKeys[i];
        console.log('get: ', selectedCategory, i, eventsTarget[i], eventsTarget[i+1], rndEvent);
      } 
    }
    // choose rnd song from category
    const rndSongId = Math.floor(Math.random() * thisPage.categories[selectedCategory].songs.length + 1) - 1;
    let newSongId = thisPage.categories[selectedCategory].songs[rndSongId];
    console.log('Get audio: ', newSongId, thisPage.categories[selectedCategory]);
    // get random if audio is frequent or stats are corrupted
    if(checkNormalization !== 1){
      const rndSongindex = Math.floor(Math.random() * thisPage.songsData.length + 1) - 1;
      newSongId = thisPage.songsData[rndSongindex].id;
      console.log('Get new song: ', newSongId);
    }
    while (thisPage.selectedSongId === newSongId){
      const rndSongindex = Math.floor(Math.random() * thisPage.songsData.length + 1) - 1;
      newSongId = thisPage.songsData[rndSongindex].id;
      console.log('Get other song: ', newSongId);
    }
    
    console.log('Final song: ', newSongId);
    thisPage.selectedSongId = newSongId;
    thisPage.dom.songsWrapper.replaceChildren(new Song(thisPage.songsData.find( song => song.id === thisPage.selectedSongId), 'discover-player'));
    Song.initAudio('.discover-player');
  }
}

export default Discover;