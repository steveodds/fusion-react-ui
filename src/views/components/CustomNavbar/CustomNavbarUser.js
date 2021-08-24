// ** Dropdowns Imports
// import IntlDropdown from '@layouts/components/navbar/IntlDropdown'
import CartDropdown from '@layouts/components/navbar/CartDropdown'
import UserDropdown from './CustomUserDropDown'
import NavbarSearch from '@layouts/components/navbar/NavbarSearch'
import NotificationDropdown from '@layouts/components/navbar/NotificationDropdown'

// ** Third Party Components
import { Sun, Moon } from 'react-feather'
import { NavItem, NavLink } from 'reactstrap'

const NavbarUser = props => {

  return (
    <ul className='nav navbar-nav align-items-center ml-auto'>
      <UserDropdown />
    </ul>
  )
}
export default NavbarUser
