import Avatar from '@components/avatar'
import { Table, Card, Button } from 'reactstrap'
import { Monitor, Coffee, Watch, TrendingUp, TrendingDown } from 'react-feather'
import { getProjects } from '../../../fusionapis/get.projects'
import { useState, useEffect } from 'react'

const ProjectTable = (token) => {
  const [version, setVersion] = useState("(Loading version information...)")
  const [projects, setProjects] = useState(
    [
      {
        project_name: "N/A",
        project_description: "N/A",
        project_type: "N/A",
        id: "N/A",
        date_created: "N/A"
      }
    ]
  )
  useEffect(() => {
    getProjects.getVersion()
      .then(result => setVersion(result.version))
  }, [])

  useEffect(() => getProjects.getAllUserProjects(token)
    .then(function (result) {
      if (result !== undefined && result[0].hasOwnProperty('org_id')) {
        setProjects(result)
      } else {
        setProjects(
          [
            {
              project_name: "N/A",
              project_description: "N/A",
              project_type: "N/A",
              id: "N/A",
              date_created: "N/A"
            }
          ]
        )
      }
    }
    ), [])

  const data = projects.map(projectObject => (
    {
      project_name: projectObject.project_name,
      project_description: projectObject.project_description,
      project_type: projectObject.project_type,
      id: projectObject.id,
      date_created: projectObject.date_created
    }
  ))

  const renderData = () => {
    return data.map(col => {
      if (col.hasOwnProperty('id')) {
        return (
          <tr key={col.project_name}>
            <td>
              <div>
                <div className='font-weight-bolder'>{col.project_name}</div>
              </div>
            </td>
            <td>
              <div>
                <span>{col.project_description.trim() === "" ? "No description" : col.project_description}</span>
              </div>
            </td>
            <td className='text-nowrap'>
              <div className='d-flex flex-column'>
                <span className='font-weight-bolder mb-25'>Created on:</span>
                <span className='font-small-2 text-muted'>{col.date_created}</span>
              </div>
            </td>
            <td>
              <div>
                <span className='font-weight-bolder mr-1'>{col.id}</span>
              </div>
            </td>
            <td>
              <div>
                <Button.Ripple outline color='primary' size="sm">
                  View
                </Button.Ripple>
                <Button.Ripple outline color='info' size="sm">
                  Edit
                </Button.Ripple>
                <Button.Ripple outline color='danger' size="sm">
                  Delete
                </Button.Ripple>
              </div>
            </td>
          </tr>
        )
      }
    })
  }

  return (
    <Card className='card-company-table'>
      <div>
        <span className='text-muted px-2 font-small-2'>Current version {version}</span>
      </div>
      <Table responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Created</th>
            <th>ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
      </Table>
    </Card>
  )
}

export default ProjectTable