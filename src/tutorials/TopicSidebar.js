// TopicSidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopicSidebar = ({ topics }) => {
  const navigate = useNavigate();

  const handleTopicClick = (topic) => {
    navigate(`/topic/${topic.url}`); // Use the topic's URL
  };

  return (
    <div className="topic-sidebar">
      <h2>Topics</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {topics.map((topic, index) => (
          <li
            key={topic.post_id}
            onClick={() => handleTopicClick(topic)}
            style={{
              cursor: 'pointer',
              padding: '10px',
              margin: '5px 0',
              backgroundColor: '#f0f0f0',
              borderRadius: '5px',
              textAlign: 'center',
            }}
          >
            {index + 1}. {topic.post_title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicSidebar;
