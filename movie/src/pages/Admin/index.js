import './admin.css';
import Dashboard from './components/Dashboard';
import MovieAdd from './components/MovieAdd';
import MovieManagement from './components/MovieManagement';
import Reports from './components/Report';
import ReservationManagement from './components/ReservationManagement';
import ShowtimeManagement from './components/ShowtimeManagement';
import User from './components/User';
function Admin() {
    return (
        <div class="container">
            <aside class="sidebar">
                <div class="logo">
                    <h2>Dashboard</h2>
                </div>
                <ul class="nav">
                    <li>
                        <a href="#dashboard">Dashboard</a>
                    </li>
                    <li>
                        <a href="/admin/movies">Movies</a>
                    </li>
                    <li>
                        <a href="#showtimes">Showtimes</a>
                    </li>
                    <li>
                        <a href="#reservations">Reservations</a>
                    </li>
                    <li>
                        <a href="#users">Users</a>
                    </li>
                    <li>
                        <a href="#reports">Reports</a>
                    </li>
                </ul>
            </aside>
            <div className="block">
              <Dashboard />
            </div>
        </div>
    );
}

export default Admin;
