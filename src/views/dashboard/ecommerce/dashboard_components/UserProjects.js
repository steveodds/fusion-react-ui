import classnames from 'classnames'
import Avatar from '@components/avatar'
import { TrendingUp, User, Box, DollarSign, Layers } from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col, Media } from 'reactstrap'
import { useState, useEffect } from 'react'
import { getProjects } from '../../../../fusionapis/get.projects'

const UserProjects = (token) => {
    const [userProjects, setUserProjects] = useState(0)
    const [userDocuments, setUserDocuments] = useState(0)
    // const [userProjects, setUserProjects] = useState(0)
    // const [userProjects, setUserProjects] = useState(0)

    useEffect(() => {
        getProjects.getAllUserProjects(token)
            .then(result => {
                if (result && result.detail) {
                    setUserProjects(0)
                } else if (result) {
                    setUserProjects(Object.keys(result).length)
                }
            })
    }, [])

    const data = [
        {
            title: userProjects,
            subtitle: 'Projects Created',
            color: 'light-primary',
            icon: <Layers size={24} />
        },
        {
            title: userDocuments,
            subtitle: 'Extracted Documents',
            color: 'light-info',
            icon: <User size={24} />
        }//,
        // {
        //     title: '1.423k',
        //     subtitle: 'Products',
        //     color: 'light-danger',
        //     icon: <Box size={24} />
        // },
        // {
        //     title: '$9745',
        //     subtitle: 'Revenue',
        //     color: 'light-success',
        //     icon: <DollarSign size={24} />
        // }
    ]

    const renderData = () => {
        return data.map((item, index) => {
            const margin = Object.keys({ xl: '3', sm: '6' })
            return (
                <Col
                    key={index}
                    {...{ xl: '3', sm: '6' }}
                    className={classnames({
                        [`mb-2 mb-${margin[0]}-0`]: index !== data.length - 1
                    })}
                >
                    <Media>
                        <Avatar color={item.color} icon={item.icon} className='mr-2' />
                        <Media className='my-auto' body>
                            <h4 className='font-weight-bolder mb-0'>{item.title}</h4>
                            <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
                        </Media>
                    </Media>
                </Col>
            )
        })
    }

    return (
        <Card className='card-statistics'>
            <CardHeader>
                <CardTitle tag='h4'>Activity</CardTitle>
            </CardHeader>
            <CardBody className='statistics-body'>
                <Row>{renderData()}</Row>
            </CardBody>
        </Card>
    )
}

export default UserProjects
