// !Do not remove the Layout import
import Layout from '@layouts/VerticalLayout'

import ThemeNavbar from '../views/components/CustomNavbar'
import CustomFooter from '../views/components/CustomFooter/Footer'
// import CustomNavbar from '../views/components/CustomNavbar/Navbar'

// const VerticalLayout = props => <Layout {...props}> {props.children} </Layout>
const VerticalLayout = props => <Layout navbar={<ThemeNavbar />} footer={<CustomFooter />} {...props}> {props.children} </Layout>

export default VerticalLayout
