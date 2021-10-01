import classnames from 'classnames'
import Avatar from '@components/avatar'
import { Archive, Box, DollarSign, Layers, Aperture } from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col, Media } from 'reactstrap'
import { useState, useEffect } from 'react'
import { getProjects } from '../../../../fusionapis/get.projects'
import { getLicenseData } from '../../../../fusionapis/license.usage'
import { csvToObjectConverter } from '../../../../fusionapis/csv2obj'

function TotalDocuments(licenseData) {
    let finalData = []
    licenseData.forEach(date => {
        if (finalData.Count && date.Endpoint === 'extractDocument') {
            const countVal = parseInt(finalData.Count)
            finalData.Count = countVal + parseInt(date.Count)
        } else if (date.Endpoint === 'extractDocument') {
            finalData = date
        }
    })

    return finalData.Count
}

function TotalTemplates(licenseData) {
    let finalData = []
    licenseData.forEach(date => {
        if (finalData.Count && date.Endpoint === 'templates/crud/create') {
            const countVal = parseInt(finalData.Count)
            finalData.Count = countVal + parseInt(date.Count)
        } else if (date.Endpoint === 'templates/crud/create') {
            finalData = date
        }
    })

    return finalData.Count
}

const UserProjects = (token) => {
    const [userProjects, setUserProjects] = useState(0)
    const [userDocuments, setUserDocuments] = useState(0)
    const [totalTemplates, setTotalTemplates] = useState(0)
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

    useEffect(() => {
        getLicenseData.getLicenseUsage(token.token)
            .then(result => {
                if (result && result.detail) {
                    setUserDocuments(0)
                } else if (result) {
                    setUserDocuments(TotalDocuments(csvToObjectConverter(result)))
                    setTotalTemplates(TotalTemplates(csvToObjectConverter(result)))
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
            icon: <Aperture size={24} />
        },
        {
            title: userProjects,
            subtitle: 'Active Templates',
            color: 'light-danger',
            icon: <Box size={24} />
        },
        {
            title: totalTemplates,
            subtitle: 'Total Templates Created',
            color: 'light-success',
            icon: <Archive size={24} />
        }
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
