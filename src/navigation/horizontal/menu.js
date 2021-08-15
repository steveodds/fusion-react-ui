import { Layers, Aperture, Compass, ChevronRight } from 'react-feather'
export default [
    {
        header: 'Menu'
    },
    {
        id: 'dashboard',
        title: 'Dashboard',
        icon: <Compass />,
        navLink: '/dashboard/ecommerce'
    },
    {
        id: 'projects',
        title: 'Projects',
        icon: <Layers />,
        navLink: '/maps/leaflet',
        children: [
            {
                id: 'createnew',
                title: 'Create New',
                icon: <ChevronRight />,
                navLink: '/charts/apex'
            },
            {
                id: 'listprojects',
                title: 'List Projects',
                icon: <ChevronRight />,
                navLink: '/charts/chartjs'
            }
        ]
    },
    {
        id: 'extract',
        title: 'Extract',
        icon: <Aperture />,
        navLink: ''
    }
]
