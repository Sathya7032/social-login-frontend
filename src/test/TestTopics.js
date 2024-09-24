import React, { useEffect, useState } from 'react';
import Base1 from '../user/Base1';
import axios from 'axios';
import { Divider, List, ListItem, Typography } from '@mui/material';
import { ClipLoader } from 'react-spinners'; // Import the spinner component

const TestTopics = () => {
  const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(baseUrl + "/topicsMcq/", {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(res.data);
      setTopics(res.data);
    } catch (error) {
      console.error("Error fetching topics:", error);
    } finally {
      setLoading(false); // Set loading to false when fetching is complete
    }
  };

  return (
    <div>
      <Base1>
        <Typography
          variant="h4"
          color="primary"
          style={{ textAlign: "center", fontWeight: "bolder" }}
        >
          Test Topics
        </Typography>
        {loading ? ( // Show loading spinner while fetching
          <div className="text-center" style={{ padding: 20 }}>
            <ClipLoader color="#007bff" loading={loading} size={50} />
          </div>
        ) : (
          <List
            variant="outlined"
            sx={{
              minWidth: 240,
              borderRadius: 'sm',
              marginTop: 7,
            }}
          >
            {topics.map((topic, index) => (
              <div key={index}>
                <Divider />
                <a href={`/test/${topic.id}`}
                  style={{
                    textDecoration: 'none',
                    color: '#007bff',
                    transition: 'color 0.3s ease',
                    cursor: 'pointer',
                    display: 'block',
                  }}
                  onMouseEnter={(e) => { e.target.style.backgroundColor = '#0056b3'; e.target.style.color = 'white' }}
                  onMouseLeave={(e) => { e.target.style.backgroundColor = 'snow'; e.target.style.color = '#007bff' }}
                >
                  <ListItem>
                    {index + 1}. {topic.name}
                  </ListItem>
                </a>
              </div>
            ))}
            <Divider />
          </List>
        )}
      </Base1>
    </div>
  );
}

export default TestTopics;
