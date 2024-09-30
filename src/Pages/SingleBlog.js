import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Paper, Typography, Divider } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeContext } from "../Component/ThemeContext";
import { ClipLoader } from "react-spinners"; // Importing the spinner

const SingleBlog = () => {
    const baseUrl = "https://acadamicfolio.pythonanywhere.com/app";
    const { url } = useParams();
    const { theme } = useContext(ThemeContext);
    const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'));

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch a single blog post based on the URL parameter
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${baseUrl}/blogs/${url}`);
                setPost(response.data);
                setLoading(false); // Stop loading once data is fetched
            } catch (error) {
                console.error("Error fetching blog:", error);
                setLoading(false); // Stop loading in case of error
            }
        };

        fetchPost();
    }, [url]);

    // Helper function to format the date in a fancy way
    const formatDate = (dateStr) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateStr).toLocaleDateString(undefined, options);
    };

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
                {loading ? ( // Show spinner while loading
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                        <ClipLoader color={theme === 'light' ? '#000' : '#fff'} size={50} />
                    </div>
                ) : post ? (
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
                                    fontFamily: 'Arial, sans-serif',
                                    fontWeight:'bold'
                                }}
                            >
                                {post.title}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                style={{
                                    textAlign: "center",
                                    marginTop: "10px",
                                    color: theme === 'light' ? '#555' : '#aaa',
                                    fontStyle: 'italic',
                                    fontFamily: 'Georgia, serif'
                                }}
                            >
                                {post.date ? `Published on ${formatDate(post.date)}` : "Publication date unavailable"}
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
                                    fontFamily: 'Georgia, serif'
                                }}
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
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
