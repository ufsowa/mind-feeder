import { settings } from './settings.js';
import HomePage from './components/HomePage.js';
import Navigation from './components/Navigation.js';
import Discover from './components/Discover.js';
import Search from './components/Search.js';
import Admin from './components/Admin.js';
/** Main app **/

const app = {

  init: function(){
    const thisApp = this;

    thisApp.initData();
    thisApp.initNavigation();

    console.log('**** Init app ****');
    console.log(thisApp);
  },

  initData: function() {
    const thisApp = this;

    thisApp.data = {};

    const url = settings.db.url + '/' + settings.db.songs;
    console.log('url: ', url);

    fetch(url).then((rawResp) => {
      return rawResp.json();
    }).then((resp) => {
      thisApp.data.songs = resp;

      thisApp.data.categories = {};

      for(let songData of thisApp.data.songs){
        const songId = songData.id;
        for(let category of songData.categories){
          if(!thisApp.data.categories[category]){
            thisApp.data.categories[category] = {
              counter: 0,
              songs: [songId],
            };
          } else {
            thisApp.data.categories[category].songs.push(songId);
          }
        }
      }

      thisApp.initPages();
    });
  },

  initPages: function() {
    const thisApp = this;

    new HomePage(thisApp.data);
    new Discover(thisApp.data);
    new Search(thisApp.data.songs);
    new Admin();
  },

  initNavigation: function(){

    new Navigation();
  },
};

/** Run app **/

app.init();            