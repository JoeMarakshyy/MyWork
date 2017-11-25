get (url) {
    return this.httpClient.fetch(url)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            return error;
        });


post(content, url) {
    return this.httpClient
        .fetch(url, {
            method: 'post',
            body: json(content)
        })
        .then(response => response.json())
        .then(object => {
            return object;
        })
        .catch(error => {
            return error;
        });
}
