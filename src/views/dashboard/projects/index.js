import { useContext } from 'react'
import { Row, Col } from 'reactstrap'

import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import ProjectTable from '../fusion_components/ProjectTable'

const Projects = () => {
  let token = ""
  if (document.cookie) {
    token = document.cookie.split('; ').find(row => row.startsWith('fusion=')).split('=')[1]
  }
  return (
    <div>
      <Row className='match-height'>
        <Col>
          {/* <ProjectsList token={token} /> */}
          <ProjectTable token={token} />
        </Col>
      </Row>
    </div>
  )
}

export default Projects
