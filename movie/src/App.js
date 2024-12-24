import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import DefaultLayout from '~/components/Layout/DefaultLayout';
import DefaultLayoutsMovie from './components/Layout/DefaultLayout-Movie';
import DefaultLayoutsSingle from './components/Layout/DefaultLayout-SingleMovie';
import DefaultLayoutsAdmin from './components/Layout/DefaultLayout-Admin';
import DefaultLayoutShowtime from './components/Layout/DeufaultLayout-Showtime';

import Header from './components/Layout/components/Header/header';
import Home from './pages/Home';
import Movie from './pages/Movie';
import SingleMovie from './pages/SingleMovie';
import Showtime from './pages/Showtime';
import Admin from './pages/Admin';
import MovieAdd from './pages/Admin/components/MovieAdd';
import DashboardLayoutBasic from './pages/Admin/components/Sidebar';
import LayoutAdmin from './pages/Adminv2/PageLayout';
import TableCustomer from './pages/Adminv2/Customer/TableCustomer';
import TableMovie from './pages/Adminv2/Movies/TableMovie';
import TableShowtimeDate from './pages/Adminv2/ShowtimeDate/TableDate';
import TableHour from './pages/Adminv2/ShowtimeHour/TableHour';
import TableCinemal from './pages/Adminv2/Cinema/TableDate'
import TableSeat from './pages/Adminv2/Seat/TableMovie'

import { AnimatePresence } from 'framer-motion';
import HistoryLayout from './pages/History/HistoryLayout';
import HistoriesList from './pages/History/HistoryList';
import HistoryPage from './components/Layout/components/history/index';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import UpdateInfo from './pages/InfoUser/UpdateProfile';
import LoginForAdmin from './pages/LoginAdmin';
import NotFound from './pages/NotFound';
import ProtectedRoute from './pages/ProtectedRouter';
import ProtectedRouteUser from './pages/ProtectedRouter/user';
import TableOrder from './pages/Adminv2/Reservation/TableOrder';
import DashBoard from './pages/Adminv2/DashBoard/DashBoard';
import Report from './pages/Adminv2/Report/Report';
const Layout = ({ children }) => (
  <div>
    <DefaultLayout />
  </div>
);

const router = createBrowserRouter([

  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },

      {
        path: 'movie',
        element: <Movie />,
      },

      {
        path: 'single-movie/:id',
        element: <SingleMovie />,
      },

    ],
  },

  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <LayoutAdmin />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      
      {
        index: true,
        element: <DashBoard />,
      },

      {
        path: 'movies',
        element: <TableMovie />,
      },

      {
        path: 'cinema',
        element: <TableCinemal />,
      },
      {
        path: 'seat',
        element: <TableSeat />,
      },

      {
        path: 'customer',
        element: <TableCustomer />,
      },
      {
        path: 'date',
        element: <TableShowtimeDate />
      },
      {
        path: 'hour',
        element: <TableHour />
      },
      {
        path: 'reservation',
        element: <TableOrder />
      },
      {
        path: 'report',
        element: <Report />
      },


    ],
  },

  {
    path: '/show-time',
    element: <DefaultLayoutShowtime />,
    errorElement: <NotFound />,
    children: [

      {
        index: true,
        element: <Showtime />,
      },

    ],
  },
  {
    path: "/personal",
    
    element: (
      <ProtectedRouteUser>
        <HistoryLayout/>
      </ProtectedRouteUser>),
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HistoriesList/> },
      {
        path: "history",
        element: <HistoriesList />,
      },
      {
        path: "history/:id",
        element: <HistoryPage />,
      },
      {
        path: "profile",
        element: <UpdateInfo />,
      },
      // {
      //   path: "change-pass",
      //   element: <UpdatePass />,
      // }, 
      
    ],
  },

  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/loginAdmin",
    element: <LoginForAdmin />,
  },

  {
    path: "/register",
    element: <RegisterPage />,
  },

]);

export default function App() {
  
    return <RouterProvider router={router} />;
 
}
