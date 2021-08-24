async function userRegistration(firstname, lastname, email, password, organisation_id) {

    const requestOptions = {
        method: 'POST',
        headers: { 
            'accept':'application/json',
            'Content-Type': 'application/x-www-form-urlencoded' 
        },
        body: new URLSearchParams({
            firstname,
            lastname,
            email,
            password,
            organisation_id
        })
    }

    const response = await fetch('https://trial.infosight.io/webapi/v1/createUser/?role=Basic%20User', requestOptions)
    if (response.status !== 200) {
        return { result: false }
    }
    const content = await response.json()
    content.result = true
    return content
}

export const registerService = {
    userRegistration
}
