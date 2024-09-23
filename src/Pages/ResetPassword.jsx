import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { resetPassword } from "../reducer/Actions";
import { ThemeContext } from "../Component/ThemeContext";
import Swal from "sweetalert2";

const ResetPassword = ({ resetPassword }) => {
    const [status, setStatus] = useState(false);
    const [formData, setFormData] = useState({
        email: ""
    });
    const { email } = formData;
    const { theme } = useContext(ThemeContext);

    const handlingInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handlingSubmit = (e) => {
        e.preventDefault();
        resetPassword(email);
        setStatus(true);
        Swal.fire({
            icon: "success",
            title: "An email has been sent successfully...",
            text: "Reset your password using the link in the email",
        });
    };

    if (status) {
        return <Navigate to={"../"} />;
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme === 'light' ? '#ffffff' : '#121212',
                color: theme === 'light' ? '#000' : '#fff',
                overflow: 'hidden',
               
                padding: '20px'
            }}
        >
            <div style={{ display: 'flex', width: '100%', borderRadius: '8px', borderWidth: 'solid black 1px', overflow: 'hidden' }}>

                {/* Form Column */}
                <div style={{
                    flex: 1,
                    backgroundColor: theme === 'light' ? '#ffffff' : '#121212',
                    padding: '20px',
                    color: theme === 'light' ? '#000' : '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <h2 className="text-center mb-4 text-danger fw-bold">Reset Password</h2>
                    <h5 className="text-center mb-4">
                        Please input your registered email.
                    </h5>
                    <h5 className="text-center mb-4">The link to set your new password will be sent to your email.</h5>
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
                        <div className="d-grid gap-2">
                            <button className="btn btn-dark" type="submit">Send Link</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default connect(null, { resetPassword })(ResetPassword);
