/*jshint esversion: 6 */

//Have submit button disabled = true at start;
const $ = require('jquery');

const CreateIdea = require('./constructor');
const title = $('.title-field');
const body = $('.body-field');
const search = $('.search-field');
//export
let ideaArray = JSON.parse(localStorage.getItem('newUserIdea')) || [];
let doneArray = JSON.parse(localStorage.getItem('doneUserIdea')) || [];

$(document).ready(function() {
  for(let i=0; i<ideaArray.length; i++){
    if(ideaArray[i].done === true){
      for(let i=0; i< ideaArray.length; i++){
        if(ideaArray[i].done === true){
          ideaArray[i].done = false;
          doneArray.push(ideaArray[i]);
          ideaArray.splice(i, 1);
          saveToStorage();
        }
      }
    }
  }
  for(let i=0; i<doneArray.length; i++){
    if(doneArray[i].done === true){
      for(let i=0; i< doneArray.length; i++){
        if(doneArray[i].done === true){
          doneArray[i].done = false;
          ideaArray.push(doneArray[i]);
          doneArray.splice(i, 1);
          saveToStorage();
        }
      }
    }
  }
  getStorage();
});

function showButton(){
    $('.idea-list').append(
      `<button class='show-more-ideas' type='button' name='more'>+</button>`
    );
}

$('.idea-list').on('click', '.show-more-ideas', function(){
  let displayAll = true;
  getStorage(displayAll);
});

function createNewIdea(){
  let titleInput = title.val();
  let bodyInput = body.val();
  let newUserIdea = new CreateIdea(titleInput, bodyInput);
  return newUserIdea;
}

$('.save-button').on('click', function(){
  var newUserIdea = createNewIdea();
  ideaArray.unshift(newUserIdea);
  saveToStorage(newUserIdea);
  getStorage();
  clearInputFields();
  $('.character-numbers').text(0);
});

$('ul').on('click', '.delete', function(){
  let id = this.closest('li').id;
  removeIdea(id);
  $(this).closest('li').remove();
});

$('ul').on('blur', '.title-input', function(){
  let id = this.closest('li').id;
  let newTitle = $(this).text();
  editTitle(id, newTitle);
});

$('ul').on('blur', '.body-input', function(){
  let id = this.closest('li').id;
  let newbody = $(this).text();
  editBody(id, newbody);
});

$('.idea-list').on('click', '.completed', function(){
  $(this).parent().toggleClass('new-idea-done');
  let thisIdea = $(this).parent().prop('id');
  for(let i = 0; i < ideaArray.length; i++){
    if(ideaArray[i].id == thisIdea){
      if(ideaArray[i].done === false){
        ideaArray[i].done = true;
        console.log(ideaArray[i].done);
      }
    }
    saveToStorage();
  }
  for(let i = 0; i < doneArray.length; i++){
    if(doneArray[i].id == thisIdea){
      if(doneArray[i].done === false){
        doneArray[i].done = true;
        console.log(doneArray[i].done);
      }
    }
    saveToStorage();
  }
});

$('.show-completed').on('click', function(){
  console.log(doneArray);
  if(doneArray){
    for(let i = doneArray.length-1; i > -1; i--){
      let idea = doneArray[i];
        displayCompletedIdea(idea.title, idea.body, idea.id, idea.quality);
      }
    $('.show-completed').prop('disabled', true);
  }
});

$('.importance-critical').on('click', function(){
  $('.idea-list').children().remove();
  for(let i=0; i<ideaArray.length; i++){
    if(ideaArray[i].quality === 'Critical'){
      let idea = ideaArray[i];
      displayIdea(idea.title, idea.body, idea.id, idea.quality);
    }
  }
});

$('.importance-high').on('click', function(){
  $('.idea-list').children().remove();
  for(let i=0; i<ideaArray.length; i++){
    if(ideaArray[i].quality === 'High'){
      let idea = ideaArray[i];
      displayIdea(idea.title, idea.body, idea.id, idea.quality);
    }
  }
});

$('.importance-normal').on('click', function(){
  $('.idea-list').children().remove();
  for(let i=0; i<ideaArray.length; i++){
    if(ideaArray[i].quality === 'Normal'){
      let idea = ideaArray[i];
      displayIdea(idea.title, idea.body, idea.id, idea.quality);
    }
  }
});

$('.importance-low').on('click', function(){
  $('.idea-list').children().remove();
  for(let i=0; i<ideaArray.length; i++){
    if(ideaArray[i].quality === 'Low'){
      let idea = ideaArray[i];
      displayIdea(idea.title, idea.body, idea.id, idea.quality);
    }
  }
});

$('.importance-none').on('click', function(){
  $('.idea-list').children().remove();
  for(let i=0; i<ideaArray.length; i++){
    if(ideaArray[i].quality === 'None'){
      let idea = ideaArray[i];
      displayIdea(idea.title, idea.body, idea.id, idea.quality);
    }
  }
});

search.on('keyup', function(id, title){
  let search = $(this).val();
  $('h2:contains(' + search + ')').closest('.new-idea').show();
  $('h2:not(:contains(' + search + '))').closest('.new-idea').hide();
  $('h3:contains(' + search + ')').closest('.new-idea').show();
});
//blog.grapii.com/2010/08/how-to-build-a-simple-search-filter-with-jquery/

title.on('keyup', function(){
  $('.save-button').prop('disabled', false);
  $('.save-button').css('opacity', 1);
});

body.on('keyup', function(){
  length = body.val().length;
  $('.character-numbers').text(length);
  if(length > 120){
    $('.save-button').prop('disabled', true);
  }
  else{
    $('.save-button').prop('disabled', false);
  }
});

// function CreateIdea(title, body, id, quality) {
//   this.title = title;
//   this.body = body;
//   this.id = id || Date.now();
//   this.quality = quality || "Normal";
//   this.done = false;
// }

function displayIdea(titleInput, bodyInput, id, quality){
  $('.idea-list').prepend(
    `<li id=${id} class="new-idea">
    <h2 class="title-input" contenteditable="true">${titleInput}</h2>
    <button aria-label="delete" class="delete" type="button" name="delete" img src="images/delete.svg"></button>
    <h3 class="body-input" contenteditable="true">${bodyInput}</h3>
    <button aria-label="up-vote" class="up-vote" type="button" name="up-vote" img src="images/upvote.svg"></button>
    <button aria-label="down-vote" class="down-vote" type="button" name="down-vote" img src="images/downvote.svg"></button>
    <p class="rating">quality: <span class="user-quality">${quality}</span></p>
    <button class="completed" type="button" name="completed">Done!</button>
    </li>`
  );
}

function displayCompletedIdea(titleInput, bodyInput, id, quality){
  $('.idea-list').prepend(
    `<li id=${id} class="new-idea new-idea-done">
    <h2 class="title-input" contenteditable="true">${titleInput}</h2>
    <button class="delete" type="button" name="delete" img src="images/delete.svg"></button>
    <h3 class="body-input" contenteditable="true">${bodyInput}</h3>
    <button class="up-vote" type="button" name="up-vote" img src="images/upvote.svg"></button>
    <button class="down-vote" type="button" name="down-vote" img src="images/downvote.svg"></button>
    <p class="rating">quality: <span class="user-quality">${quality}</span></p>
    <button class="completed" type="button" name="completed">Done!</button>
    </li>`
  );
}

//export
function saveToStorage() {
  localStorage.setItem('newUserIdea', JSON.stringify(ideaArray));
  localStorage.setItem('doneUserIdea', JSON.stringify(doneArray));
}

//function can display less than 10 if one or more of first ten are done.
function getStorage(displayAll){
  $('.idea-list').children().remove();
  if(ideaArray.length < 11 || displayAll){
    for(let i = ideaArray.length-1; i >= 0; i--){
      let idea = ideaArray[i];
      if(idea.done === false){
      displayIdea(idea.title, idea.body, idea.id, idea.quality);
      }
    }
  }
  else if(ideaArray.length >= 11){
    for(let i = 9; i >= 0; i--){
      let idea = ideaArray[i];
      if(idea.done === false){
        displayIdea(idea.title, idea.body, idea.id, idea.quality);
        }
      }
    showButton();
  }
}

function clearInputFields(){
  let titleInput = title.val('');
  let bodyInput = body.val('');
  $('.save-button').prop('disabled', true);
  $('.save-button').css('opacity', '.5');
}

function editTitle(id, newTitle){
  for(let i = 0; i < ideaArray.length; i++){
    if(ideaArray[i].id === parseInt(id)){
      ideaArray[i].title = newTitle;
      ideaArray.splice(i, 1, ideaArray[i]);
    }
  }
  saveToStorage();
  getStorage();
}

function editBody(id, newBody){
  for(let i = 0; i < ideaArray.length; i++){
    if(ideaArray[i].id === parseInt(id)){
      ideaArray[i].body = newBody;
      ideaArray.splice(i, 1, ideaArray[i]);
    }
  }
  saveToStorage();
  getStorage();
}

function removeIdea(id, index){
  for(let i = 0; i < ideaArray.length; i++){
    if(ideaArray[i].id === parseInt(id)){
      ideaArray.splice(i, 1);
    }
  }
  saveToStorage();
  getStorage();
}

export {ideaArray, saveToStorage};
