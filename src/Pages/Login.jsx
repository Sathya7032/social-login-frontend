import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../reducer/Actions";
import { ThemeContext } from "../Component/ThemeContext";
import { GoogleLoginButton } from "react-social-login-buttons";
import Swal from 'sweetalert2';
import '../css/main.css';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const { theme } = useContext(ThemeContext);
    const { email, password } = formData;

    const [loading, setLoading] = useState(false);

    const handlingInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handlingSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        Swal.fire({
            title: 'Logging in...',
            text: 'Please wait while we log you in.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        login(email, password).finally(() => {
            setLoading(false);
            Swal.close();
        });
    };

    const reachGoogle = () => {
        setLoading(true);
        Swal.fire({
            title: 'Redirecting...',
            text: 'Please wait while we redirect you to Google login.',
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
            overflow: 'hidden'
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
                    <h2 className="text-center mb-4">Login</h2>
                    <form className="mb-3" onSubmit={handlingSubmit} style={{ width: '100%', maxWidth: '400px' }}>
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
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                name="password"
                                value={password}
                                onChange={handlingInput}
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password ..."
                            />
                        </div>
                        <div className="d-grid gap-2 mb-2">
                            <button className="btn btn-primary" type="submit" disabled={loading}>Login</button>
                        </div>
                    </form>
                    
                    {/* Google Login Button */}
                    <div className="d-grid gap-2 mb-2" style={{ width: '100%', maxWidth: '400px' }}>
                        <GoogleLoginButton onClick={reachGoogle} disabled={loading} />
                    </div>

                    <p>Forgot your password? <Link to={"../reset/password/"}>Reset Password</Link></p>
                    <p>Don't have an account? <Link to={"../signup/"}>Signup</Link></p>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.AuthReducer.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
