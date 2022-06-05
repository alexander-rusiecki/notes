import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HomeIcon from '@mui/icons-material/Home';
import '../styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await axios.delete('http://localhost:4000/api/v1/auth/logout', {
        withCredentials: true,
      });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
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
            <li onClick={logout} className="grey-li">
              Logout
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
