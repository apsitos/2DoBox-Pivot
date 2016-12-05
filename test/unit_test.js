const assert = require('chai').assert;
const CreateIdea = require('../lib/constructor');

describe('CreateIdea', function(){

  it('should be a function', function(){
    assert.isFunction(CreateIdea);
  });

  it ('should accept a title', function() {
    let idea = new CreateIdea('title', 'body');
    assert.equal(idea.title, 'title');
  });

  it('should accept a body', function() {
    let idea = new CreateIdea('title', 'body');
    assert.equal(idea.body, 'body');
  });

  it('should have a default quality', function() {
    let idea = new CreateIdea('title', 'body', 'quality');
    assert.equal(idea.quality, 'Normal');
  });

  it('should not be completed when added to the page', function() {
    let idea = new CreateIdea('title', 'body', 'quality', 'done');
    assert.equal(idea.done, false);
  });
});
