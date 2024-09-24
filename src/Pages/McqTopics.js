import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from '../Component/ThemeContext';
import image from '../styles/astronaut2.png';
import { ClipLoader } from 'react-spinners'; // Import the spinner component

export default function McqTopics() {
    const baseUrl = "https://acadamicfolio.pythonanywhere.com/app";
    const { theme } = useContext(ThemeContext);
    const { url } = useParams();
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await axios.get(`${baseUrl}/mcq-topics/${url}`);
                setTopics(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching topics:", error);
            } finally {
                setLoading(false); // Set loading to false when fetching is complete
            }
        };

        fetchTopics();
    }, [url]);

    return (
        <div
            style={{
                backgroundColor: theme === 'light' ? '#ffffff' : '#121212',
                color: theme === 'light' ? '#000' : '#fff',
            }}
        >
            <h1
                className='text-center p-5'
                style={{
                    color: theme === 'light' ? '#000' : '#fff',
                    fontWeight: 'bolder',
                    fontFamily: 'cursive'
                }}
            >
                Choose Your Test Topic
            </h1>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8'>
                        {loading ? ( // Show loading spinner while fetching
                            <div className="text-center" style={{ padding: 20 }}>
                                <ClipLoader color="#007bff" loading={loading} size={50} />
                            </div>
                        ) : topics.length > 0 ? (
                            <ul className='list-group'>
                                {topics.map((topic, index) => (
                                    <li
                                        key={topic.id}
                                        className='list-group-item'
                                        style={{
                                            backgroundColor: theme === 'light' ? '#f9f9f9' : '#1e1e1e',
                                            color: theme === 'light' ? '#333' : '#ddd',
                                            border: theme === 'light' ? '1px solid #ccc' : '1px solid #444',
                                            marginBottom: '10px',
                                            borderRadius: '5px',
                                        }}
                                    >
                                        <a
                                            href={`/topics/${topic.id}/questions`}
                                            style={{
                                                textDecoration: 'none',
                                                color: theme === 'light' ? 'darkslategrey' : '#90caf9',
                                                textTransform: 'uppercase',
                                                fontWeight: 'bold',
                                                fontSize: '15px',
                                                display: 'block',
                                                padding: '5px',
                                            }}
                                        >
                                            {index + 1}. {topic.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p style={{ color: theme === 'light' ? '#000' : '#ddd' }}>No topics available</p>
                        )}
                    </div>
                    <div className='col-md-4'>
                        <img src={image} alt='' className='img-fluid' style={{ borderRadius: '20px' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
