import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <header>
      <nav>
        <ul>
          <div>
            <li>
              <Link to="/">
                <HomeIcon />
              </Link>
            </li>
          </div>
          <div className="links">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
