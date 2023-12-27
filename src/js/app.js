import { settings } from './settings.js';
import HomePage from './components/HomePage.js';
import Navigation from './components/Navigation.js';
import Discover from './components/Discover.js';
import Search from './components/Search.js';
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
    // eslint-disable-next-line no-undef
    GreenAudioPlayer.init({
      selector: '.play-list', // inits Green Audio Player on each audio container that has class "player"
      stopOthersOnPlay: true
    });
  },

  initNavigation: function(){

    new Navigation();
  },
};

/** Run app **/

app.init();            