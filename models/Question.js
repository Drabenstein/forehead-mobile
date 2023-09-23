export class Question {
  id;
  text;
  helperText;
  authorName;

  constructor(id, text, helperText, authorName) {
    this.id = id;
    this.text = text;
    this.helperText = helperText;
    this.authorName = authorName;
  }
}
