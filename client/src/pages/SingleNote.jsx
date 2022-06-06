import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import HourglassTopTwoToneIcon from '@mui/icons-material/HourglassTopTwoTone';

function SingleNote() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

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
    <div className="single-note-container">
      {note && (
        <>
          <h1>{note.title}</h1>
          <p>{note.body}</p>
        </>
      )}
    </div>
  );
}

export default SingleNote;
