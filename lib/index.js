const $ = require('jquery')
const title = $('.title-field');
const body = $('.body-field');
const search = $('.search-field');
let ideaArray = JSON.parse(localStorage.getItem('newUserIdea')) || [];

$('document').ready(function(){
  getStorage();
});

$('.save-button').on('click', function(){
  let titleInput = title.val();
  let bodyInput = body.val();
  let newUserIdea = new CreateIdea(titleInput, bodyInput);
  let id = newUserIdea.id;
  let quality = newUserIdea.quality;
  displayIdea(titleInput, bodyInput, id, quality);
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

$('ul').on('blur', '.body-input', function(){
  let id = this.closest('li').id;
  let newbody = $(this).text();
  editBody(id, newbody);
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
    <button class="delete" type="button" name="delete" img src="images/delete.svg"></button>
    <h3 class="body-input" contenteditable="true">${bodyInput}</h3>
    <button class="up-vote" type="button" name="up-vote" img src="images/upvote.svg"></button>
    <button class="down-vote" type="button" name="down-vote" img src="images/downvote.svg"></button>
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

function saveToStorage() {
  localStorage.setItem('newUserIdea', JSON.stringify(ideaArray));
}

function getStorage(){
  let storedIdeas = JSON.parse(localStorage.getItem('newUserIdea'));
  if (storedIdeas){
    for (i = 0; i < storedIdeas.length; i++){
      if(storedIdeas[i].done === false){
      let idea = storedIdeas[i];
      displayIdea(idea.title, idea.body, idea.id, idea.quality);
      }
    }
  }
}

function clearInputFields(){
  let titleInput = title.val('');
  let bodyInput = body.val('');
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

function upVote(quality){
  switch (quality) {
    case 'None':
      return 'Low';
    case 'Low':
      return 'Normal';
    case 'Normal':
      return 'High';
    case 'High':
      return 'Critical';
    default:
      return 'Critical'
  }
}

function downVote(quality) {
  switch (quality) {
    case 'Critical':
      return 'High';
    case 'High':
      return 'Normal';
    case 'Normal':
      return 'Low';
    case 'Low':
      return 'None';
    default:
    return 'None';
  }
}

$('.idea-list').on('click', '.completed', function(){
  $(this).parent().toggleClass('new-idea-done');
  let thisIdea = $(this).parent().prop('id');
  for(let i = 0; i < ideaArray.length; i ++){
    if(ideaArray[i].id == thisIdea){
      ideaArray[i].done = true;
    }
  }
  saveToStorage();
});

// function check(){
//   for(let i = 0; i < ideaArray.length; i ++){
//     if(ideaArray[i].done === true){
//       ideaArray[i].toggleClass('new-idea-done');
//       }
//     }
// }

$('.show-completed').on('click', function(){
  let storedIdeas = JSON.parse(localStorage.getItem('newUserIdea'));
  if (storedIdeas){
    for (i = 0; i < storedIdeas.length; i++){
      if(storedIdeas[i].done === true){
      let idea = storedIdeas[i];
      displayCompletedIdea(idea.title, idea.body, idea.id, idea.quality);
      }
    }
  }
});


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
