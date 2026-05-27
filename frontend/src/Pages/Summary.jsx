import{useState} from 'react'
import '../styles/summary.css'

const Summary = () => {

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