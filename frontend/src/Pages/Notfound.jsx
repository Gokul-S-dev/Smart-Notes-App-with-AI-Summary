import '../styles/notfound.css'

const Notfound = () => {
  return (
    <div className="notfound-page">
      <div className="notfound-card">
        <p className="notfound-code">404</p>
        <h1 className="notfound-title">Page not found</h1>
        <p className="notfound-text">The page you are looking for does not exist or was moved.</p>
        <a className="notfound-link" href="/">Go back home</a>
      </div>
    </div>
  )
}

export default Notfound