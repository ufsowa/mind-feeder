import { select, templates } from '../settings.js';
import Song from './Song.js';

class Search {
  constructor(initData){
    const thisSearch = this;

    thisSearch.dom = {};
    thisSearch.songsData = initData;
    thisSearch.indexes = [];

    thisSearch.getElements();
    thisSearch.render();
    thisSearch.initSearch();
    thisSearch.initActions();
  }

  getElements(){
    const thisSearch = this;

    thisSearch.dom.container = document.querySelector(select.containerOf.search);
  }

  render(){
    const thisSearch = this;

    const htmlElement = document.createElement('div');
    htmlElement.innerHTML = templates.search();
    thisSearch.dom.container.appendChild(htmlElement);

    thisSearch.dom.songsList = document.querySelector(select.search.songList);
    thisSearch.dom.input = thisSearch.dom.container.querySelector(select.search.input);
    thisSearch.dom.search = thisSearch.dom.container.querySelector(select.search.button);
  }

  initActions(){
    const thisSearch = this;

    thisSearch.dom.search.addEventListener('click', function(event){
      event.preventDefault();
      const searchTxt = thisSearch.dom.input.value.toLowerCase();

      thisSearch.dom.input.value = '';

      thisSearch.runSearch(searchTxt);
    });
  }

  initSearch(){
    const thisSearch = this;

    // build table of indexes to search over
    for(let song of thisSearch.songsData){
      const songIndex = [];
      songIndex.push(song.id.toString());
      songIndex.push(song.title.toLowerCase());
      for(let option of song.categories){
        songIndex.push(option.toLowerCase());
      }
      thisSearch.indexes.push(songIndex);
    }
  }

  runSearch(searchTxt){
    const thisSearch = this;

    if(!searchTxt) return;  //skip ampty search

    const queryRegex = new RegExp('\\s+');  //handle multi search

    const searches = searchTxt.split(queryRegex);
    const resultsIds = new Set();

    for(let item of thisSearch.indexes){
      const songId = item[0];
      for(let index of item){
        let isPresent = false;
        for(let query of searches){
          isPresent = index.includes(query);
          if (isPresent) break;
        }
        if(isPresent){
          resultsIds.add(parseInt(songId));
        }
      }
    }

    thisSearch.displayResults(resultsIds);
  }

  displayResults(songsIds){
    const thisSearch = this;
    thisSearch.dom.songsList.innerHTML = '';

    const text = '<h3>We have found ' + songsIds.size + ' songs...</h3>';
    thisSearch.dom.songsList.innerHTML = text;

    for(let songData of thisSearch.songsData){
      if(songsIds.has(songData.id)){
        thisSearch.dom.songsList.appendChild(new Song(songData, 'search-player'));
      }
    }
    Song.initAudio('.search-player');
  }
}

export default Search;