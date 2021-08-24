// ** Dropdowns Imports
// import IntlDropdown from '@layouts/components/navbar/IntlDropdown'
import CartDropdown from '@layouts/components/navbar/CartDropdown'
import UserDropdown from '@layouts/components/navbar/UserDropdown'
import NavbarSearch from '@layouts/components/navbar/NavbarSearch'
import NotificationDropdown from '@layouts/components/navbar/NotificationDropdown'

// ** Third Party Components
import { Sun, Moon } from 'react-feather'
import { NavItem, NavLink } from 'reactstrap'

const NavbarUser = props => {
  // ** Props
  const { skin, setSkin } = props

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />
    }
  }

  return (
    <ul className='nav navbar-nav align-items-center ml-auto'>
      {/* <IntlDropdown /> */}
      <NavItem className='d-none d-lg-block'>
        <NavLink className='nav-link-style'>
          <ThemeToggler />
        </NavLink>
      </NavItem>
      <NavbarSearch />
      <CartDropdown />
      <NotificationDropdown />
      <UserDropdown />
    </ul>
  )
}
export default NavbarUser
