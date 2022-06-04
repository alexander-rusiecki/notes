import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [notes, setNotes] = useState([]);
  // const [user, setUser] = useState(null);
  const getAllNotes = async () => {
    try {
      const response = await axios.get('http://localhost:4000/dashboard', {
        withCredentials: true,
      });
      setNotes(response.data);
      // setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);
  return (
    <div>
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
