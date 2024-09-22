import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../reducer/Actions";
import { ThemeContext } from "../Component/ThemeContext"; // Import the ThemeContext

const Signup = ({ signup }) => {
    const [status, setStatus] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        first_name: "",
        last_name: "",
        password1: "",
        password2: ""
    });
    const { theme } = useContext(ThemeContext); // Access the theme from the context

    const { email, first_name, last_name, password1, password2 } = formData;
    
    const handlingInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const handlingSubmit = (e) => {
        e.preventDefault();
        signup(email, first_name, last_name, password1, password2);
        setStatus(true);
    };

    if (status) {
        return <Navigate to={"../"} />;
    }

    return (
        <div
            style={{
                backgroundColor: theme === 'light' ? '#ffffff' : '#121212',
                color: theme === 'light' ? '#000' : '#fff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}
        >
            <div className="main-box" style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#121212', color: theme === 'light' ? '#000' : '#fff', padding: '20px', borderRadius: '8px', width: '400px' }}>
                <h2 className="text-center mb-4">Signup</h2>
                <form className="mb-3" onSubmit={handlingSubmit}>
                    <div className="mb-3">
                        <label htmlFor="first_name" className="form-label">First Name</label>
                        <input
                            name="first_name"
                            value={first_name}
                            onChange={handlingInput}
                            type="text"
                            className="form-control"
                            id="first_name"
                            placeholder="First name ..."
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="last_name" className="form-label">Last Name</label>
                        <input
                            name="last_name"
                            value={last_name}
                            onChange={handlingInput}
                            type="text"
                            className="form-control"
                            id="last_name"
                            placeholder="Last name ..."
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            name="email"
                            value={email}
                            onChange={handlingInput}
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="name@example.com"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password1" className="form-label">Password</label>
                        <input
                            name="password1"
                            value={password1}
                            onChange={handlingInput}
                            type="password"
                            className="form-control"
                            id="password1"
                            placeholder="Password ..."
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password2" className="form-label">Confirm Password</label>
                        <input
                            name="password2"
                            value={password2}
                            onChange={handlingInput}
                            type="password"
                            className="form-control"
                            id="password2"
                            placeholder="Confirm Password ..."
                        />
                    </div>
                    <div className="d-grid gap-2">
                        <button className="btn btn-primary" type="submit">Signup</button>
                    </div>
                </form>
                <p>Already have an account? <Link to={"../login/"}>Login</Link></p>
            </div>
        </div>
    );
};

export default connect(null, { signup })(Signup);
