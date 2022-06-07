import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import HourglassTopTwoToneIcon from '@mui/icons-material/HourglassTopTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import '../styles/SingleNote.css';

function SingleNote() {
  const editorRef = useRef(null);

  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');

  const save = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();

      // an application would save the editor content to the server here
      console.log(content);
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
        setNote({ ...response.data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNote();
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
    <main className="single-note-container">
      <>
        {!isEditing ? (
          <AddCircleTwoToneIcon onClick={() => setIsEditing(!isEditing)} />
        ) : (
          <RemoveCircleTwoToneIcon onClick={() => setIsEditing(!isEditing)} />
        )}
      </>
      {note && !isEditing ? (
        <>
          <h1>{note.title}</h1>
          <p>{note.body}</p>
        </>
      ) : (
        <>
          <form>
            <input
              placeholder={note.title}
              type="text"
              onChange={e => setTitle(e.target.value)}
            />
          </form>
          <Editor
            apiKey={process.env.REACT_APP_TINY_MCE_API_KEY}
            initialValue={note.body}
            onInit={(evt, editor) => (editorRef.current = editor)}
            // onChange={e => setBody(e.target.value)}
          />
          <button onClick={save}>Save</button>
        </>
      )}
    </main>
  );
}

export default SingleNote;
