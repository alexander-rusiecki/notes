import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import Note from 'components/Note';
import HourglassTopTwoToneIcon from '@mui/icons-material/HourglassTopTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import 'styles/dashboard.css';

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState(null);
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
      const body = editorRef.current.getContent();
      try {
        const response = await axios.post(
          'http://localhost:4000/api/v1/notes',
          { title, body },
          { withCredentials: true }
        );
        setIsEditing(false);
        setNewNote(response.data);
        setTitle('');
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

  const toggleEditing = () => setIsEditing(prev => !prev);

  useEffect(() => {
    getAllNotes();
  }, [newNote]);

  if (isLoading) {
    return (
      <main className="loading">
        <HourglassTopTwoToneIcon style={{ color: '#2c5784' }} />
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="loading">
        <h2>You are not authorized 🔐</h2>
        <h3>
          please <Link to="/login"> login </Link>
        </h3>
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
            onClick={toggleEditing}
            role="button"
            aria-label="Open editor"
          />
        ) : (
          <RemoveCircleTwoToneIcon
            style={{ color: '#2c5784', marginTop: '1em' }}
            onClick={toggleEditing}
            role="button"
            aria-label="Close editor"
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
            onInit={(evt, editor) => (editorRef.current = editor)}
            init={{
              height: 400,
              auto_focus: true,
              plugins: [
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'code',
                'help',
                'wordcount',
              ],
              toolbar:
                'undo redo | blocks | ' +
                'bold italic forecolor backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
            }}
          />
          <button onClick={addNote}>Add note</button>
        </>
      )}

      {notes.length ? (
        <div className="notes-container">
          {notes.map(note => (
            <Link to={`/notes/${note.id}`} key={note.id} className="note-card">
              <Note {...note} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="no-notes">
          <h3>You have no notes</h3>
        </div>
      )}
    </main>
  );
}

export default Dashboard;
