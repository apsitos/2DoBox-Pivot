/*jshint esversion: 6 */
const $ = require('jquery');
const title = $('.title-field');
const body = $('.body-field');
const search = $('.search-field');

//export
let ideaArray = JSON.parse(localStorage.getItem('newUserIdea')) || [];

$('document').ready(function(){
  checkArrayLength();
});

if (ideaArray.length > 10) {
  $('.idea-list').append(
    `<button class='show-more-ideas' type='button' name='more'>Show More Ideas</button>`
  );
}

$('.show-more-ideas').on('click', function (){
  getStorage();
  $('.show-more-ideas').prop('disabled', true);
});

function showRecent() {
  $('.idea-list').children().remove();
  let storedIdeas = JSON.parse(localStorage.getItem('newUserIdea'));
  for(let i=9; i>=0; i--){
    let idea = storedIdeas[i];
    displayIdea(idea.title, idea.body, idea.id, idea.quality);
  }
}

$('.save-button').on('click', function(){
  let titleInput = title.val();
  let bodyInput = body.val();
  let newUserIdea = new CreateIdea(titleInput, bodyInput);
  let id = newUserIdea.id;
  let quality = newUserIdea.quality;
  displayIdea(titleInput, bodyInput, id, quality);
  ideaArray.unshift(newUserIdea);
  saveToStorage(newUserIdea);
  showRecent();
  clearInputFields();
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
  for(let i = 0; i < ideaArray.length; i ++){
    if(ideaArray[i].id == thisIdea){
      if(ideaArray[i].done === false){
        ideaArray[i].done = true;
      }
      else if(ideaArray[i].done === true){
        ideaArray[i].done = false;
      }
    }
  }
  saveToStorage();
});

$('.show-completed').on('click', function(){
  let storedIdeas = JSON.parse(localStorage.getItem('newUserIdea'));
  if (storedIdeas){
    for (i = 0; i < storedIdeas.length; i++){
      if(storedIdeas[i].done === true){
        let idea = storedIdeas[i];
        displayCompletedIdea(idea.title, idea.body, idea.id, idea.quality);
      }
      $('.show-completed').prop('disabled', true);
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

function CreateIdea(title, body, id, quality) {
  this.title = title;
  this.body = body;
  this.id = id || Date.now();
  this.quality = quality || "Normal";
  this.done = false;
}

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
}

function getStorage(){
  let storedIdeas = JSON.parse(localStorage.getItem('newUserIdea'));
  if (storedIdeas){
    for(let i = storedIdeas.length-1; i > -1; i--){
      let idea = storedIdeas[i];
      if(storedIdeas[i].done === false){
      displayIdea(idea.title, idea.body, idea.id, idea.quality);
      }
    }
  }
}

function checkArrayLength() {
  if (ideaArray.length <= 11) {
    getStorage();
  } else {
    showRecent();
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
}

function editBody(id, newbody){
  for(let i = 0; i < ideaArray.length; i++){
    if(ideaArray[i].id === parseInt(id)){
      ideaArray[i].body = newBody;
      ideaArray.splice(i, 1, ideaArray[i]);
    }
    saveToStorage();
  }
}

function removeIdea(id, index){
  for(let i = 0; i < ideaArray.length; i++){
    if(ideaArray[i].id === parseInt(id)){
      ideaArray.splice(i, 1);
    }
  }
  saveToStorage();
}

export {ideaArray, saveToStorage};
