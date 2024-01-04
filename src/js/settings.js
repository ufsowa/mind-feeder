export const select = {
  templateOf: {
    homePage: '#homePage',
    discover: '#discoverPage',
    search: '#searchPage',
    song: '#song',
    admin: '#adminPage'
  },
  containerOf: {
    homePage: '#home',
    discover: '#discover',
    search: '#search',
    pages: '#pages',
    admin: '#admin',
  },
  nav: {
    links: '.navigation > a',
  },
  homePage: {
    songsList: '.homePage > .songs-list',
    categoryList: '.homePage > .category-list',
    subscribe: '.btn',
    links: '.category-list > a',
  },
  discover: {
    songList: '.discover > .songs-list',
  },
  search: {
    songList: '.search > .songs-list',
    button: 'button',
    input: 'input',
  },
  admin: {
    send: '#sendBtn',
    load: '#fetchBtn',
    input: 'input',
  },
  song: {
    audio: 'audio',
  },
};

export const templates = {
  homePage: Handlebars.compile(document.querySelector(select.templateOf.homePage).innerHTML),
  discover: Handlebars.compile(document.querySelector(select.templateOf.discover).innerHTML),
  search: Handlebars.compile(document.querySelector(select.templateOf.search).innerHTML),
  song: Handlebars.compile(document.querySelector(select.templateOf.song).innerHTML),
  admin: Handlebars.compile(document.querySelector(select.templateOf.admin).innerHTML),
};

export const settings = {
  db: {
    url: '//' + window.location.hostname + (window.location.hostname=='localhost' ? ':3131' : ''),
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