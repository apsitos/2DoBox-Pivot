/*jshint esversion: 6 */
const assert = require('assert');
const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');

test.describe('testing 2dobox', function(){

  test.beforeEach(()=>{
  driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();
  driver.get('http://localhost:8080');
  });

  test.afterEach(()=>{
  driver.quit();
  });

  test.it('should allow me to add a title and description', () => {

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
  });

  test.it('should append a card to the page', () => {

    const title = driver.findElement({name: 'title-field'});
    const body = driver.findElement({name: 'body-field'});
    const saveButton = driver.findElement({name: 'save'});

    title.sendKeys('this is a title');
    body.sendKeys('this is the body');
    saveButton.click();

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
  });

  test.it('should delete a card when x button is pressed', () => {

    const title = driver.findElement({name: 'title-field'});
    const body = driver.findElement({name: 'body-field'});
    const saveButton = driver.findElement({name: 'save'});

    title.sendKeys('this is a title');
    body.sendKeys('this is the body');
    saveButton.click();

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

    const deleteButton = driver.findElement({name: 'delete'});
    const card = driver.findElement({className: 'new-idea'});

    deleteButton.click().then((card) =>{
      assert.equal(card, undefined);
    });
  });

  test.it('pressing the up arrow should increment the importance of a card', () => {

    const title = driver.findElement({name: 'title-field'});
    const body = driver.findElement({name: 'body-field'});
    const saveButton = driver.findElement({name: 'save'});

    title.sendKeys('this is a title');
    body.sendKeys('this is the body');
    saveButton.click();

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

    const incrementButton = driver.findElement({name: 'up-vote'});

    incrementButton.click();

    const incrementValue = driver.findElement({className: 'user-quality'}).then((quality) =>{
      return quality.getText();
    }).then((quality) => {
      assert.equal(quality, 'High');
    });
  });

  test.it('pressing the down arrow should decrement the importance of a card', () => {

    const title = driver.findElement({name: 'title-field'});
    const body = driver.findElement({name: 'body-field'});
    const saveButton = driver.findElement({name: 'save'});

    title.sendKeys('this is a title');
    body.sendKeys('this is the body');
    saveButton.click();

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

    const decrementButton = driver.findElement({name: 'down-vote'});

    decrementButton.click();

    const decrementValue = driver.findElement({className: 'user-quality'}).then((quality) =>{
      return quality.getText();
    }).then((quality) => {
      assert.equal(quality, 'Low');
    });
  });
});
