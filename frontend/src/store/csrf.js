import Cookies from 'js-cookie';

export async function csrfFetch(url, options = {}) {
    // set options.method to 'GET' if there is no method
    options.method = options.method || 'GET';

    console.log('hit first csrf fetch', options)
    if (options.method.toUpperCase() !== "GET") {
        console.log('hit second csrf fetch')
        if (options.headers["Content-Type"] === "multipart/form-data") {
            console.log('hit third csrf fetch')
            delete options.headers["Content-Type"];
        } else {
            console.log('hit fourth csrf fetch')
            options.headers["Content-Type"] =
                options.headers["Content-Type"] || "application/json";
        }
        console.log('hit fifth csrf fetch')
        options.headers["XSRF-Token"] = Cookies.get("XSRF-TOKEN");
        console.log('hit after fifth')
    }

    // if the options.method is not 'GET', then set the "Content-Type" header to
    // "application/json", and set the "XSRF-TOKEN" header to the value of the 
    // "XSRF-TOKEN" cookie
    if (options.method.toUpperCase() !== 'GET') {
        console.log('hit sixth csrf fetch')
        options.headers['Content-Type'] =
            options.headers['Content-Type'] || 'application/json';
        console.log('hit seventh csrf fetch')
        options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
    }
    console.log('hit eigth csrf fetch')
    // call the default window's fetch with the url and the options passed in
    const res = await window.fetch(url, options);

    console.log('RES IN CSRF: ', res)

    // if the response status code is 400 or above, then throw an error with the
    // error being the response
    if (res.status >= 400) throw res;

    // if the response status code is under 400, then return the response to the
    // next promise chain
    return res;
}

// call this to get the "XSRF-TOKEN" cookie, should only be used in development
export function restoreCSRF() {
    return csrfFetch('/api/csrf/restore');
}