/*jshint esversion: 6 */
const assert = require('assert');
const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');

test.describe('testing 2dobox', function(){
  this.timeout(10000);

  test.it('should allow me to add a title and description', () => {
    const driver = new webdriver.Builder().forBrowser('chrome').build();

    driver.get('http://localhost:8080');

    const title = driver.findElement({name: 'title-field'});
    const body = driver.findElement({name: 'body-field'});
    const save = driver.findElement({name: 'save'});

    title.sendKeys('this is the title').then(() => {
      return title.getAttribute('value');
    }).then((value) => {assert.equal(value, 'this is the title');
    });

    body.sendKeys('this is the body').then(() => {
      return body.getAttribute('value');
    }).then((value) => {
      assert.equal(value, 'this is the body');
    });
    driver.quit();
  });

  test.it('should append a card to the page', () => {
    const driver = new webdriver.Builder().forBrowser('chrome').build();

    driver.get('http://localhost:8080');

    const title = driver.findElement({name: 'title-field'});
    const body = driver.findElement({name: 'body-field'});
    const save = driver.findElement({name: 'save'});

    title.sendKeys('this is a title');
    body.sendKeys('this is the body');
    save.click();

    const titl = driver.findElement({className: 'title-input'}).then((title) => {
      return title.getText();

    }).then((text) =>{
      assert.equal(text, 'this is a title');
    });

    const bod = driver.findElement({className: 'body-input'}).then((body) => {
      return body.getText();

    }).then((text) =>{
      assert.equal(text, 'this is the body');
    });

    driver.quit();
  });
});
