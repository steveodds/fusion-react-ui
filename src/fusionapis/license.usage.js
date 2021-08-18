function getLicenseUsage(token) {
    const requestOptions = {
        method: "POST",
        headers: {
            accept: "application/json",
            Authorization: "Bearer ".concat(token)
        }
    }

    return fetch("https://trial.infosight.io/webapi/v1/license/usage/", requestOptions)
        .then(response => response.json())
        .catch(error => console.error(error))
}

function getMonthlyLicenseUsage(token, month) {
    const requestOptions = {
        method: "POST",
        headers: {
            accept: "application/json",
            Authorization: "Bearer ".concat(token)
        }
    }

    return fetch("https://trial.infosight.io/webapi/v1/license/monthlyusage/?Month=".concat(month), requestOptions)
        .then(response => response.json())
}

export const getLicenseData = {
    getLicenseUsage,
    getMonthlyLicenseUsage
}