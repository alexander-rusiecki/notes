import { useState, useEffect } from 'react';
import axios from 'axios';
import HourglassTopTwoToneIcon from '@mui/icons-material/HourglassTopTwoTone';
import '../styles/Dashboard.css';

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllNotes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        'http://localhost:4000/api/v1/dashboard',
        {
          withCredentials: true,
        }
      );
      setNotes(response.data);
      setIsLoading(false);
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
