import { useState } from 'react'
import '../styles/login.css'
import api from '../Api/Api.js'
const Login = () => {
    const [login, setLogin] = useState({
        email: "",
        password:""
    })
    

    const handleSubmit =async (e)=>{
        e.preventDefault()
       if(login.email!=="" || login.password!==""){
        return alert("Enter input ");
       }
       try{

        const res = await api.post("/auth/login", login);
        console.log(res.data);
       }catch(err){
        console.error(err);
       }
        
    
    }
    const handleChange = (e)=>{
        setLogin({
            ...login,
            [e.target.name]:e.target.value,
        })
    }

  return (
        <div className="auth-page auth-page--login">
            <div className="auth-card">
                <div className="auth-card__header">
                    <p className="auth-card__eyebrow">Welcome back</p>
                    <h1 className="auth-card__title">Sign in to Smart Notes</h1>
                    <p className="auth-card__subtitle">Access your notes, summaries, and saved ideas in one place.</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-field">
                        <label className="auth-label" htmlFor="login-email">Email</label>
                        <input
                            className="auth-input"
                            id="login-email"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={login.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label className="auth-label" htmlFor="login-password">Password</label>
                        <input 
                            className="auth-input"
                            id="login-password"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={login.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button className="auth-button" type="submit">Login</button>
                </form>
            </div>
        </div>
  )
}

export default Login