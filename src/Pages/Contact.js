import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../Component/ThemeContext';
import image from '../styles/file.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../styles/contact.css'; // Import your CSS file for styling


const Contact = () => {
    const { theme } = useContext(ThemeContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [animateImage, setAnimateImage] = useState(false); // State to trigger animation

    const baseUrl = "http://127.0.0.1:8000/app";
    const navigate = useNavigate();

    useEffect(() => {
        // Trigger the animation when the component mounts
        setAnimateImage(true);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};
        if (!name.trim()) {
            errors.name = 'Name is required';
        }
        if (!email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = 'Email is invalid';
        }
        if (!subject.trim()) {
            errors.subject = 'Subject is required';
        }
        if (!message.trim()) {
            errors.message = 'Message is required';
        }
        setErrors(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("subject", subject);
        formData.append("message", message);

        try {
            const response = await axios.post(baseUrl + "/contact/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/contact");
            Swal.fire({
                title: "Thank you for contacting us....",
                width: 400,
                timer: 2000,
                toast: true,
                timerProgressBar: true,
                padding: "3em",
                color: "#716add",
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error creating blog post:", error);
        }
    };

    const themeStyles = {
        backgroundColor: theme === 'light' ? '#ffffff' : '#121212',
        color: theme === 'light' ? '#000' : '#fff',
        inputBackgroundColor: theme === 'light' ? '#f8f9fa' : '#1e1e1e',
        inputColor: theme === 'light' ? '#000' : '#fff',
        buttonBackgroundColor: theme === 'light' ? '#007bff' : '#495057',
        buttonColor: theme === 'light' ? '#fff' : '#fff',
    };

    return (
        <div style={{ backgroundColor: themeStyles.backgroundColor, color: themeStyles.color }}>
                <div className='p-5'>
                    <div className='row'>
                        <div className={`col-md-6 ${animateImage ? 'move-image' : ''}`}>
                            <img src={image} alt='' className='img-fluid' style={{ borderRadius: '20px' }} />
                        </div>
                        <div className='col-md-6'>
                            <h2 className='text-center'>Contact us</h2>
                            <form onSubmit={handleSubmit}>
                                {/* Form fields */}
                                <div className="form-group">
                                    <label htmlFor="email" style={{ color: themeStyles.color }}>Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{
                                            backgroundColor: themeStyles.inputBackgroundColor,
                                            color: themeStyles.inputColor,
                                            borderColor: theme === 'light' ? '#ced4da' : '#343a40',
                                        }}
                                    />
                                    {errors.email && <small className="text-danger">{errors.email}</small>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name" style={{ color: themeStyles.color }}>Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        style={{
                                            backgroundColor: themeStyles.inputBackgroundColor,
                                            color: themeStyles.inputColor,
                                            borderColor: theme === 'light' ? '#ced4da' : '#343a40',
                                        }}
                                    />
                                    {errors.name && <small className="text-danger">{errors.name}</small>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="subject" style={{ color: themeStyles.color }}>Subject</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="subject"
                                        placeholder="Enter subject"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        style={{
                                            backgroundColor: themeStyles.inputBackgroundColor,
                                            color: themeStyles.inputColor,
                                            borderColor: theme === 'light' ? '#ced4da' : '#343a40',
                                        }}
                                    />
                                    {errors.subject && <small className="text-danger">{errors.subject}</small>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message" style={{ color: themeStyles.color }}>Message</label>
                                    <textarea
                                        className="form-control"
                                        id="message"
                                        rows="3"
                                        placeholder="Enter your message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        style={{
                                            backgroundColor: themeStyles.inputBackgroundColor,
                                            color: themeStyles.inputColor,
                                            borderColor: theme === 'light' ? '#ced4da' : '#343a40',
                                        }}
                                    ></textarea>
                                    {errors.message && <small className="text-danger">{errors.message}</small>}
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-block mt-3"
                                    style={{
                                        backgroundColor: themeStyles.buttonBackgroundColor,
                                        color: themeStyles.buttonColor,
                                    }}
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default Contact;
