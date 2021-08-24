// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import CustomNavbarUser from './CustomNavbarUser'
import NavbarBookmarks from '@layouts/components/navbar/NavbarBookmarks'

const ThemeNavbar = props => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props

  return (
    <Fragment>
      <div className='bookmark-wrapper d-flex align-items-center'>
        <NavbarBookmarks setMenuVisibility={setMenuVisibility} />
      </div>
      <CustomNavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  )
}

export default ThemeNavbar
