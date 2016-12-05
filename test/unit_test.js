const assert = require('chai').assert;
const idea = require('../lib/2dobox.js');

describe ('Create Idea', function() {

  it ('should be a function', function() {
    assert.isFunction(CreateIdea);
  });

  it ('should accept a title', function() {
    let idea = new CreateIdea('title', 'body')
    assert.equal(idea.title, 'title');
  });

  it('should accept a body', function() {
    let idea = new CreateIdea('title', 'body')
    assert.equal(idea.body, 'body');
  })

})
