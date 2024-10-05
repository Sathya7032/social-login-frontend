import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from '../Component/ThemeContext';
import image from '../styles/astronaut2.png';

const TutorialTopics = () => {
  const { theme } = useContext(ThemeContext);
  const baseUrl = 'https://acadamicfolio.pythonanywhere.com/app';
  const { url } = useParams();
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);

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
  }, [url]);

  // When a topic is clicked, navigate to its specific page using ID
  const handleTopicClick = (topic) => {
    navigate(`/topic/${topic.url}`); // Use the topic's ID
  };

  return (
    <div style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#121212', color: theme === 'light' ? '#000' : '#fff' }}>
      <h1 className='text-center mb-4'>Select a Topic from the List</h1>
      <div className='row'>
        <div className='col-md-8'>

          <div className="d-flex flex-column align-items-center">
            {topics.map((topic, index) => (
              <div
                key={topic.post_id}
                className="topic-item"
                onClick={() => handleTopicClick(topic)}
                style={{
                  cursor: 'pointer',
                  padding: '15px 20px',
                  margin: '10px 0',
                  backgroundColor: theme === 'light' ? '#f0f0f0' : '#333',
                  borderRadius: '10px',
                  width: '80%',
                  textAlign: 'center',
                  color: theme === 'light' ? '#000' : '#fff',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                }}
              >
                {index + 1}. {topic.post_title}
              </div>
            ))}
          </div>
        </div>
        <div className='col-md-4'>
          <img src={image} alt='' className='img-fluid' style={{ borderRadius: '20px' }} />
        </div>
      </div>

    </div>
  );
};

export default TutorialTopics;
