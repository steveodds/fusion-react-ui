function getAllUserProjects(token) {
  const requestOptions = {
    method: "GET",
    headers: {
      accept: "application/json"
    }
  }

  return fetch("https://trial.infosight.io/webapi/version", requestOptions)
    .then(response => response.json())
}

function getVersion(token) {
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