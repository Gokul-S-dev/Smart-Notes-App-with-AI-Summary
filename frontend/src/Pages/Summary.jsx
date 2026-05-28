import{useState} from 'react'
import '../styles/summary.css'
import api from '../Api/Api'
import { useNavigate } from 'react-router-dom'

const Summary = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // call backend logout to invalidate token in Redis
      await api.post('/auth/logout');
    } catch (err) {
      console.warn('Logout request failed:', err?.message || err);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    navigate('/login');
  }

    const [text,setext]=useState("");

    const handleSubmit = (e)=>{
        e.preventDefault();
    }
  return (
    <div className="summary-container">
      <div className="summary-hero">
        <h2>AI Summary</h2>
        <p>Paste text below and generate a concise, readable summary instantly.</p>

        <form className="summary-form" onSubmit={handleSubmit}>
          <textarea
            className="summary-textarea"
            name="text"
            id="text"
            placeholder="Enter the text for summaries"
            value={text}
            onChange={(e)=>{setext(e.target.value)}}
          />

          <div className="summary-actions">
            <button className="btn btn-primary" type="submit">Generate Summary</button>
            <button className="btn btn-ghost" type="button" onClick={()=>setext('')}>Clear</button>
            <button className="btn btn-logout" type="button" onClick={handleLogout}>Logout</button>
          </div>
        </form>
      </div>

      <aside className="summary-side">
        <h3>Preview</h3>
        <div className="summary-preview">Your generated summary will appear here.</div>
      </aside>
    </div>
  )
}

export default Summary