import { settings } from './settings.js';
import HomePage from './components/HomePage.js';
import Navigation from './components/Navigation.js';
import Discover from './components/Discover.js';
import Search from './components/Search.js';
import Song from './components/Song.js';
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

      thisApp.initPages();
    });
  },

  initPages: function() {
    const thisApp = this;

    new HomePage(thisApp.data.songs);
    new Discover(thisApp.data.songs);
    new Search(thisApp.data.songs);
    new Admin();
    // eslint-disable-next-line no-undef
    Song.initAudio('.play-list');
  },

  initNavigation: function(){

    new Navigation();
  },
};

/** Run app **/

app.init();            