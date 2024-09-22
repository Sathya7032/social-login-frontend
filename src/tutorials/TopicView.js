// src/pages/TopicView.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Paper } from '@mui/material';
import ReactPlayer from 'react-player';
import { ThemeContext } from '../Component/ThemeContext';
import '../styles/video.css'

export default function TopicView() {
    const baseUrl = 'http://127.0.0.1:8000/app';
    const { url } = useParams();
    const { theme } = useContext(ThemeContext); // Access the theme from the ThemeContext
    const [topic, setTopic] = useState({});

    useEffect(() => {
        axios
            .get(baseUrl + `/tutorials/posts/${url}/`)
            .then((response) => {
                setTopic(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching tutorials:', error);
            });
    }, [url]);

    // Define styles based on the current theme
    const containerStyle = {
        backgroundColor: theme === 'light' ? '#f9f9f9' : '#121212',
        color: theme === 'light' ? '#000' : '#fff',
        padding: '20px',
        marginBottom: '20px',
        borderRadius: '10px',
    };

    const titleStyle = {
        textAlign: 'center',
        fontWeight: 'bold',
        color: theme === 'light' ? '#333' : '#ddd',
    };

    const contentStyle = {
        color: theme === 'light' ? '#000' : '#ddd',
        fontSize: 'inherit',
    };


    return (
            <div  style={{ padding: '20px', backgroundColor: theme === 'light' ? '#fff' : '#1e1e1e' }}>
                <div className='row'>
                    <div className='col-md-12'>
                        <div>
                            {/* Main Content */}
                            <Paper style={containerStyle}>
                                <Typography variant='h4' style={titleStyle}>
                                    {topic.post_title || 'Loading...'}
                                </Typography>
                            </Paper>

                            {/* Video Section */}
                            {topic.post_video && (
                                <div style={{ marginBottom: '20px' }}>
                                    <ReactPlayer url={topic.post_video} className='react-player' width='100%' controls={true} />
                                </div>
                            )}

                            {/* Content Section */}
                            <Paper style={containerStyle}>
                                <Typography style={contentStyle} dangerouslySetInnerHTML={{ __html: topic.post_content || 'Content not available.' }} />
                            </Paper>
                        </div>
                    </div>
                </div>
            </div>

    );
}
