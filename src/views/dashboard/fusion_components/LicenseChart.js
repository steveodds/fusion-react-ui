import { useEffect, useState } from 'react'
import { getLicenseData } from '../../../fusionapis/license.usage'
import { csvToObjectConverter } from '../../../fusionapis/csv2obj'
import { Bar } from 'react-chartjs-2'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

const LicenseChart = ({ tooltipShadow, gridLineColor, labelColor, successColorShade, token }) => {
    const [licenseData, setLicenseData] = useState(null)

    useEffect(() => {
        getLicenseData.getLicenseUsage(token)
            .then(result => setLicenseData(csvToObjectConverter(result)))
            .catch(error => console.log(error))
    }, [])

    const readableNames = {
        'projects/crud/delete': "Deleted Projects",
        getTokens: "Tokens",
        'templates/crud/create': "Created Templates",
        'templates/crud/update': "Updated Templates",
        extractDocument: "Document Extraction",
        'license/monthlyusage': "License: Monthly",
        'projects/crud/create': "Created Projects",
        'templates/crud/organization/read-templates': "Read Templates",
        'projects/crud/organization/read-all': "Read Projects (Org)",
        'projects/crud/read-all': "Read Projects",
        'license/usage': "License",
        'projects/crud/update': "Updated Projects",
        readlicence: "License Reads"
    }
    const options = {
        elements: {
            rectangle: {
                borderWidth: 3,
                borderSkipped: 'bottom'
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration: 500,
        legend: {
            display: false
        },
        tooltips: {
            // Updated default tooltip UI
            shadowOffsetX: 1,
            shadowOffsetY: 1,
            shadowBlur: 8,
            shadowColor: tooltipShadow,
            backgroundColor: '#fff',
            titleFontColor: '#000',
            bodyFontColor: '#000'
        },
        scales: {
            xAxes: [
                {
                    display: true,
                    gridLines: {
                        display: false,
                        color: gridLineColor,
                        zeroLineColor: gridLineColor
                    },
                    scaleLabel: {
                        display: false
                    },
                    ticks: {
                        fontColor: labelColor
                    }
                }
            ],
            yAxes: [
                {
                    display: true,
                    gridLines: {
                        color: gridLineColor,
                        zeroLineColor: gridLineColor
                    },
                    ticks: {
                        stepSize: 10,
                        min: 0,
                        max: licenseData !== null ? Math.max(...licenseData.map(o => o.Count)) : 100,
                        fontColor: labelColor
                    }
                }
            ]
        }
    },
        data = {
            labels: licenseData !== null ? licenseData.map(license => readableNames[license.Endpoint]) : [],
            datasets: [
                {
                    data: licenseData !== null ? licenseData.map(license => license.Count) : [],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: 'transparent',
                    barThickness: 35,
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)',
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)'
                      ]
                }
            ]
        }

    return (
        <Card>
            <CardHeader className='d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column'>
                <CardTitle tag='h4'>License Usage</CardTitle>
            </CardHeader>
            <CardBody>
                <div style={{ height: '500px' }}>
                    <Bar data={data} options={options} height={400} />
                </div>
            </CardBody>
        </Card>
    )
}

export default LicenseChart
