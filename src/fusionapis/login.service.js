function userlogin(username, password) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            username,
            password
        })
    }

    return fetch('https://trial.infosight.io/webapi/login', requestOptions)
        .then(repsonse => repsonse.json())
        .then(response => { console.log(response) })
}

export const loginService = {
    userlogin
}
