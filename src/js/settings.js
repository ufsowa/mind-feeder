export const select = {
  templateOf: {
    homePage: '#homePage',
    discover: '#discoverPage',
    search: '#searchPage',
    song: '#song',
  },
  containerOf: {
    homePage: '#home',
    discover: '#discover',
    search: '#search',
    pages: '#pages',
  },
  nav: {
    links: '.navigation > a',
  },
  homePage: {
    songsList: '.homePage > .songs-list',
  },
  discover: {
    songList: '.discover > .songs-list',
  },
  search: {
    songList: '.search > .songs-list',
    button: 'button',
    input: 'input',
  },
};

export const templates = {
  homePage: Handlebars.compile(document.querySelector(select.templateOf.homePage).innerHTML),
  discover: Handlebars.compile(document.querySelector(select.templateOf.discover).innerHTML),
  search: Handlebars.compile(document.querySelector(select.templateOf.search).innerHTML),
  song: Handlebars.compile(document.querySelector(select.templateOf.song).innerHTML),
};

export const settings = {
  db: {
    url: 'http://localhost:3131',
    songs: 'songs',
    files: 'songs',
    authors: 'authors',
  },
};

export const classNames = {
  nav: {
    active: 'active',
  },
  pages: {
    active: 'active',
  },
};