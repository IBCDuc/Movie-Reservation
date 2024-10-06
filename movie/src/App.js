import DefaultLayout from '~/components/Layout/DefaultLayout/index';
import DefaultLayoutsMovie from './components/Layout/DefaultLayout-Movie';
import DefaultLayoutsSingle from './components/Layout/DefaultLayout-SingleMovie';
import { Route, Routes } from 'react-router-dom';
import DefaultLayoutShowtime from './components/Layout/DeufaultLayout-Showtime';
import { useState } from 'react';

function App() {
    
    return (
        <div>
            <Routes>
                <Route path="/" element={<DefaultLayout/>} />
                <Route path="/movie" element={<DefaultLayoutsMovie/>} />
                <Route path="/single-movie" element={<DefaultLayoutsSingle/>} />
                <Route path="/show-time" element={<DefaultLayoutShowtime/>} />
            </Routes>
        </div>
    );
}

export default App;
