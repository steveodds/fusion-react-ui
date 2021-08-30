import { Card, CardBody, CardText, Button } from 'reactstrap'
import medal from '@src/assets/images/illustration/badge.svg'
import { useState, useEffect } from 'react'
import { getUserData } from '../../../../fusionapis/get.userdata'

const UserLicense = (token) => {
    const [userData, setUserData] = useState(null)
    const [userLicense, setUserLicense] = useState(null)

    let user = "[User]"
    useEffect(() => {
        getUserData.getUserProfileInfo(token)
            .then(result => setUserData(result))
    }, [])

    useEffect(() => {
        getUserData.getLicense(token)
            .then(result => setUserLicense(result))
    }, [])

    if (userData) {
        user = userData.first_name
    }
    return (
        <Card className='card-congratulations-medal'>
            <CardBody>
                <h5>Hello {user}</h5>
                <CardText className='font-small-3'>Your current license is:</CardText>
                <h3 className='mb-75 mt-2 pt-50'>
                    {/* <a href='/' onClick={e => e.preventDefault()}> */}
                    {userLicense ? userLicense : "Loading license info..."}
                    {/* </a> */}
                </h3>
                {/* <Button.Ripple color='primary'>View Sales</Button.Ripple> */}
                {/* <img className='congratulation-medal' src={medal} alt='Medal Pic' /> */}
            </CardBody>
        </Card>
    )
}

export default UserLicense
