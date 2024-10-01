import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import { ThemeContext } from '../Component/ThemeContext';
import '../styles/sidebar.css';
import { Divider, Typography } from '@mui/material';
import ReactPlayer from 'react-player';
import image from '../styles/astronaut4.png';

const TutorialTopics = () => {
  const { theme } = useContext(ThemeContext);
  const baseUrl = 'https://acadamicfolio.pythonanywhere.com/app';
  const { url } = useParams(); // URL from route params to capture topic identifier
  const navigate = useNavigate(); // useNavigate to change URL
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Fetch the list of topics when the component mounts
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get(`${baseUrl}/tutorials/${url}/`);
        setTopics(response.data);
      } catch (error) {
        console.error('Error fetching tutorials:', error);
      }
    };

    fetchTopics();
  }, [url]); // Fetch topics based on the base URL and category

  // Update selected topic when the topics or URL changes
  useEffect(() => {
    if (topics.length > 0) {
      const topic = topics.find(t => t.url === url) || topics[0]; // Match topic by URL, fallback to first topic
      setSelectedTopic(topic);
    }
  }, [topics, url]);

  // When a topic is clicked, change the selected topic and update the URL
  const handleTopicClick = (topic) => {
    setSelectedTopic(topic); // Set the selected topic state
    navigate(`/tutorials/${topic.url}`); // Programmatically update the URL
  };

  // Define card style based on the theme (light/dark)
  const getCardStyle = () => ({
    backgroundColor: theme === 'light' ? '#f8f9fa' : '#2c2c2c',
    color: theme === 'light' ? '#000' : '#fff',
    boxShadow: theme === 'light' ? '0 4px 8px rgba(0, 0, 0, 0.1)' : '0 4px 8px rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
  });

  const titleStyle = {
    textAlign: 'center',
    fontWeight: 'bold',
    color: theme === 'light' ? '#333' : '#ddd',
    padding: 10,
  };

  const contentStyle = {
    color: theme === 'light' ? '#000' : '#ddd',
    fontSize: 'inherit',
  };

  // Highlight the selected topic in the sidebar
  const getTopicStyle = (topic) => ({
    backgroundColor: selectedTopic?.post_id === topic.post_id ? (theme === 'light' ? '#d1e7dd' : '#343a40') : 'transparent',
    color: selectedTopic?.post_id === topic.post_id ? (theme === 'light' ? '#0f5132' : '#c3e6cb') : (theme === 'light' ? '#000' : '#fff'),
    cursor: 'pointer',
  });

  return (
    <div style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#121212', color: theme === 'light' ? '#000' : '#fff' }}>
      <div className="row">
        {/* Left Column with List of Topics */}
        <div className="col-md-3" style={{ borderRight: '1px solid white', backgroundColor: theme === 'light' ? 'rgb(240, 240, 240)' : 'rgb(90, 90, 90)' }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {topics.map((topic, index) => (
              <li
                key={topic.post_id}
                className="topic-item"
                onClick={() => handleTopicClick(topic)}
                style={getTopicStyle(topic)}
              >
                {index + 1}. {topic.post_title}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column with Topic Details */}
        <div className="col-md-9">
          {selectedTopic ? (
            <div style={getCardStyle()} className='p-2'>
              <h2 style={titleStyle}>{selectedTopic.post_title}</h2>
              <Divider />
              <div style={{ marginBottom: '20px', padding: 10 }}>
                <ReactPlayer url={selectedTopic.post_video} className="react-player" width="100%" controls />
              </div>
              <Typography style={contentStyle} dangerouslySetInnerHTML={{ __html: selectedTopic.post_content || 'Content not available.' }} />
            </div>
          ) : (
            <div className='container'>
              <div className='row'>
                <div className='col-md-9'>
                  <h1 className='text-center'>Choose a topic</h1>
                  <p className='text-danger p-3' style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>
                    Our website's tutorial videos provide comprehensive, step-by-step guidance on various technologies, tailored for learners of all levels. Each video is crafted to simplify complex concepts, offering practical demonstrations and hands-on examples.
                  </p>
                  <Divider />
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {topics.map((topic, index) => (
                      <li
                        key={topic.post_id}
                        className="topic-item text-info"
                        onClick={() => handleTopicClick(topic)}
                        style={getTopicStyle(topic)}
                      >
                        {index + 1}. {topic.post_title}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='col-md-3'>
                  <img src={image} alt='' className='img-fluid image-slide-in' style={{ borderRadius: '20px' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorialTopics;
