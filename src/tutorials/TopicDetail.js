// TopicDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TopicDetail = () => {
  const { url } = useParams(); // Use topic URL as parameter
  const [topic, setTopic] = useState(null);
  const baseUrl = 'https://acadamicfolio.pythonanywhere.com/app';

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await axios.get(`${baseUrl}/post/${url}/`); // Adjust API endpoint as necessary
        setTopic(response.data);
      } catch (error) {
        console.error('Error fetching topic:', error);
      }
    };

    fetchTopic();
  }, [url]);

  return (
    <div>
      {topic ? (
        <div>
          <h2>{topic.post_title}</h2>
          <div dangerouslySetInnerHTML={{ __html: topic.post_content }} />
          {/* Add other relevant topic details here */}
        </div>
      ) : (
        <p>Loading topic...</p>
      )}
    </div>
  );
};

export default TopicDetail;
