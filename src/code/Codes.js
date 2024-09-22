import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Paper, Typography } from "@mui/material";
import CodeDisplay from "./CodeDisplay";
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeContext } from "../Component/ThemeContext";
import { useTheme } from '@mui/material/styles';

const Codes = () => {
    const baseUrl = "https://acadamicfolio.pythonanywhere.com/app";
    const { url } = useParams();
    const [topics, setTopics] = useState(null);
    const [error, setError] = useState(null);
    const { theme } = useContext(ThemeContext);
    const the = useTheme();
    const isMobile = useMediaQuery(the.breakpoints.down('sm'));

    useEffect(() => {
        axios
            .get(`${baseUrl}/languages/codes/${url}/`)
            .then((response) => {
                setTopics(response.data);
            })
            .catch((error) => {
                setError("Error fetching tutorials");
                console.error("Error fetching tutorials:", error);
            });
    }, [url]);

    return (
        <div
            style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#121212', color: theme === 'light' ? '#000' : '#fff', justifyContent: 'center', alignContent: 'center' }}
        >
            {error && (
                <Typography color="error" style={{ margin: 20 }}>
                    {error}
                </Typography>
            )}
            {topics && (
                <>
                    <Paper
                        style={{
                            margin: isMobile ? 0 : 20,
                            backgroundColor: theme === 'light' ? 'darkslategrey' : '#2c2c2c',
                            padding: isMobile ? 10 : 20,
                        }}
                    >
                        <Typography
                            variant={isMobile ? "h6" : "h4"}
                            style={{
                                textAlign: "center",
                                color: 'white',
                                textTransform: 'uppercase',
                            }}
                        >
                            {topics.title}
                        </Typography>
                        <script
                            async
                            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6919135852803356"
                            crossorigin="anonymous"
                        ></script>
                        <ins
                            className="adsbygoogle"
                            style={{ display: "block", textAlign: "center" }}
                            data-ad-layout="in-article"
                            data-ad-format="fluid"
                            data-ad-client="ca-pub-6919135852803356"
                            data-ad-slot="9140112864"
                        ></ins>
                    </Paper>
                    <Paper
                        style={{
                            margin: isMobile ? 0 : 20,
                            backgroundColor: theme === 'light' ? 'snow' : '#2c2c2c',
                            padding: isMobile ? 10 : 20,
                        }}
                    >
                        <CodeDisplay code={topics.code} />
                    </Paper>
                    <Paper
                        style={{
                            margin: isMobile ? 0 : 20,
                            backgroundColor: theme === 'light' ? 'snow' : '#2c2c2c',
                            padding: isMobile ? 10 : 20,
                        }}
                    >
                        <Typography
                            style={{ fontSize: isMobile ? '14px' : 'inherit', color: theme === 'light' ? '#000000' : '#ffffff' }}
                            dangerouslySetInnerHTML={{ __html: topics.content }}
                        />
                    </Paper>
                </>
            )}
        </div>
    );
};

export default Codes;
