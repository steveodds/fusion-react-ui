// ** Dropdowns Imports
import CustomUserDropDown from './CustomUserDropDown'

// ** Third Party Components
import { Sun, Moon } from 'react-feather'
import { NavItem, NavLink } from 'reactstrap'

const NavbarUser = props => {
  // ** Props
  const { skin, setSkin } = props

  return (
    <ul className='nav navbar-nav align-items-center ml-auto'>
      <CustomUserDropDown />
    </ul>
  )
}
export default NavbarUser
