function getUserProfileInfo(token) {
    const requestOptions = {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: "Bearer ".concat(token.token)
      }
    }
  
    return fetch("https://trial.infosight.io/webapi/current-user", requestOptions)
      .then(response => response.json())
      .catch(error => console.error(error))
  }
  
  function getLicense(token) {
    const requestOptions = {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: "Bearer ".concat(token.token)
      }
    }
  
    return fetch("https://trial.infosight.io/webapi/v1/readlicence/", requestOptions)
      .then(response => response.json())
  }
  
  export const getUserData = {
    getUserProfileInfo,
    getLicense
  }