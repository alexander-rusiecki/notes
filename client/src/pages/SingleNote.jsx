import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import parse from 'html-react-parser';
import HourglassTopTwoToneIcon from '@mui/icons-material/HourglassTopTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import '../styles/SingleNote.css';

function SingleNote() {
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleTitleChange = e => {
    e.preventDefault();
    setNote({ ...note, title: e.target.value });
    // setTitle(e.target.value);
  };

  const updateNote = async e => {
    e.preventDefault();
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      try {
        const response = await axios.put(
          `http://localhost:4000/api/v1/notes/${id}`,
          { title, body: content },
          { withCredentials: true }
        );
        setIsEditing(false);
        setNote({ ...response.data });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getNote = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/notes/${id}`,
        { withCredentials: true }
      );
      if (response.data.msg?.error_type === 'session_not_found') {
        setAuthenticated(false);
        setIsLoading(false);
      } else {
        setAuthenticated(true);
        setIsLoading(false);
        setNote(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async e => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:4000/api/v1/notes/${id}`, {
        withCredentials: true,
      });
      navigate('/notes');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNote();
    setTitle(note?.title);
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
        <h1>You are not authorized</h1>
      </main>
    );
  }

  return (
    <main className="single-note-container">
      <h2>Read, edit or delete note</h2>
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
      {note && !isEditing ? (
        <div className="single-note-card">
          <h2>{note.title}</h2>
          {parse(note.body)}
          <DeleteIcon onClick={handleDelete} />
        </div>
      ) : (
        <>
          <form>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={note.title}
              onChange={handleTitleChange}
            />
          </form>
          <Editor
            apiKey={process.env.REACT_APP_TINY_MCE_API_KEY}
            initialValue={note.body}
            toolbar={
              'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | forecolor backcolor'
            }
            onInit={(evt, editor) => (editorRef.current = editor)}
          />
          <button onClick={updateNote}>Update note</button>
        </>
      )}
    </main>
  );
}

export default SingleNote;
