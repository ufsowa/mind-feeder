export const select = {
  templateOf: {
    homePage: '#homePage',
  },
  containerOf: {
    homePage: '#home',
  },
};

export const templates = {
  homePage: Handlebars.compile(document.querySelector(select.templateOf.homePage).innerHTML),
};