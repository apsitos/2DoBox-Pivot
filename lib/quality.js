/*jshint esversion: 6 */

const $ = require('jquery');
import {ideaArray, saveToStorage} from './2dobox';

$('ul').on('click', '.up-vote', function() {
  let quality = $(this).closest("li").find(".user-quality").text();
  let newQuality = upVote(quality);
  let id = this.closest('li').id;
  for(let i = 0; i < ideaArray.length; i ++){
    if(ideaArray[i].id == id){
      ideaArray[i].quality = newQuality;
      ideaArray.splice(i, 1, ideaArray[i]);
    }
  }
  $(this).closest("li").find(".user-quality").text(newQuality);
  saveToStorage();
});

$('ul').on('click', '.down-vote', function() {
  let quality = $(this).closest("li").find(".user-quality").text();
  let newQuality = downVote(quality);
  let id = this.closest('li').id;
  for(let i = 0; i < ideaArray.length; i ++){
    if(ideaArray[i].id == id){
      ideaArray[i].quality = newQuality;
      ideaArray.splice(i, 1, ideaArray[i]);
    }
  }
  $(this).closest("li").find(".user-quality").text(newQuality);
  saveToStorage();
});

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
      return 'Critical';
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
