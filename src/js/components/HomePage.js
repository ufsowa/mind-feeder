import { select, templates } from '../settings.js';
import Song from './Song.js';

class HomePage {
  constructor(initData) {
    const thisPage = this;

    thisPage.dom = {};
    thisPage.songs = initData.songs;
    thisPage.categories = initData.categories;
    thisPage.selectedCategory = '';

    thisPage.getElements();
    thisPage.renderPage();
    thisPage.renderData();
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

    thisPage.dom.subscribe = thisPage.dom.container.querySelector(select.homePage.subscribe);
    thisPage.dom.songsList = document.querySelector(select.homePage.songsList);
    thisPage.dom.categoryList = document.querySelector(select.homePage.categoryList);
    console.log('page elements: ', thisPage.dom);
  }

  renderData() {
    const thisPage = this;

    for(let category in thisPage.categories){
      const htmlLink = document.createElement('a');
      htmlLink.setAttribute('href', category);
      htmlLink.innerHTML = category;
      thisPage.dom.categoryList.appendChild(htmlLink);
    }
    thisPage.dom.links = document.querySelectorAll(select.homePage.links);

    thisPage.renderMusic();
  }

  renderMusic(){
    const thisPage = this;
    thisPage.dom.songsList.innerHTML = '';
    for(let audioData of thisPage.songs) {
      if (!thisPage.selectedCategory || audioData.categories.includes(thisPage.selectedCategory)){
        const songItem = new Song(audioData, 'play-list');
        thisPage.dom.songsList.appendChild(songItem);  
      }
    }
    // eslint-disable-next-line no-undef
    Song.initAudio('.play-list');
  }

  initActions(){
    const thisPage = this;

    thisPage.dom.categoryList.addEventListener('click', function(event){
      event.preventDefault();
      const clickedLink = event.target;
      const clickedCategory = clickedLink.getAttribute('href');
      // ignore other clicks
      if(clickedLink.tagName !== 'A') return;
      // reset all links
      for(let htmlLink of thisPage.dom.links){
        htmlLink.classList.toggle('active', htmlLink.getAttribute('href') === clickedCategory);
      }
      // double click
      if(thisPage.selectedCategory === clickedCategory){
        thisPage.selectedCategory = '';
        clickedLink.classList.remove('active');
      } else {
        thisPage.selectedCategory = clickedCategory;
      }

      thisPage.renderMusic();
    });

    thisPage.dom.subscribe.addEventListener('click', function(event){
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

    thisPage.dom.container.addEventListener('play', function(event){
      const audioId = parseInt(event.target.children[0].id);
      const audioCategories = thisPage.songs.find(item => item.id === audioId).categories;

      audioCategories.forEach(item => {
        if(thisPage.categories[item]){
          thisPage.categories[item].counter++;
          if(!thisPage.categories[item].songs.includes(audioId)){
            thisPage.categories[item].songs.push(audioId);
          }
        } else {
          thisPage.categories[item].counter = 1;
          thisPage.categories[item].songs.push(audioId);
        }
      });

    }, true);
  }
}

export default HomePage;