import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from '../Component/ThemeContext';
import '../styles/sidebar.css'; // Import your CSS file
import { Divider, Typography } from '@mui/material';
import ReactPlayer from 'react-player';
import image from '../styles/astronaut4.png';

const TutorialTopics = () => {
  const { theme } = useContext(ThemeContext); // Access the theme context
  const baseUrl = 'https://www.acadamicfolio.info/app';
  const { url } = useParams();
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null); // State for the selected topic

  // Fetch tutorials on component mount
  useEffect(() => {
    axios
      .get(baseUrl + `/tutorials/${url}/`)
      .then((response) => {
        setTopics(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tutorials:', error);
      });
  }, [url]);

  // Define card background based on the theme
  const getCardStyle = () => ({
    backgroundColor: theme === 'light' ? '#f8f9fa' : '#2c2c2c',
    color: theme === 'light' ? '#000' : '#fff',
    boxShadow: theme === 'light' ? '0 4px 8px rgba(0, 0, 0, 0.1)' : '0 4px 8px rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
  });

  // Handle topic selection
  const handleTopicClick = (topic) => {
    setSelectedTopic(topic); // Set the selected topic to show its details
  };

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

  // Define highlighted style for selected topic
  const getTopicStyle = (topic) => ({
    backgroundColor: selectedTopic?.post_id === topic.post_id ? (theme === 'light' ? '#d1e7dd' : '#343a40') : 'transparent',
    color: selectedTopic?.post_id === topic.post_id ? (theme === 'light' ? '#0f5132' : '#c3e6cb') : (theme === 'light' ? '#000' : '#fff'),
  });

  return (
    <div style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#121212', color: theme === 'light' ? '#000' : '#fff', justifyContent: 'center', alignContent: 'center' }}>
        <div>
          <div className="row">
            {/* Left Column with List of Topics */}
            <div className="col-md-3" style={{ borderRight: '1px solid white', backgroundColor: theme === 'light' ? 'rgb(240, 240, 240)' : 'rgb(90, 90, 90)' }}>
              {topics.map((topic, index) => (
                <ul key={topic.post_id} style={{ listStyle: 'none', padding: 0 }}>
                  <li
                    className="topic-item" // Apply CSS class here
                    onClick={() => handleTopicClick(topic)}
                    style={getTopicStyle(topic)} // Apply conditional styling
                  >
                    {index + 1}. {topic.post_title}
                  </li>
                </ul>
              ))}
             
            </div>

            {/* Right Column with Topic Details */}
            <div className="col-md-9">
              {selectedTopic ? (
                <div style={getCardStyle()} className='p-2'>
                  <a href={`/post/${selectedTopic.url}`} type='button' className='btn btn-success btn-sm ml-auto' style={{ alignContent: 'flex-end' }}>Read in New Page</a>
                  <h2 style={titleStyle}>{selectedTopic.post_title}</h2>
                  <Divider />
                  <div style={{ marginBottom: '20px', padding: 10 }}>
                    <ReactPlayer url={selectedTopic.post_video} className="react-player" width="100%" controls={true} />
                  </div>
                  <Typography sx={{}} style={contentStyle} dangerouslySetInnerHTML={{ __html: selectedTopic.post_content || 'Content not available.' }} />
                </div>
              ) : (
                <>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-md-9'>
                        <h1 className='text-center'>Choose a topic</h1>
                        <p className='text-danger p-3' style={{ fontFamily: 'cursive', fontWeight: 'bold' }}>
                          Our website's tutorial videos provide comprehensive, step-by-step guidance on various technologies, tailored for learners of all levels. Each video is crafted to simplify complex concepts, offering practical demonstrations and hands-on examples. With a focus on real-world applications, the tutorials cover a broad range of topics, from coding basics to advanced techniques. Engaging visuals and expert insights help users build their skills quickly and effectively. These videos empower learners to stay ahead in the fast-evolving tech landscape, enhancing their knowledge and expertise with ease.
                        </p>
                        <Divider />
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                          {topics.map((topic, index) => (
                            <li
                              key={topic.post_id}
                              className="topic-item text-info" // Apply CSS class here
                              onClick={() => handleTopicClick(topic)}
                              style={getTopicStyle(topic)} // Apply conditional styling
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
                </>
              )}
            </div>
          </div>
        </div>
    </div>
  );
};

export default TutorialTopics;
