import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { resetPassword } from "../reducer/Actions";
import { ThemeContext } from "../Component/ThemeContext"; // Import ThemeContext
import Swal from "sweetalert2";

const ResetPassword = ({ resetPassword }) => {
    const [status, setStatus] = useState(false);
    const [formData, setFormData] = useState({
        email: ""
    });
    const { email } = formData;
    const { theme } = useContext(ThemeContext); // Access the theme context

    const handlingInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handlingSubmit = (e) => {
        e.preventDefault();
        resetPassword(email);
        setStatus(true);
        Swal.fire({
            icon: "success",
            title: "An email has been sent Successfully...",
            text: "Reset Your password using this mail",
        });
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
            }}
        >
            <div className="main-box" style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#121212', color: theme === 'light' ? '#000' : '#fff', padding: '20px', borderRadius: '8px', width: '400px' }}>
                <h2 className="text-center mb-4">Reset Password</h2>
                <h5 className="text-center mb-4">
                    Please input your registered email. The link to set your new password will be sent to your email.
                </h5>
                <form className="mb-3" onSubmit={handlingSubmit}>
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
                        <button className="btn btn-primary" type="submit">Send Link</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default connect(null, { resetPassword })(ResetPassword);
