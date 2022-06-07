import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import Note from '../components/Note';
import HourglassTopTwoToneIcon from '@mui/icons-material/HourglassTopTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import '../styles/Dashboard.css';

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [title, setTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const editorRef = useRef(null);

  const handleTitleChange = e => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const addNote = async e => {
    e.preventDefault();
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      try {
        const response = await axios.post(
          'http://localhost:4000/api/v1/notes',
          { title, body: content },
          { withCredentials: true }
        );
        setIsEditing(false);
        setNotes([...notes, { ...response.data }]);
      } catch (error) {
        console.log(error);
      }
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
      <main className="loading">
        <HourglassTopTwoToneIcon />
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="loading">
        <h1>You are not authorized 🔐</h1>
      </main>
    );
  }

  return (
    <main className="dashboard-container">
      <h2>Dashboard</h2>
      <>
        {!isEditing ? (
          <AddCircleTwoToneIcon
            style={{ color: '#2c5784', marginTop: '1em' }}
            onClick={() => setIsEditing(!isEditing)}
          />
        ) : (
          <RemoveCircleTwoToneIcon
            style={{ color: '#2c5784', marginTop: '1em' }}
            onClick={() => setIsEditing(!isEditing)}
          />
        )}
      </>
      {isEditing && (
        <>
          <form>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={handleTitleChange}
            />
          </form>
          <Editor
            apiKey={process.env.REACT_APP_TINY_MCE_API_KEY}
            toolbar={
              'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | forecolor backcolor'
            }
            onInit={(evt, editor) => (editorRef.current = editor)}
          />
          <button onClick={addNote}>Add note</button>
        </>
      )}

      <div className="notes-container">
        {notes &&
          notes.map(note => (
            <Link to={`/notes/${note.id}`} key={note.id} className="note-card">
              <Note {...note} />
            </Link>
          ))}
      </div>
    </main>
  );
}

export default Dashboard;
