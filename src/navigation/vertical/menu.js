import { Layers, Aperture, Compass, ChevronRight } from 'react-feather'
export default [
    {
        header: 'Menu'
    },
    {
        id: 'dashboard',
        title: 'Dashboard',
        icon: <Compass size={20} />,
        navLink: '/dashboard/ecommerce'
    },
    {
        id: 'projects',
        title: 'Projects',
        icon: <Layers size={20} />,
        navLink: '/maps/leaflet',
        children: [
            {
                id: 'createnew',
                title: 'Create New',
                icon: <ChevronRight size={15} />,
                navLink: '/charts/apex'
            },
            {
                id: 'listprojects',
                title: 'List Projects',
                icon: <ChevronRight size={15} />,
                navLink: '/charts/chartjs'
            }
        ]
    },
    {
        id: 'extract',
        title: 'Extract',
        icon: <Aperture size={20} />,
        navLink: ''
    }
]
