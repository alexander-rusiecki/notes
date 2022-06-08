import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import parse from 'html-react-parser';
import HourglassTopTwoToneIcon from '@mui/icons-material/HourglassTopTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
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
    setTitle(e.target.value);
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
        setNote(response.data);
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
        setTitle(response.data.title);
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

  const toggleEditing = () => {
    setIsEditing(prev => !prev);
  };

  useEffect(() => {
    getNote();
  }, []);

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
        <h1>You are not authorized</h1>
      </main>
    );
  }

  return (
    <main className="single-note-container">
      <h2>Read, edit or delete note</h2>
      <>
        {!isEditing ? (
          <EditTwoToneIcon
            style={{ color: '#2c5784', marginTop: '1em', marginBottom: '2em' }}
            onClick={toggleEditing}
          />
        ) : (
          <RemoveCircleTwoToneIcon
            style={{ color: '#2c5784', marginTop: '1em', marginBottom: '2em' }}
            onClick={toggleEditing}
          />
        )}
      </>
      {note && !isEditing ? (
        <div className="single-note-card">
          <h2>{note.title}</h2>
          {parse(note.body)}
          <DeleteTwoToneIcon onClick={handleDelete} />
        </div>
      ) : (
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
            initialValue={note.body}
            onInit={(evt, editor) => (editorRef.current = editor)}
            init={{
              height: 400,
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
          <button onClick={updateNote}>Update note</button>
        </>
      )}
    </main>
  );
}

export default SingleNote;
