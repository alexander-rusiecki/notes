import { useState, useEffect } from 'react';
import axios from 'axios';
import HourglassTopTwoToneIcon from '@mui/icons-material/HourglassTopTwoTone';
import '../styles/Dashboard.css';
import Note from '../components/Note';

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:4000/api/v1/notes',
        { title, body },
        { withCredentials: true }
      );
      setNotes([
        ...notes,
        { title: response.data.title, body: response.data.body },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllNotes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:4000/api/v1/notes', {
        withCredentials: true,
      });
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
      <div className="notes-container">
        {notes &&
          notes.map(note => (
            <div key={note.id}>
              <Note {...note} />
            </div>
          ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="body"
          onChange={e => setBody(e.target.value)}
        />
        <button>Add note</button>
      </form>
    </div>
  );
}

export default Dashboard;
