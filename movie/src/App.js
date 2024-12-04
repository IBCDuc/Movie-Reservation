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

const Layout = ({ children }) => (
  <div>
    <DefaultLayout />
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
    element: <DefaultLayoutsAdmin />,
    children: [
      {
        index: true,
        element: <DashboardLayoutBasic />,
      },
      {
        path: 'movies',
        element: <MovieAdd />,
      },
    ],
  },
  {
    path: '/show-time',
    element: <DefaultLayoutShowtime />,
    children: [
      {
        index: true,
        element: <Showtime />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
