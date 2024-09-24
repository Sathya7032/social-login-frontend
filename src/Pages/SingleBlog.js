import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Paper, Typography, Divider } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeContext } from "../Component/ThemeContext";

const SingleBlog = () => {
    const baseUrl = "https://acadamicfolio.pythonanywhere.com/app";
    const { url } = useParams();
    const { theme } = useContext(ThemeContext);
    const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'));

    const [post, setPost] = useState(null);

    
    // Fetch a single blog post based on the URL parameter
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${baseUrl}/blogs/${url}`);
                setPost(response.data);
            } catch (error) {
                console.error("Error fetching blog:", error);
            }
        };

        fetchPost();
    }, [url]);

    return (
            <div
                style={{
                    backgroundColor: theme === 'light' ? '#ffffff' : '#121212',
                    color: theme === 'light' ? '#000' : '#fff',
                    minHeight: '100vh',
                    padding: '10px',
                    
                }}
            >
                <div className="container">
                    {post ? (
                        <>
                            <Paper
                                style={{
                                    padding: isMobile ? '10px' : '20px',
                                    marginBottom: 20,
                                    backgroundColor: theme === 'light' ? '#f5f5f5' : '#1c1c1c',
                                }}
                            >
                                <Typography
                                    variant={isMobile ? "h6" : "h4"}
                                    style={{
                                        fontWeight: "bolder",
                                        textTransform: "uppercase",
                                        textAlign: "center",
                                        color: theme === 'light' ? '#000' : '#ccc',
                                        fontFamily:'cursive'
                                    }}
                                >
                                    {post.title}
                                </Typography>
                            </Paper>
                            <Paper
                                style={{
                                    padding: isMobile ? '10px' : '20px',
                                    marginBottom: 20,
                                    backgroundColor: theme === 'light' ? '#f9f9f9' : '#1e1e1e',
                                }}
                            >
                                <Typography
                                    style={{
                                        paddingTop: 10,
                                        fontSize: isMobile ? '14px' : '16px',
                                        color: theme === 'light' ? '#000' : '#ccc',
                                        fontFamily:'revert'
                                    }}
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                />
                                <Divider />
                            </Paper>
                            <Paper
                                style={{
                                    padding: isMobile ? '10px' : '20px',
                                    textAlign: 'center',
                                    backgroundColor: theme === 'light' ? '#f1f1f1' : '#2a2a2a',
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    style={{
                                        fontSize: isMobile ? '16px' : '18px',
                                        color: theme === 'light' ? '#333' : '#ddd',
                                    }}
                                >
                                    <span style={{ color: theme === 'light' ? '#1976d2' : '#90caf9' }}>Blog written by: </span>
                                    {post.user ? post.user.first_name : "Unknown"}
                                </Typography>
                            </Paper>
                        </>
                    ) : (
                        <Typography
                            variant="h4"
                            style={{ textAlign: 'center', marginTop: '50px', color: theme === 'light' ? '#000' : '#fff' }}
                        >
                            Blog not found
                        </Typography>
                    )}
                </div>
            </div>
    );
};

export default SingleBlog;
