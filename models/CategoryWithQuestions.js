export class CategoryWithQuestions {
    id;
    name;
    imageUrl;
    questions;

    constructor(id, name, imageUrl, questions) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.questions = questions;
    }
}