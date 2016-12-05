function CreateIdea(title, body, id, quality) {
  this.title = title;
  this.body = body;
  this.id = id || Date.now();
  this.quality = quality || "Normal";
  this.done = false;
}

module.exports = CreateIdea;
