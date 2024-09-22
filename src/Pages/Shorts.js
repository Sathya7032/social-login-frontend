import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/shorts.css';
import ReactPlayer from 'react-player';
import { ThemeContext } from '../Component/ThemeContext';

const Shorts = () => {
  const [categories, setCategories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    // Fetch categories from API
    axios.get('http://127.0.0.1:8000/app/languages/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch videos based on selected category from API
    let url = 'http://127.0.0.1:8000/app/api/shorts/';
    if (selectedCategory) {
      url += `?category_id=${selectedCategory}`;
    }

    axios.get(url)
      .then(response => {
        setVideos(response.data);
      })
      .catch(error => {
        console.error("Error fetching videos:", error);
      });
  }, [selectedCategory]);

  return (
    <div style={{
      backgroundColor: theme === 'light' ? '#ffffff' : '#121212',
      color: theme === 'light' ? '#000' : '#fff',
    }}>
        <div className="container p-5">
          <h1 className="mb-4">Video Library</h1>

          {/* Category Selector */}
          <div className="mb-4">
            <label className="form-label" htmlFor="categorySelect">Select Category:</label>
            <select
              id="categorySelect"
              className={`form-select ${theme === 'light' ? 'bg-light text-dark' : 'bg-dark text-light'}`}
              onChange={e => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Video Display */}
          <div className="shorts-video-container">
            {videos.length > 0 ? (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {videos.map(video => (
                  <div key={video.id} className="col">
                    <div className={`card h-100 ${theme === 'light' ? 'bg-light text-dark' : 'bg-dark text-light'}`}>
                      <ReactPlayer
                        url={video.video_url}
                        playing={false} // Ensure videos do not play automatically
                        controls
                        width="100%"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{video.title}</h5>
                        <p className="card-text">{video.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>No videos available in this category.</div>
            )}
          </div>
        </div>
    </div>
  );
};

export default Shorts;
