import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { changePassword } from "../reducer/Actions";
import { ThemeContext } from "../Component/ThemeContext"; // Assuming you have a ThemeContext
import '../css/main.css'; // Add necessary custom styles if needed

const ChangePassword = ({ isAuthenticated, changePassword }) => {
    const [formData, setFormData] = useState({
        new_password1: "",
        new_password2: "",
        old_password: ""
    });

    const { theme } = useContext(ThemeContext); // Access the current theme from context
    const { new_password1, new_password2, old_password } = formData;

    const handlingInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const handlingSubmit = (e) => {
        e.preventDefault();
        changePassword(new_password1, new_password2, old_password);
    };

    if (!isAuthenticated && !localStorage.getItem('access')) {
        return <Navigate to={"../login"} />;
    }

    return (
        <div 
            className="main-box"
            style={{
                backgroundColor: theme === 'light' ? '#ffffff' : '#121212',  // Light or dark background
                color: theme === 'light' ? '#000' : '#fff',  // Light or dark text
                padding: '20px',
                borderRadius: '8px',
                maxWidth: '400px',
                margin: '0 auto',
                marginTop: '50px'
            }}
        >
            <h2 className="text-center mb-4">Change Password</h2>
            <form className="mb-3" onSubmit={e => handlingSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="new_password1" className="form-label">New Password</label>
                    <input 
                        name="new_password1" 
                        value={new_password1} 
                        onChange={e => handlingInput(e)} 
                        type="password" 
                        className="form-control" 
                        id="new_password1" 
                        placeholder="New password ..."
                        style={{
                            backgroundColor: theme === 'light' ? '#fff' : '#333', 
                            color: theme === 'light' ? '#000' : '#fff',
                            borderColor: theme === 'light' ? '#ced4da' : '#444'
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="new_password2" className="form-label">Re-enter New Password</label>
                    <input 
                        name="new_password2" 
                        value={new_password2} 
                        onChange={e => handlingInput(e)} 
                        type="password" 
                        className="form-control" 
                        id="new_password2" 
                        placeholder="Re-enter new password ..."
                        style={{
                            backgroundColor: theme === 'light' ? '#fff' : '#333', 
                            color: theme === 'light' ? '#000' : '#fff',
                            borderColor: theme === 'light' ? '#ced4da' : '#444'
                        }}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="old_password" className="form-label">Old Password</label>
                    <input 
                        name="old_password" 
                        value={old_password} 
                        onChange={e => handlingInput(e)} 
                        type="password" 
                        className="form-control" 
                        id="old_password" 
                        placeholder="Old password ..."
                        style={{
                            backgroundColor: theme === 'light' ? '#fff' : '#333', 
                            color: theme === 'light' ? '#000' : '#fff',
                            borderColor: theme === 'light' ? '#ced4da' : '#444'
                        }}
                    />
                </div>
                <div className="d-grid gap-2">
                    <button 
                        className="btn btn-primary" 
                        type="submit"
                        style={{
                            backgroundColor: theme === 'light' ? '#007bff' : '#1e88e5',
                            color: '#fff'
                        }}
                    >
                        Change Password
                    </button>
                </div>
            </form>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.AuthReducer.isAuthenticated
});

export default connect(mapStateToProps, { changePassword })(ChangePassword);
