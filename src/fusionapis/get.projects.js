function getAllUserProjects(token) {
  const requestOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer ".concat(token.token)
    }
  }

  return fetch("https://trial.infosight.io/webapi/v1/projects/crud/read-all", requestOptions)
    .then(response => response.json())
    .catch(error => console.error(error))
}

function getVersion() {
  const requestOptions = {
    method: "GET",
    headers: {
      accept: "application/json"
    }
  }

  return fetch("https://trial.infosight.io/webapi/version", requestOptions)
    .then(response => response.json())
}

export const getProjects = {
  getAllUserProjects,
  getVersion
}