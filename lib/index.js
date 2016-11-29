var $ = require('jquery')
var title = $('.title-field');
var body = $('.task-field');
var search = $('.search-field');
var ideaArray = JSON.parse(localStorage.getItem('newUserIdea')) || [];

$('document').ready(function(){
  getStorage();
});

$('.save-button').on('click', function(){
  var titleInput = title.val();
  var bodyInput = body.val();
  var newUserIdea = new CreateIdea(titleInput, bodyInput);
  var id = newUserIdea.id;
  var quality = newUserIdea.quality;
  displayIdea(titleInput, bodyInput, id, quality);
  ideaArray.push(newUserIdea);
  saveToStorage(newUserIdea);
  clearInputFields();
})

$('ul').on('click', '.delete', function(){
  var id = this.closest('li').id
  removeIdea(id);
  $(this).closest('li').remove();
})

$('ul').on('blur', '.title-input', function(){
  var id = this.closest('li').id;
  var newTitle = $(this).text();
  editTitle(id, newTitle);
})

$('ul').on('blur', '.body-input', function(){
  var id = this.closest('li').id;
  var newBody = $(this).text();
  editBody(id, newBody);
})

$('ul').on('click', '.up-vote', function() {
  var quality = $(this).closest("li").find(".user-quality").text();
  var newQuality = upVote(quality);
  var id = this.closest('li').id
  for(var i = 0; i < ideaArray.length; i ++){
    if(ideaArray[i].id == id){
      ideaArray[i].quality = newQuality;
      ideaArray.splice(i, 1, ideaArray[i]);
    }
  }
  $(this).closest("li").find(".user-quality").text(newQuality);
  saveToStorage();
})

$('ul').on('click', '.down-vote', function() {
  var quality = $(this).closest("li").find(".user-quality").text();
  var newQuality = downVote(quality);
  var id = this.closest('li').id
  for(var i = 0; i < ideaArray.length; i ++){
    if(ideaArray[i].id == id){
      ideaArray[i].quality = newQuality;
      ideaArray.splice(i, 1, ideaArray[i]);
    }
  }
  $(this).closest("li").find(".user-quality").text(newQuality);
  saveToStorage();
})

search.on('keyup', function(id, title){
  var search = $(this).val();
  $('h2:contains(' + search + ')').closest('.new-idea').show();
  $('h2:not(:contains(' + search + '))').closest('.new-idea').hide();
  $('h3:contains(' + search + ')').closest('.new-idea').show();
})
//blog.grapii.com/2010/08/how-to-build-a-simple-search-filter-with-jquery/

title.on('keyup', function(){
  $('.save-button').prop('disabled', false);
  $('.save-button').css('opacity', 1);
})

function CreateIdea(title, body, id, quality) {
  this.title = title;
  this.body = body;
  this.id = id || Date.now();
  this.quality = quality || "swill";
}

function displayIdea(titleInput, bodyInput, id, quality){
  $('.idea-list').prepend(
    `<li id=${id} class="new-idea">
    <h2 class="title-input" contenteditable="true">${titleInput}</h2>
    <button class="delete" type="button" name="delete" img src="images/delete.svg"></button>
    <h3 class="body-input" contenteditable="true">${bodyInput}</h3>
    <button class="up-vote" type="button" name="up-vote" img src="images/upvote.svg"></button>
    <button class="down-vote" type="button" name="down-vote" img src="images/downvote.svg"></button>
    <p class="rating">quality: <span class="user-quality">${quality}</span></p>
    </li>`
  );
}

function saveToStorage() {
  localStorage.setItem('newUserIdea', JSON.stringify(ideaArray));
}

function getStorage(){
  var storedIdeas = JSON.parse(localStorage.getItem('newUserIdea'));
  if (storedIdeas){
    for (i = 0; i < storedIdeas.length; i++){
      var idea = storedIdeas[i];
      displayIdea(idea.title, idea.body, idea.id, idea.quality);
    }
  }
}

function clearInputFields(){
  var titleInput = title.val('');
  var bodyInput = body.val('');
  $('.save-button').prop('disabled', true);
  $('.save-button').css('opacity', .5);
}

function editTitle(id, newTitle){
  for(var i = 0; i < ideaArray.length; i++){
    if(ideaArray[i].id === parseInt(id)){
      ideaArray[i].title = newTitle;
      ideaArray.splice(i, 1, ideaArray[i]);
    }
  }
  saveToStorage();
}

function editBody(id, newBody){
  for(var i = 0; i < ideaArray.length; i++){
    if(ideaArray[i].id === parseInt(id)){
      ideaArray[i].body = newBody;
      ideaArray.splice(i, 1, ideaArray[i]);
    }
    saveToStorage();
  }
}

function removeIdea(id, index){
  for(var i = 0; i < ideaArray.length; i++){
    if(ideaArray[i].id === parseInt(id)){
      ideaArray.splice(i, 1);
    }
  }
  saveToStorage();
}

function upVote(quality){
  switch (quality) {
    case 'swill':
      return 'plausible';
    case 'plausible':
      return 'genius';
    default:
      return "genius"
  }
}

function downVote(quality) {
  switch (quality) {
    case 'genius':
    return 'plausible';
    case 'plausible':
    return 'swill';
    default:
    return 'swill'
  }
}

//
// $('.title-field').keypress(function(event){
//   if(event.keyCode === 13){
//     event.preventDefault();
//     $('.save-button').click();
//   }
// });
//
// $('.body-field').keypress(function(event){
//   if(event.keyCode === 13){
//     event.preventDefault();
//     $('.save-button').click();
//   }
// });
