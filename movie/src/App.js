import DefaultLayout from '~/components/Layout/DefaultLayout/index';
import DefaultLayoutsMovie from './components/Layout/DefaultLayout-Movie';
import DefaultLayoutsSingle from './components/Layout/DefaultLayout-SingleMovie';
import DefaultLayoutsAdmin from './components/Layout/DefaultLayout-Admin';
import { Route, Routes } from 'react-router-dom';
import DefaultLayoutShowtime from './components/Layout/DeufaultLayout-Showtime';
import { useState } from 'react';

import Home from './pages/Home';
import Movie from './pages/Movie';
import SingleMovie from './pages/SingleMovie';
import Showtime from './pages/Showtime';
import Admin from './pages/Admin';
import MovieAdd from './pages/Admin/components/MovieAdd';
import DashboardLayoutBasic from './pages/Admin/components/Sidebar';
import SignupForm from './TestFomik';
function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route path="" element={<Home />} />
                    <Route path="/movie" element={<Movie />} />
                    <Route path="/single-movie/:id" element={<SingleMovie />} />
                </Route>

                <Route path="/admin">
                    <Route path="" element={<DashboardLayoutBasic />} />
                    <Route path="movies" element={<DashboardLayoutBasic />} />
                </Route>

                <Route path="/show-time" element={<Showtime/>} />
            </Routes>
            ;
        </div>
    );
}

export default App;
