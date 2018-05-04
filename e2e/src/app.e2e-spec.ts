import { AppPage } from './app.po';

describe('line-chat-statistics App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('LINE chat statistics');
  });
});
