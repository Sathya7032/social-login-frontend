import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../reducer/Actions";
import { ThemeContext } from "../Component/ThemeContext";
import { GoogleLoginButton } from "react-social-login-buttons";
import Swal from 'sweetalert2';
import '../css/main.css';

const Signup = ({ signup, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: "",
        first_name: "",
        last_name: "",
        password1: "",
        password2: ""
    });
    const { theme } = useContext(ThemeContext);
    const { email, first_name, last_name, password1, password2 } = formData;

    const [loading, setLoading] = useState(false);

    const handlingInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handlingSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        Swal.fire({
            title: 'Signing up...',
            text: 'Please wait while we create your account.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        signup(email, first_name, last_name, password1, password2).finally(() => {
            setLoading(false);
            Swal.close();
        });
    };

    const reachGoogle = () => {
        setLoading(true);
        Swal.fire({
            title: 'Redirecting...',
            text: 'Please wait while we redirect you to Google signup.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const clientID = "692204927708-1m1h5crncccje25m281t9iotr8246d75.apps.googleusercontent.com";
        const callBackURI = "https://www.acadamicfolio.info/";
        window.location.replace(`https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${callBackURI}&prompt=consent&response_type=code&client_id=${clientID}&scope=openid%20email%20profile&access_type=offline`);
    };

    if (isAuthenticated) {
        return <Navigate to={"../"} />;
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme === 'light' ? '#ffffff' : '#121212',
            color: theme === 'light' ? '#000' : '#fff',
            overflow: 'hidden',
            minHeight: '100vh',
        }}>
            <div style={{ display: 'flex', width: '100%', borderRadius: '8px', borderWidth:'solid black 1px', overflow: 'hidden' }}>
               
                {/* Form Column */}
                <div style={{
                    flex: 1,
                    backgroundColor: theme === 'light' ? '#ffffff' : '#121212',
                    padding: '20px',
                    color: theme === 'light' ? '#000' : '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <h2 className="text-center mb-4">Signup</h2>
                    <form className="mb-3" onSubmit={handlingSubmit} style={{ width: '100%', maxWidth: '400px' }}>
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
                        <div className="d-grid gap-2 mb-2">
                            <button className="btn btn-primary" type="submit" disabled={loading}>Signup</button>
                        </div>
                    </form>
                    
                    {/* Google Signup Button */}
                    <div className="d-grid gap-2 mb-2" style={{ width: '100%', maxWidth: '400px' }}>
                        <GoogleLoginButton onClick={reachGoogle} disabled={loading} />
                    </div>

                    <p>Already have an account? <Link to={"../login/"}>Login</Link></p>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.AuthReducer.isAuthenticated
});

export default connect(mapStateToProps, { signup })(Signup);
