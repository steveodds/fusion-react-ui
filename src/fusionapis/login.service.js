async function userlogin(username, password) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            username,
            password
        })
    }

    const response = await fetch('https://trial.infosight.io/webapi/login', requestOptions)
    if (response.status !== 200) {
        return { result: false }
    }
    const content = await response.json()
    content.result = true
    return content
}

export const loginService = {
    userlogin
}
