import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase('forehead.db');

export const initDb = (reinit = false) => {
    const promise = new Promise((resolve, reject) => {
        database.transaction(tx => {

            if (reinit) {
                tx.executeSql('DROP TABLE IF EXISTS Questions');
                tx.executeSql('DROP TABLE IF EXISTS Categories');
            }

            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS Categories (
                    id INTEGER PRIMARY KEY NOT NULL,
                    name TEXT NOT NULL,
                    imageUrl TEXT NOT NULL
                )`
            );
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS Questions (
                    id INTEGER PRIMARY KEY NOT NULL,
                    text TEXT NOT NULL,
                    helperText TEXT NULL,
                    authorName TEXT NOT NULL,
                    categoryId INTEGER NOT NULL,
                    FOREIGN KEY (categoryId) REFERENCES Categories (id)
                )`
            );
        },
        (_, error) => {
            reject(error);
        },
        () => {
            resolve();
        }
        )
    });
    return promise;
}

export const insertCategory = (category) => {
    const isIdProvided = Boolean(category.id);
    const query = isIdProvided
        ? 'INSERT INTO Categories (id, name, imageUrl) VALUES (?, ?, ?)'
        : 'INSERT INTO Categories (name, imageUrl) VALUES (?, ?)';
    const args = isIdProvided
        ? [category.id, category.name, category.imageUrl]
        : [category.name, category.imageUrl];

    const promise = new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(
                query,
                args,
                (_, result) => {
                    category.id ??= result.insertId;
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
}

export const fetchCategories = () => {
    const promise = new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM Categories',
                [],
                (_, result) => {
                    const categories = result.rows._array.map(result => {
                        return new Category(result.id, result.name, result.imageUrl);
                    });
                    resolve(categories);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
}

export const insertQuestion = (question) => {
    const isIdProvided = Boolean(question.id);
    const query = isIdProvided
        ? 'INSERT INTO Questions (id, text, helperText, authorName, categoryId) VALUES (?, ?, ?, ?, ?)'
        : 'INSERT INTO Questions (text, helperText, authorName, categoryId) VALUES (?, ?, ?, ?)';
    const args = isIdProvided
        ? [question.id, question.text, question.helperText, question.authorName, question.categoryId]
        : [question.text, question.helperText, question.authorName, question.categoryId];

    const promise = new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(
                query,
                args,
                (_, result) => {
                    question.id ??= result.insertId;
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
}

export const fetchQuestions = (categoryId) => {
    const promise = new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM Questions WHERE categoryId = ?',
                [categoryId],
                (_, result) => {
                    const questions = result.rows._array.map(result => {
                        return new Question(result.id, result.text, result.helperText, result.authorName, result.categoryId);
                    });
                    resolve(questions);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
}