import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from '../Component/ThemeContext';
import '../styles/sidebar.css';
import image from '../styles/astronaut4.png';

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

  // When a topic is clicked, navigate to its specific page
  const handleTopicClick = (topic) => {
    navigate(`/topic/${topic.url}`); // Use the topic's URL
  };

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
                style={{ cursor: 'pointer', padding: '10px', color: theme === 'light' ? '#000' : '#fff' }}
              >
                {index + 1}. {topic.post_title}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column Placeholder */}
        <div className="col-md-9">
          <h1 className='text-center'>Select a topic from the list</h1>
          <img src={image} alt='' className='img-fluid image-slide-in' style={{ borderRadius: '20px' }} />
        </div>
      </div>
    </div>
  );
};

export default TutorialTopics;
