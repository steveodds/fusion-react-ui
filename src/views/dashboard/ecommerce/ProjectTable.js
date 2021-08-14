import Avatar from '@components/avatar'
import { Table, Card } from 'reactstrap'
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
  // const token = props.match.params.token
  useEffect(() => {
    getProjects.getVersion()
      .then(result => setVersion(result.version))
  }, [])

  useEffect(() => getProjects.getAllUserProjects(token)
    .then(result => setProjects(result)), [])

  let colorsArr = {}
  const tempArray = projects.map(projectObject => (
    {
      project_name: projectObject.project_name,
      project_description: projectObject.project_description,
      project_type: projectObject.project_type,
      id: projectObject.id,
      date_created: projectObject.date_created
    }
  ))
  const data = [
    ...tempArray,
    colorsArr = {
      DOC: 'light-primary',
      OCR: 'light-success',
      CHAT: 'light-warning'
    }
  ]

  const renderData = () => {
    return data.map(col => {
      const IconTag = Math.random() < 0.5 ? (
        <TrendingUp size={15} className='text-success' />
      ) : (
        <TrendingDown size={15} className='text-danger' />
      )

      if (col.hasOwnProperty('id')) {
        return (
          <tr key={col.project_name}>
            <td>
              <div className='d-flex align-items-center'>
                <div className='avatar rounded'>
                  <div className='avatar-content'>
                    <img src={col.img} alt={col.name} />
                  </div>
                </div>
                <div>
                  <div className='font-weight-bolder'>{col.project_name}</div>
                  <div className='font-small-2 text-muted'>FusionAdmin@gmail.com</div>
                </div>
              </div>
            </td>
            <td>
              <div className='d-flex align-items-center'>
                <Avatar className='mr-1' color={colorsArr[col.project_type]} icon={col.icon} />
                <span>{col.project_description}</span>
              </div>
            </td>
            <td className='text-nowrap'>
              <div className='d-flex flex-column'>
                <span className='font-weight-bolder mb-25'>Created on:</span>
                <span className='font-small-2 text-muted'>{col.date_created}</span>
              </div>
            </td>
            {/* <td>{col.revenue}</td> */}
            <td>
              <div className='d-flex align-items-center'>
                <span className='font-weight-bolder mr-1'>{col.id}%</span>
                {IconTag}
              </div>
            </td>
          </tr>
        )
      }
    })
  }

  return (
    <Card className='card-company-table'>
      <Table responsive>
        <thead>
          <div>
            Current version {version}
          </div>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Created</th>
            {/* <th>Date</th> */}
            <th>ID</th>
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
      </Table>
    </Card>
  )
}

export default ProjectTable