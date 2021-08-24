import { Doughnut } from 'react-chartjs-2'
import { Monitor, Tablet, ArrowDown, ArrowUp } from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import { useState, useEffect } from 'react'
import { getLicenseData } from '../../../fusionapis/license.usage'
import { csvToObjectConverter } from '../../../fusionapis/csv2obj'

function generatePercentages(countData) {
    let total = 0
    for (const i in countData) {
        total += parseInt(countData[i], 10)
    }
    for (const i in countData) {
        countData[i] = (countData[i] / total * 100).toFixed(2)
    }
    console.log(countData)
    return countData
}

function endpointSum(licenseInfo, endpointInfo, readables) {
    const countData = endpointInfo.reduce(function (obj, itm) {
        if (itm !== undefined) {
            const channel = itm
            obj[channel] = 0

            return obj
        }
    }, {})

    Object.keys(licenseInfo).forEach(function (key) {
        const currEndpoint = licenseInfo[key].Endpoint
        const readableEndpoint = readables[currEndpoint]
        if (countData[readableEndpoint] === 0) {
            countData[readableEndpoint] = licenseInfo[key].Count
        } else {
            countData[readableEndpoint] = +countData[readableEndpoint] + +licenseInfo[key].Count
        }
    })
    return generatePercentages(countData)
}

const LicenseDoghnutChart = ({ tooltipShadow, successColorShade, warningLightColor, primary, token }) => {
    const [licenseData, setLicenseData] = useState(null)

    useEffect(() => {
        getLicenseData.getLicenseUsage(token)
            .then(result => setLicenseData(csvToObjectConverter(result)))
            .catch(error => console.log(error))
    }, [])

    const readableNames = {
        'projects/crud/delete': "CRUD - Projects",
        getTokens: "Documents",
        'templates/crud/create': "CRUD - Templates",
        'templates/crud/update': "CRUD - Templates",
        extractDocument: "Documents",
        'license/monthlyusage': "License",
        'projects/crud/create': "CRUD - Projects",
        'templates/crud/organization/read-templates': "CRUD - Templates",
        'projects/crud/organization/read-all': "CRUD - Projects",
        'projects/crud/read-all': "CRUD - Projects",
        'license/usage': "License",
        'projects/crud/update': "CRUD - Projects",
        readlicence: "License"
    }

    const licenseLabels = licenseData !== null ? licenseData.map(item => readableNames[item.Endpoint])
        .filter((value, index, self) => self.indexOf(value) === index) : []

    const undefLoc = licenseLabels.indexOf(undefined)
    if (undefLoc > -1) {
        licenseLabels.splice(undefLoc, 1)
    }

    const countData = licenseData !== null ? endpointSum(licenseData, licenseLabels, readableNames) : {}

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration: 500,
        // cutoutPercentage: 60,
        legend: { display: false },
        tooltips: {
            callbacks: {
                label(tooltipItem, data) {
                    const label = data.datasets[0].labels[tooltipItem.index] || '',
                        value = data.datasets[0].data[tooltipItem.index]
                    const output = ` ${label} : ${value} %`
                    return output
                }
            },
            // Updated default tooltip UI
            shadowOffsetX: 1,
            shadowOffsetY: 1,
            shadowBlur: 8,
            shadowColor: tooltipShadow,
            backgroundColor: '#fff',
            titleFontColor: '#000',
            bodyFontColor: '#000'
        }
    },
        data = {
            datasets: [
                {
                    labels: [...licenseLabels],
                    data: countData !== null ? Object.entries(countData).map(([a, b]) => b) : [],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgba(75, 192, 192)',
                        'rgb(255, 205, 86)'
                    ],
                    borderWidth: 0,
                    pointStyle: 'rectRounded'
                }
            ]
        }

    return (
        <Card>
            <CardHeader className='d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column'>
                <CardTitle tag='h4'>Usage by Endpoint</CardTitle>
            </CardHeader>
            <CardBody>
                <div style={{ height: '275px' }}>
                    <Doughnut data={data} options={options} height={275} />
                </div>
                <div className='d-flex justify-content-between mt-3 mb-1'>
                    <div className='d-flex align-items-center'>
                        <span className='font-weight-bold ml-75 mr-25'>License</span>
                        <span>- {countData['License']}%</span>
                    </div>
                </div>
                <div className='d-flex justify-content-between mb-1'>
                    <div className='d-flex align-items-center'>
                        <span className='font-weight-bold ml-75 mr-25'>CRUD - Projects</span>
                        <span>- {countData['CRUD - Projects']}%</span>
                    </div>
                </div>
                <div className='d-flex justify-content-between'>
                    <div className='d-flex align-items-center'>
                        <span className='font-weight-bold ml-75 mr-25'>CRUD - Templates</span>
                        <span>- {countData['CRUD - Templates']}%</span>
                    </div>
                </div>
                <div className='d-flex justify-content-between'>
                    <div className='d-flex align-items-center'>
                        <span className='font-weight-bold ml-75 mr-25'>Documents</span>
                        <span>- {countData['Documents']}%</span>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default LicenseDoghnutChart
