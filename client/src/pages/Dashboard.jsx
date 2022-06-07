import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import Note from '../components/Note';
import HourglassTopTwoToneIcon from '@mui/icons-material/HourglassTopTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard() {
  const editorRef = useRef(null);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [title, setTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const save = async e => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      e.preventDefault();
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
    <main className="dashboard-container">
      <h1>Dashboard</h1>
      {isEditing && (
        <>
          <form>
            <input
              type="text"
              placeholder="title"
              onChange={e => setTitle(e.target.value)}
            />
          </form>
          <Editor
            apiKey={process.env.REACT_APP_TINY_MCE_API_KEY}
            onInit={(evt, editor) => (editorRef.current = editor)}
            // onChange={e => setBody(e.target.value)}
          />
          <button onClick={save}>Save</button>
        </>
      )}
      <>
        {!isEditing ? (
          <AddCircleTwoToneIcon onClick={() => setIsEditing(!isEditing)} />
        ) : (
          <RemoveCircleTwoToneIcon onClick={() => setIsEditing(!isEditing)} />
        )}
      </>
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

// const handleSubmit = async e => {
//   e.preventDefault();
//   try {
//     const response = await axios.post(
//       'http://localhost:4000/api/v1/notes',
//       { title, body },
//       { withCredentials: true }
//     );
//     setNotes([
//       ...notes,
//       { title: response.data.title, body: response.data.body },
//     ]);
//   } catch (error) {
//     console.log(error);
//   }
// };

// {
//   addNote && (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="title"
//         onChange={e => setTitle(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="body"
//         onChange={e => setBody(e.target.value)}
//       />
//       <button>Add note</button>
//     </form>
//   );
// }
