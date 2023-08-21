class Question {
  id;
  text;
  helperText;
  authorName;
  categoryId;

  constructor(id, text, helperText, authorName, categoryId) {
    this.id = id;
    this.text = text;
    this.helperText = helperText;
    this.authorName = authorName;
    this.categoryId = categoryId;
  }
}
