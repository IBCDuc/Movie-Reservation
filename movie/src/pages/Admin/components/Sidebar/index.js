import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MovieAdd from '../MovieAdd';
import MovieManagement from '../MovieManagement';
import User from '../User';
import Dashboard from '../Dashboard';
import UserAdd from '../UserAdd';

import DashboardIcon from '@mui/icons-material/Dashboard';
import MovieIcon from '@mui/icons-material/Movie';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import TheatersIcon from '@mui/icons-material/Theaters';
import AssessmentIcon from '@mui/icons-material/Assessment';
import GroupIcon from '@mui/icons-material/Group';
import SummarizeIcon from '@mui/icons-material/Summarize';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

import { PageContainer } from '@toolpad/core/PageContainer';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';


const NAVIGATION = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'movies',
        title: 'Movies',
        icon: <MovieIcon />,
        children: [
            {
                segment: 'add-movies',
                title: 'Add Movies',
                icon: <NoteAddIcon />,
            },
            {
                segment: 'up-movies',
                title: 'Update Delete Movies',
                icon: <NoteAddIcon />,
            },
        ],
    },
    {
        segment: 'showtimes',
        title: 'Showtimes',
        icon: <TheatersIcon />,
    },
    {
        segment: 'reservations',
        title: 'Reservation',
        icon: <EventSeatIcon />,
    },
    {
        segment: 'users',
        title: 'Users',
        icon: <GroupIcon />,
        children: [
            {
                segment: 'up-users',
                title: 'Users',
                icon: <GroupRemoveIcon />,
            },
            {
                segment: 'add-users',
                title: 'Add Users',
                icon: <GroupAddIcon />,
            },
        ],
    },

    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Analytics',
    },
    {
        segment: 'reports',
        title: 'Reports',
        icon: <AssessmentIcon />,
        children: [
            {
                segment: 'movies report',
                title: 'Movie Reports',
                icon: <SummarizeIcon />,
            },
        ],
    },
];

const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function DemoPageContent({ pathname }) {
    const router = useDemoRouter([
        '/dashboard',
        '/movies',
        '/movies/add-movies',
        '/movies/up-movies',
        '/showtimes',
        '/reservations',
        '/users',
        '/users/up-users',
        '/users/add-users',
        '/reports',
    ]);

    return (
        <AppProvider router={router}>
            <Box

            >
                {pathname === '/dashboard' && <Dashboard />}
                {pathname === '/movies/add-movies' && <MovieAdd />}
                {pathname === '/movies/up-movies' && <MovieManagement />}
                {pathname === '/showtimes' && <Typography variant="h4">Showtimes</Typography>}
                {pathname === '/reservations' && <Typography variant="h4">Reservations</Typography>}
                {pathname === '/users' && <Typography variant="h4">Users</Typography>}
                {pathname === '/users/up-users' && <User/>}
                {pathname === '/users/add-users' && <UserAdd />}
                {pathname === '/reports' && <Typography variant="h4">Reports</Typography>}
            </Box>
        </AppProvider>
    );
}

DemoPageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBranding(props) {
    const { window } = props;

    const router = useDemoRouter('/dashboard');

    // Remove this const when copying and pasting into your project.
    const demoWindow = window !== undefined ? window() : undefined;

    return (
        // preview-start
        <AppProvider
            navigation={NAVIGATION}
            branding={{
                logo: (
                    <img
                        src="https://i.imghippo.com/files/3kZdx1729340017.png"
                        style={{ width: '130px', height: '35px', marginTop: '5px' }}
                        alt="TkMovie logo"
                    />
                ),
                title: '',
            }}
            router={router}
            theme={demoTheme}
            window={demoWindow}
        >
            <DashboardLayout>
                <DemoPageContent pathname={router.pathname} />
            </DashboardLayout>
        </AppProvider>
        // preview-end
    );
}

DashboardLayoutBranding.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window: PropTypes.func,
};

export default DashboardLayoutBranding;
