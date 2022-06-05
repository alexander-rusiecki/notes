import { useState, useEffect } from 'react';
import axios from 'axios';
import HourglassTopTwoToneIcon from '@mui/icons-material/HourglassTopTwoTone';
import '../styles/Dashboard.css';

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const getAllNotes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        'http://localhost:4000/api/v1/dashboard',
        {
          withCredentials: true,
        }
      );
      if (response.data.msg?.error_type === 'session_not_found') {
        setAuthenticated(false);
        setIsLoading(false);
      } else {
        setAuthenticated(true);
        setIsLoading(false);
        setNotes(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <HourglassTopTwoToneIcon />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="loading">
        <h1>You are not authorized</h1>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      {notes &&
        notes.map(note => (
          <div key={note.id}>
            <h3>{note.text}</h3>
          </div>
        ))}
    </div>
  );
}

export default Dashboard;
