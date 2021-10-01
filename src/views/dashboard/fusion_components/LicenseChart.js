import { useEffect, useState } from 'react'
import { getLicenseData } from '../../../fusionapis/license.usage'
import { csvToObjectConverter } from '../../../fusionapis/csv2obj'
import { Bar } from 'react-chartjs-2'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import Flatpickr from 'react-flatpickr'
import { Calendar } from 'react-feather'

function MergeByDate(licenseData) {
    const dates = [...new Set(licenseData.map(a => a.Date))]
    dates.sort(function (a, b) {
        a = a.split('/').reverse().join('')
        b = b.split('/').reverse().join('')
        return a > b ? 1 : a < b ? -1 : 0
    })
    const finalData = {}
    licenseData.forEach(date => {
        if (!finalData[date.Date]) {
            finalData[date.Date] = []
        }
        finalData[date.Date].push(date)
    })

    return { dates: { ...dates }, final_data: { ...finalData } }
}

const LicenseChart = ({ tooltipShadow, gridLineColor, labelColor, successColorShade, token }) => {
    const [licenseData, setLicenseData] = useState(null)
    const [activeData, setActiveData] = useState(null)
    const [activeDate, setActiveDate] = useState(null)
    const [dates, setDates] = useState(null)
    const [processedData, setProcessedData] = useState(null)

    useEffect(() => {
        getLicenseData.getLicenseUsage(token)
            .then(result => {
                setLicenseData(csvToObjectConverter(result))
                const finalData = MergeByDate(csvToObjectConverter(result))
                setProcessedData(finalData.final_data)
                setDates(finalData.dates)
                setActiveDate(finalData.dates[0])
                setActiveData(finalData.final_data[finalData.dates[0]])
            })
            .catch(error => console.log(error))
    }, [])

    console.log(licenseData)
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
        readlicence: "License Reads",
        undefined: "Others"
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
                        max: activeData ? Math.max(...activeData.map(o => o.Count)) : 100,
                        fontColor: labelColor
                    }
                }
            ]
        }
    },
        data = {
            labels: activeData !== null ? activeData.map(license => readableNames[license.Endpoint]) : [],
            datasets: [
                {
                    data: activeData !== null ? activeData.map(license => license.Count) : [],
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
                    // borderColor: 'transparent',
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
                <div className='d-flex align-items-center'>
                    <Calendar size={14} />
                    <Flatpickr
                        options={{
                            mode: 'single',
                            dateFormat: 'Y-m-d',
                            enable: dates ? Object.values(dates) : ['2021-01-01', '2021-01-02']
                        }}
                        className='form-control flat-picker bg-transparent border-0 shadow-none'
                        value={activeDate ? activeDate : 'today'}
                        onChange={([date]) => {
                            const newDate = date.toISOString().slice(0, 10)
                            setActiveDate(newDate)
                            console.log(processedData)
                            console.log(processedData[newDate])
                            setActiveData(processedData[newDate] ? processedData[newDate] : null)
                        }}
                    />
                </div>
            </CardHeader>
            <CardBody>
                <div style={{ height: '400px' }}>
                    <Bar data={data} options={options} height={400} />
                </div>
            </CardBody>
        </Card >
    )
}

export default LicenseChart
