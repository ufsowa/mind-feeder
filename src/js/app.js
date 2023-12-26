import { settings } from './settings.js';
import HomePage from './components/HomePage.js';
import Navigation from './components/Navigation.js';

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

      thisApp.initHomePage();
    });
  },

  initHomePage: function() {
    const thisApp = this;

    new HomePage(thisApp.data.songs);
  },

  initNavigation: function(){

    new Navigation();
  },
};

/** Run app **/

app.init();