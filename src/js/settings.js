export const select = {
  templateOf: {
    homePage: '#homePage',
    song: '#song',
  },
  containerOf: {
    homePage: '#home',
    pages: '#pages',
  },
  homePage: {
    songsList: '.homePage > .songs-list',
  },
  nav: {
    links: '#nav-bar > a',
  },
};

export const templates = {
  homePage: Handlebars.compile(document.querySelector(select.templateOf.homePage).innerHTML),
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