import React, { useContext, useState } from 'react';
import axios from 'axios';
import { ThemeContext } from './ThemeContext';
import moment from 'moment'; // Make sure to import moment for date formatting
import { Divider } from '@mui/material'; // Assuming you're using Material-UI for the Divider

const SearchComponent = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const { theme } = useContext(ThemeContext);

    const clearSearch = () => {
        setQuery(""); // Clear the search query
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) return; // Prevent search if query is empty

        setLoading(true);
        try {
            const response = await axios.get(`https://acadamicfolio.pythonanywhere.com/app/search/?query=${query}`);
            setResults(response.data); // Adjust this based on the actual response structure
        } catch (error) {
            console.error('Error fetching data:', error);
            setResults([]); // Clear results on error
        } finally {
            setLoading(false);
        }
    };

    // Define card styles for light and dark themes
    const cardStyle = {
        backgroundColor: theme === 'light' ? '#ffffff' : '#2C2C2C', // Light card background vs Dark card background
        color: theme === 'light' ? '#000000' : '#ffffff', // Text color
        border: theme === 'light' ? '1px solid #ccc' : '1px solid #444', // Border color
    };

    const searchStyle = {
        backgroundColor: theme === 'light' ? '#ffffff' : '#2e2e2e',
        color: theme === 'light' ? '#000' : '#fff',
        border: theme === 'light' ? '1px solid #ccc' : '1px solid #444'
      };
    

    return (
        <div style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#121212', color: theme === 'light' ? '#000' : '#fff',minHeight: '100vh' }}>
            <div className='container pt-3 pb-3'>

                <h2 className='text-center p-3 fw-bold text-info' style={{ fontFamily: 'cursive' }}>Search for a Blog</h2>
                <form onSubmit={handleSearch} className="mb-4">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search blogs..."
                            value={query}
                            style={searchStyle}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="submit">Search</button>
                        </div>
                        {query && (
                            <div className="input-group-append">
                                <button className="btn btn-secondary" onClick={clearSearch} type="button">Clear</button>
                            </div>
                        )}
                    </div>
                </form>

                <div className="row">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="mt-4">
                            {results.length > 0 ? (
                                results.map((blog) => (
                                    <div key={blog.id} className="col-md"> {/* Adjust column width as needed */}
                                        <div className="card" style={cardStyle}>
                                            <div className="card-body">
                                                <h3 className="card-title">{blog.title}</h3>
                                                <Divider />
                                                <p className="card-text" dangerouslySetInnerHTML={{ __html: blog.content }} />
                                                <p className="card-text"><small className="text-muted">Views: {blog.views}</small></p>
                                                <p className="card-text"><small className="text-muted">{moment(blog.date).format("DD-MMMM-YYYY")}</small></p>
                                               
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>No blogs found.</div> // Message when no blogs are found
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchComponent;
