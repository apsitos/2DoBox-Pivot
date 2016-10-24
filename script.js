var title = $('.title-field');
var body = $('.body-field');
var ideaArray = [];

$('.save-button').on('click', function() {
  var titleInput = title.val();
  var bodyInput = body.val();
  var ideabox = new CreateIdea(titleInput, bodyInput);
  ideabox.displayIdea();
});

function CreateIdea(title, body, id, quality) {
  this.title = title;
  this.body = body;
  this.quality = "swill";
  this.id = Date.now();
}

CreateIdea.prototype.displayIdea = function () {
  $('.idea-list').prepend(
   `<li ${Date.now()} class="new-idea">
   <h2 class="title-input">${this.title}</h2>
   <p class="body-input">${this.body}</p>
   <p class="rating">quality: <span class="user-quality">swill</span></p>
   <button class="delete" type="button" name="delete" img src="images/delete.svg"></button>
   <button class="up-vote" type="button" name="up-vote" img src="images/upvote.svg"></button>
   <button class="down-vote" type="button" name="down-vote" img src="images/downvote.svg"></button>
   </li>`
 );
}