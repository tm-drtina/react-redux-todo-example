import superagent from 'superagent';

export function dataLoadFailedCallback(errorCallback) {
    return (err) => {
        if (err.response) {
            if (err.response.body) {
                errorCallback(`AIS_${err.response.body.errId || (`HTTP_${err.status || -1}`)}`, String(err.response.body.message || err.response.text));
            } else {
                errorCallback(`AIS_HTTP_${err.status || -1}`, String(err.response.text));
            }
        } else {
            errorCallback(`HTTP_${err.status || -1}`, String(err));
        }
    };
}

export function fetchData(httpMethod, url, data = null) {
    const request = superagent(httpMethod, url);
    request.type('application/json');
    request.send(data);
    return new Promise((resolve, reject) => {
        request.end((error, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(response.body);
            }
        });
    });
}
