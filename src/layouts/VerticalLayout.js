// !Do not remove the Layout import
import Layout from '@layouts/VerticalLayout'

// import ThemeNavbar from '../views/components/CustomNavbar'
import CustomNavbar from '../views/components/CustomNavbar/Navbar'

// const VerticalLayout = props => <Layout {...props}> {props.children} </Layout>
const VerticalLayout = props => <Layout navbar={props => <CustomNavbar {...props} />} {...props}> {props.children} </Layout>

export default VerticalLayout
