// ** Custom Components
import NavbarUser from './CustomNavbarUser'

const ThemeNavbar = props => {
  // ** Props
  const { skin, setSkin } = props

  return (
    <NavbarUser skin={skin} setSkin={setSkin} />
    // <h6>I am in navbar, Everything else is removed</h6>
  )
}

export default ThemeNavbar
