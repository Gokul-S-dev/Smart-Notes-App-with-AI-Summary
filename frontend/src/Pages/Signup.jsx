import { useState } from 'react'
import '../styles/signup.css'
import api from '../Api/Api';
import { useNavigate } from 'react-router-dom'
const Signup = () => {
    const [signup, setsignup ] = useState({
        name: "",
        email:"",
        phone:"",
        password:""
    })
    const [repassword, setRepassword] = useState("");
    
    const handleChange = (e) =>{
        setsignup({
            ...signup,
            [e.target.name]:e.target.value
        })
    }
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (signup.password !== repassword) {
            return alert('Passwords do not match');
        }
        try {
            const res = await api.post('/auth/signup', signup);
            const { token, user } = res.data;
            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                navigate('/list');
            }
        } catch (err) {
            console.error(err);
            const message = err?.response?.data?.message || 'Signup failed';
            alert(message);
        }
    }
  return (
            <div className="auth-page auth-page--signup">
                <div className="auth-card auth-card--signup">
                    <div className="auth-card__header">
                        <p className="auth-card__eyebrow">Create account</p>
                        <h1 className="auth-card__title">Start organizing smarter</h1>
                        <p className="auth-card__subtitle">Set up your profile and keep your notes synced from day one.</p>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="auth-field">
                            <label className="auth-label" htmlFor="signup-name">Name</label>
                            <input 
                                className="auth-input"
                                id="signup-name"
                                type="text"
                                name="name"
                                placeholder="Your full name"
                                value={signup.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="auth-field">
                            <label className="auth-label" htmlFor="signup-email">Email</label>
                            <input 
                                className="auth-input"
                                id="signup-email"
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={signup.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="auth-field">
                            <label className="auth-label" htmlFor="signup-phone">Phone</label>
                            <input 
                                className="auth-input"
                                id="signup-phone"
                                type="tel"
                                name="phone"
                                placeholder="+1 555 000 0000"
                                value={signup.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
          
                        <div className="auth-field">
                            <label className="auth-label" htmlFor="signup-password">Password</label>
                            <input 
                                className="auth-input"
                                id="signup-password"
                                type="password"
                                name="password"
                                placeholder="Create a strong password"
                                value={signup.password}
                                onChange={handleChange} 
                                required
                            />
                        </div>

                        <div className="auth-field">
                            <label className="auth-label" htmlFor="signup-repassword">Confirm password</label>
                            <input 
                                className="auth-input"
                                id="signup-repassword"
                                type="password"
                                name="repassword"
                                placeholder="Repeat your password"
                                value={repassword}
                                onChange={(e)=>{setRepassword(e.target.value)}}
                                required
                            />
                        </div>

                        <button className="auth-button" type="submit">Sign up</button>
                    </form>
                </div>
            </div>
  )
}

export default Signup