import React, { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { emailVerification } from "../reducer/Actions";
import { ThemeContext } from "../Component/ThemeContext"; // Import the ThemeContext

const EmailVerification = ({ emailVerification }) => {
    const [status, setStatus] = useState(false);
    const { key } = useParams();
    const { theme } = useContext(ThemeContext); // Access the theme context

    const handlingSubmit = (e) => {
        e.preventDefault();
        emailVerification(key);
        setStatus(true);
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
                <h2 className="text-center mb-4">Activate Account</h2>
                <h5 className="text-center mb-4">
                    Click the button below to activate your account
                </h5>
                <form className="mb-3" onSubmit={handlingSubmit}>
                    <div className="d-grid gap-2">
                        <button className="btn btn-primary" type="submit">Activate Account</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default connect(null, { emailVerification })(EmailVerification);
