const $ = require('jquery')
const title = $('.title-field');
const task = $('.task-field');
const search = $('.search-field');
let ideaArray = JSON.parse(localStorage.getItem('newUserIdea')) || [];

$('document').ready(function(){
  getStorage();
});

$('.save-button').on('click', function(){
  let titleInput = title.val();
  let taskInput = task.val();
  let newUserIdea = new CreateIdea(titleInput, taskInput);
  let id = newUserIdea.id;
  let quality = newUserIdea.quality;
  displayIdea(titleInput, Input, id, quality);
  ideaArray.push(newUserIdea);
  saveToStorage(newUserIdea);
  clearInputFields();
})

$('ul').on('click', '.delete', function(){
  let id = this.closest('li').id
  removeIdea(id);
  $(this).closest('li').remove();
})

$('ul').on('blur', '.title-input', function(){
  let id = this.closest('li').id;
  let newTitle = $(this).text();
  editTitle(id, newTitle);
})

$('ul').on('blur', '.task-input', function(){
  let id = this.closest('li').id;
  let newTask = $(this).text();
  editBody(id, newTask);
})

$('ul').on('click', '.up-vote', function() {
  let quality = $(this).closest("li").find(".user-quality").text();
  let newQuality = upVote(quality);
  let id = this.closest('li').id
  for(let i = 0; i < ideaArray.length; i ++){
    if(ideaArray[i].id == id){
      ideaArray[i].quality = newQuality;
      ideaArray.splice(i, 1, ideaArray[i]);
    }
  }
  $(this).closest("li").find(".user-quality").text(newQuality);
  saveToStorage();
})

$('ul').on('click', '.down-vote', function() {
  let quality = $(this).closest("li").find(".user-quality").text();
  let newQuality = downVote(quality);
  let id = this.closest('li').id
  for(let i = 0; i < ideaArray.length; i ++){
    if(ideaArray[i].id == id){
      ideaArray[i].quality = newQuality;
      ideaArray.splice(i, 1, ideaArray[i]);
    }
  }
  $(this).closest("li").find(".user-quality").text(newQuality);
  saveToStorage();
})

search.on('keyup', function(id, title){
  let search = $(this).val();
  $('h2:contains(' + search + ')').closest('.new-idea').show();
  $('h2:not(:contains(' + search + '))').closest('.new-idea').hide();
  $('h3:contains(' + search + ')').closest('.new-idea').show();
})
//blog.grapii.com/2010/08/how-to-build-a-simple-search-filter-with-jquery/

title.on('keyup', function(){
  $('.save-button').prop('disabled', false);
  $('.save-button').css('opacity', 1);
})

function CreateIdea(title, task, id, quality) {
  this.title = title;
  this.task = task;
  this.id = id || Date.now();
  this.quality = quality || "swill";
}

function displayIdea(titleInput, taskInput, id, quality){
  $('.idea-list').prepend(
    `<li id=${id} class="new-idea">
    <h2 class="title-input" contenteditable="true">${titleInput}</h2>
    <button class="delete" type="button" name="delete" img src="images/delete.svg"></button>
    <h3 class="task-input" contenteditable="true">${taskInput}</h3>
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
  let storedIdeas = JSON.parse(localStorage.getItem('newUserIdea'));
  if (storedIdeas){
    for (i = 0; i < storedIdeas.length; i++){
      let idea = storedIdeas[i];
      displayIdea(idea.title, idea.task, idea.id, idea.quality);
    }
  }
}

function clearInputFields(){
  let titleInput = title.val('');
  let taskInput = task.val('');
  $('.save-button').prop('disabled', true);
  $('.save-button').css('opacity', .5);
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

function editTask(id, newTask){
  for(let i = 0; i < ideaArray.length; i++){
    if(ideaArray[i].id === parseInt(id)){
      ideaArray[i].body = newTask;
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
