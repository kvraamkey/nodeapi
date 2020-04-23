export const to = (promise) => {
    return promise
        .then(data => [undefined, data])
        .catch(err => [err]);
}
