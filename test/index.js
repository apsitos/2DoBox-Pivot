const assert = require('assert');
const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');

const By = webdriver.By;

test.describe('testing idea-box', () => {
  const driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build();

  test.beforeEach(() => {
    setTimeout(() => {}, 10000)
    const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
    driver.get('http://localhost:8080');

  })

  test.afterEach(() => {
    driver.quit()
  })

  test.it('should allow me to add a title and description', (done) => {
    // from there we'll tell selenium to find our input field
    const title       = driver.findElement(By.className('title-field'));
    const description = driver.findElement({name: 'description'});
    // add to the specific input field
    title.sendKeys('this is a title').then(() => {
      return title.getAttribute('value')
    }).then((value) => {assert.equal(value, 'this is a title')
      });

    description.sendKeys('this is a description').then(() => {
      return description.getAttribute('value')
    }).then((value) => {
      assert.equal(value, 'this is a description')
    });
    done();
  });
});
