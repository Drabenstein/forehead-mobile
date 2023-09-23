export const fetchCategories = () => {
    const headers = new Headers({
        "X-API-Key": 'aaa'
    });


    return new Promise(resolve => setTimeout(() => fetch(`https://api.czolko.mdrabek.net/api/categories`, {
        headers
    }).then(res => resolve(res.json())), 3000));
};

export const fetchQuestionsForCategory = (categoryId) => {
    const headers = new Headers({
        "X-API-Key": 'aaa'
    });

    return fetch(`https://api.czolko.mdrabek.net/api/categories/${categoryId}/questions`, {
        headers
    }).then(res => res.json());
};