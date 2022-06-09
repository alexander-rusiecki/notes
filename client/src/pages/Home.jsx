import { Link } from 'react-router-dom';
import 'styles/home.css';

function Home() {
  return (
    <main className="home-container">
      <h2>
        Add a note? Go to <Link to="/notes">dashboard</Link> 🤙🏼
      </h2>
    </main>
  );
}

export default Home;
