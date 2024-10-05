import React, { useContext, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from '../Component/ThemeContext';
import { Divider, Typography } from '@mui/material';
import ReactPlayer from "react-player";
import { ClipLoader } from 'react-spinners';
import DOMPurify from 'dompurify';
import { Helmet } from 'react-helmet'; // Import React Helmet

const TopicDetail = () => {
  const { theme } = useContext(ThemeContext);
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { url } = useParams();
  const location = useLocation();
  const [topic, setTopic] = useState(location.state?.topic || null);
  const baseUrl = 'https://acadamicfolio.pythonanywhere.com/app';

  useEffect(() => {
    if (!topic) {
      const fetchTopic = async () => {
        try {
          const response = await axios.get(`${baseUrl}/tutorials/posts/${url}/`);
          setTopic(response.data);
        } catch (error) {
          console.error('Error fetching topic:', error);
        }
      };

      fetchTopic();
    }
  }, [url, topic]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}/languages/${url}/codes/`)
      .then((response) => {
        setCodes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching codes:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  const containerStyle = {
    maxWidth: '100%',
    margin: '0 auto',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: theme === 'light' ? '#ffffff' : '#121212',
    color: theme === 'light' ? '#000' : '#fff',
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
    textAlign: 'left',
  };

  return (
    <div style={containerStyle}>
      {/* Add SEO meta tags dynamically */}
      {topic && (
        <Helmet>
          <title>{topic.post_title} - My Website</title>
          <meta name="description" content={topic.post_content.substring(0, 150)} />
          <meta name="keywords" content={`${topic.post_title}, tutorials, code examples`} />
          <meta property="og:title" content={topic.post_title} />
          <meta property="og:description" content={topic.post_content.substring(0, 150)} />
          <meta property="og:image" content={topic.post_image || '/default-image.jpg'} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`https://yourwebsite.com/tutorials/${url}`} />
        </Helmet>
      )}

      {topic ? (
        <>
          <div className="topic-detail-container">
            <div className='row'>
              <div className='col-md-2 bg-secondary'></div>
              <div className='col-md-8'>
                <h1 style={titleStyle}>{topic.post_title}</h1>
                <Divider />
                <center style={{ marginBottom: 20, marginTop: 10 }}>
                  <ReactPlayer
                    url={topic.post_video}
                    className="react-player"
                    width="70%"
                    controls={true}
                  />
                </center>
                <div
                  className="topic-content"
                  style={contentStyle}
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(topic.post_content) }}
                />
              </div>
              <div className='col-md-2 bg-secondary'></div>
            </div>
          </div>

          <Divider />

          <div className="container p-5">
            <div className="row">
              <div className="col-md-12">
                <h1 className='pb-3' style={titleStyle}>Practice codes</h1>
                {loading ? (
                  <div className="text-center">
                    <ClipLoader color={theme === 'light' ? '#000' : '#fff'} loading={loading} size={50} />
                  </div>
                ) : (
                  codes.length > 0 ? (
                    <ul className='list-group'>
                      {codes.map((code, index) => (
                        <div key={code.id}>
                          <a href={`/languages/codes/${code.url}/`}>
                            <li className='list-group-item' style={{ backgroundColor: theme === 'light' ? '#f8f9fa' : '#2c2c2c' }}>
                              <span style={{ fontSize: 15, color: theme === 'light' ? 'darkslategrey' : 'lightgrey', fontWeight: 'bolder', padding: 5 }}>
                                {index + 1}. {code.title}
                              </span>
                            </li>
                          </a>
                        </div>
                      ))}
                    </ul>
                  ) : (
                    <Typography variant="h6" style={{ textAlign: "center", color: theme === 'light' ? '#000000' : '#ffffff' }}>
                      No codes yet
                    </Typography>
                  )
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <p style={{ textAlign: 'center' }}>Loading topic...</p>
      )}
      <style jsx>{`
        .topic-content img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
};

export default TopicDetail;
