import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from '../Component/ThemeContext';
import { Divider } from '@mui/material';

const TopicDetail = () => {
  const { theme } = useContext(ThemeContext);
  const { url } = useParams();
  const [topic, setTopic] = useState(null);
  const baseUrl = 'https://acadamicfolio.pythonanywhere.com/app';

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await axios.get(`${baseUrl}/tutorials/posts/${url}/`);
        setTopic(response.data);
      } catch (error) {
        console.error('Error fetching topic:', error);
      }
    };

    fetchTopic();
  }, [url]);

  const containerStyle = {
    maxWidth: '100%',
    margin: '0 auto',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: theme === 'light' ? '#ffffff' : '#121212', color: theme === 'light' ? '#000' : '#fff', padding: '20px'
  };

  const titleStyle = {
    fontSize: '2em',
    marginBottom: '10px',
    fontWeight: 'bold',
    textAlign: 'center',
  };

  const contentStyle = {
    lineHeight: '1.6',
    fontSize: '1em',
    marginTop: '15px',
    padding: '10px 0',
    textAlign: 'justify',
  };


  return (
    <div style={containerStyle}>
      {topic ? (
        <div className="topic-detail-container">
          <h1 style={titleStyle}>{topic.post_title}</h1>
          <Divider />
          <div
            className="topic-content"
            style={contentStyle}
            dangerouslySetInnerHTML={{ __html: topic.post_content }}
          />

        </div>
      ) : (
        <p style={{ textAlign: 'center' }}>Loading topic...</p>
      )}
    </div>
  );
};

export default TopicDetail;
