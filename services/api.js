export const fetchCategories = () => {
    const headers = new Headers({
        "X-API-Key": 'aaa'
    });


    return new Promise(resolve => setTimeout(() => fetch(`https://api.czolko.mdrabek.net/api/categories?full=true`, {
        headers
    }).then(res => resolve(res.json())), 3000));
};