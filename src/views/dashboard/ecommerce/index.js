import { useContext } from 'react'
import { Row, Col } from 'reactstrap'
import CompanyTable from './CompanyTable'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import Earnings from '@src/views/ui-elements/cards/analytics/Earnings'
import CardMedal from '@src/views/ui-elements/cards/advance/CardMedal'
import CardMeetup from '@src/views/ui-elements/cards/advance/CardMeetup'
import StatsCard from '@src/views/ui-elements/cards/statistics/StatsCard'
import GoalOverview from '@src/views/ui-elements/cards/analytics/GoalOverview'
import RevenueReport from '@src/views/ui-elements/cards/analytics/RevenueReport'
import OrdersBarChart from '@src/views/ui-elements/cards/statistics/OrdersBarChart'
import ProfitLineChart from '@src/views/ui-elements/cards/statistics/ProfitLineChart'
import CardTransactions from '@src/views/ui-elements/cards/advance/CardTransactions'
import CardBrowserStates from '@src/views/ui-elements/cards/advance/CardBrowserState'
import { getProjects } from '../../../fusionapis/get.projects'

import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import ProjectTable from '../fusion_components/ProjectTable'
import LicenseChart from '../fusion_components/LicenseChart'
import LicenseDoghnutChart from '../fusion_components/LicenseDoghnutChart'
import UserLicense from './dashboard_components/UserLicense'
import UserProjects from './dashboard_components/UserProjects'

const EcommerceDashboard = () => {
  const { colors } = useContext(ThemeColors),
    trackBgColor = '#e9ecef'

  let token = ""
  if (document.cookie) {
    token = document.cookie.split('; ').find(row => row.startsWith('fusion=')).split('=')[1]
  }
  return (
    <div id='dashboard-ecommerce'>
      <Row className='match-height'>
        <Col xl='4' md='6' xs='12'>
          <UserLicense token={token} />
        </Col>
        <Col xl='8' md='6' xs='12'>
          <UserProjects token={token} />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col lg='8'>
          <LicenseChart token={token} primary={colors.primary.main} warning={colors.warning.main} />
        </Col>
        <Col lg='4'>
          <LicenseDoghnutChart token={token} />
        </Col>
      </Row>
    </div>
  )
}

export default EcommerceDashboard
