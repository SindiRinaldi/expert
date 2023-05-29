const assert = require('assert');

Feature('Liking Warteg');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked warteg', ({ I }) => {
  I.seeElement('#query');
  // I.seeElement('.query'); // membuat test menjadi gagal
  I.see('Tidak ada warteg untuk ditampilkan', '.warteg-item__not__found');
});

Scenario('liking one warteg', async ({ I }) => {
  I.see('Tidak ada warteg untuk ditampilkan', '.warteg-item__not__found');

  I.amOnPage('/');

  I.waitForElement('.warteg__title a', 20);

  I.seeElement('.warteg__title a');

  const firstWarteg = locate('.warteg__title a').first();
  const firstWartegTitle = await I.grabTextFrom(firstWarteg);
  I.click(firstWarteg);

  I.waitForElement('#likeButton', 20);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.warteg-item');
  const likedwartegTitle = await I.grabTextFrom('.warteg__title');

  assert.strictEqual(firstWartegTitle, likedwartegTitle);
});

Scenario('unliking one restaurant', async ({ I }) => {
  I.see('Tidak ada warteg untuk ditampilkan', '.warteg-item__not__found');

  I.amOnPage('/');

  I.waitForElement('.warteg__title a', 20);

  I.seeElement('.warteg__title a');

  const firstWarteg = locate('.warteg__title a').first();
  const firstWartegName = await I.grabTextFrom(firstWarteg);
  I.click(firstWarteg);

  I.waitForElement('#likeButton', 20);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.warteg-item');

  const unlikedwartegTitle = await I.grabTextFrom('.warteg__title');

  assert.strictEqual(firstWartegName, unlikedwartegTitle);
  I.seeElement('.warteg__title a');
  await I.grabTextFrom(firstWarteg);
  I.click(firstWarteg);

  I.waitForElement('#likeButton', 20);
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/favorite');
  I.see('Tidak ada warteg untuk ditampilkan', '.warteg-item__not__found');
});
