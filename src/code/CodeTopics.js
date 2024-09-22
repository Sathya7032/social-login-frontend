import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";
import { ThemeContext } from "../Component/ThemeContext";
import image from '../styles/astronaut2.png'

const CodeTopics = () => {
    const baseUrl = "http://127.0.0.1:8000/app";
    const { url } = useParams();
    const [codes, setCodes] = useState([]);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        axios
            .get(baseUrl + `/languages/${url}/codes/`)
            .then((response) => {
                setCodes(response.data);
            })
            .catch((error) => {
                console.error("Error fetching codes:", error);
            });
    }, [url]);

    return (
        <div style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#121212', color: theme === 'light' ? '#000000' : '#ffffff', minHeight: '100vh' }}>
                <Typography
                    variant="h4"
                    style={{ textAlign: "center", paddingTop: 20, fontFamily: 'cursive' }}
                >
                    Pick your Program
                </Typography>

                <div className="container p-5">
                    <div className="row">
                        <div className="col-md-8">
                            {codes.length > 0 ? (
                                <ul className='list-group'>
                                    {codes.map((code, index) => (
                                        <div key={code.id}>
                                            <a href={`/languages/codes/${code.url}/`}>
                                                <li className='list-group-item' style={{ backgroundColor: theme === 'light' ? '#f8f9fa' : '#2c2c2c' }}>
                                                    <span style={{ fontSize: 15, color: theme === 'light' ? 'darkslategrey' : 'lightgrey', fontWeight: 'bolder', padding: 5 }}>
                                                        {index + 1}. {code.title}
                                                    </span>
                                                </li>
                                            </a>
                                        </div>
                                    ))}
                                </ul>
                            ) : (
                                <Typography variant="h6" style={{ textAlign: "center", color: theme === 'light' ? '#000000' : '#ffffff' }}>
                                    No codes yet
                                </Typography>
                            )}
                        </div>
                        <div className="col-md-4">
                            <img src={image} alt='' className='img-fluid' style={{ borderRadius: '20px' }} />
                        </div>
                    </div>

                </div>
        </div>
    );
};

export default CodeTopics;
