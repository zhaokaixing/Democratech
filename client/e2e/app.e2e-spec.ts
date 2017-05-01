import { DemocratechPage } from './app.po';

describe('democratech App', function() {
  let page: DemocratechPage;

  beforeEach(() => {
    page = new DemocratechPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
