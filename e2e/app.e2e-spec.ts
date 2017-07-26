import { CountryInfoWebPage } from './app.po';

describe('country-info-web App', () => {
  let page: CountryInfoWebPage;

  beforeEach(() => {
    page = new CountryInfoWebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
