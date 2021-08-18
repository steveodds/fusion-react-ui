// !Do not remove the Layout import
import Layout from '@layouts/VerticalLayout'

// import ThemeNavbar from '../views/components/CustomNavbar'
import NavbarComponent from '../views/components/CustomNavbar'

const VerticalLayout = props => <Layout navbar={props => <NavbarComponent {...props} />} {...props}> {props.children} </Layout>

export default VerticalLayout
