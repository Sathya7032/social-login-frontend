import React, { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { resetPasswordConfirm } from "../reducer/Actions";
import { ThemeContext } from "../Component/ThemeContext"; // Import ThemeContext
import Swal from "sweetalert2";

const ResetPasswordConfirm = ({ resetPasswordConfirm }) => {
    const [status, setStatus] = useState(false);
    const { uid, token } = useParams();
    const [formData, setFormData] = useState({
        new_password1: "",
        new_password2: ""
    });
    const { new_password1, new_password2 } = formData;
    const { theme } = useContext(ThemeContext); // Access the theme context

    const handlingInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handlingSubmit = (e) => {
        e.preventDefault();
        resetPasswordConfirm(uid, token, new_password1, new_password2);
        setStatus(true);
        Swal.fire({
            icon: "success",
            title: "Password Reset successful",
            text: "LOgin with the new password",
        });
    };

    if (status) {
        return <Navigate to={"../login/"} />;
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
                <h2 className="text-center mb-4">Set Password</h2>
                <form className="mb-3" onSubmit={handlingSubmit}>
                    <div className="mb-3">
                        <label htmlFor="new_password1" className="form-label">New Password</label>
                        <input
                            name="new_password1"
                            value={new_password1}
                            onChange={handlingInput}
                            type="password"
                            className="form-control"
                            id="new_password1"
                            placeholder="New password ..."
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="new_password2" className="form-label">Re-enter New Password</label>
                        <input
                            name="new_password2"
                            value={new_password2}
                            onChange={handlingInput}
                            type="password"
                            className="form-control"
                            id="new_password2"
                            placeholder="Re-enter new password ..."
                        />
                    </div>
                    <div className="d-grid gap-2">
                        <button className="btn btn-primary" type="submit">Set Password</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default connect(null, { resetPasswordConfirm })(ResetPasswordConfirm);
