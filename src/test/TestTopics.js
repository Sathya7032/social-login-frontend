import React, { useEffect, useState } from 'react'
import Base1 from '../user/Base1'
import axios from 'axios';
import { Divider, List, ListItem, Typography } from '@mui/material';

const TestTopics = () => {

  const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    await axios.get(baseUrl + "/topicsMcq/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      console.log(res.data);
      setTopics(res.data);
    });
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
      </Base1>
    </div>
  )
}

export default TestTopics