import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import moment from "moment";
import { Divider } from "@mui/material";
import { ThemeContext } from "../Component/ThemeContext";

const Blogs = () => {
  const baseUrl = "https://acadamicfolio.pythonanywhere.com/app";
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState(""); // State to hold search query
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    fetchBlogs();
  }, [currentPage, query]); // Fetch blogs on page or query change

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/blogs/`, {
        params: {
          page: currentPage,
          query: query.trim() || undefined // Include query parameter if it's not empty
        }
      });
      setBlogs(response.data.results);

      // Assuming the API response includes a count field indicating the total number of blog entries
      const totalEntries = response.data.count;

      // Assuming each page returns 10 entries, calculate total pages
      const entriesPerPage = 10;
      setTotalPages(Math.ceil(totalEntries / entriesPerPage));
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
    setLoading(false);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
    fetchBlogs(); // Fetch blogs with the current query
  };

  const clearSearch = () => {
    setQuery(""); // Clear the search query
    setCurrentPage(1); // Reset to first page when clearing search
    fetchBlogs(); // Fetch all blogs without search query
  };

  // Dynamic styles based on the theme
  const cardStyle = {
    backgroundColor: theme === 'light' ? '#f9f9f9' : '#1e1e1e',
    color: theme === 'light' ? '#000' : '#fff',
    border: theme === 'light' ? '1px solid #ddd' : '1px solid #333'
  };

  const searchStyle = {
    backgroundColor: theme === 'light' ? '#ffffff' : '#2e2e2e',
    color: theme === 'light' ? '#000' : '#fff',
    border: theme === 'light' ? '1px solid #ccc' : '1px solid #444'
  };

  return (
    <div style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#121212', color: theme === 'light' ? '#000' : '#fff' }}>
      <div className="container pt-3">
        {/* Search form */}
        <form onSubmit={handleSearch} className="mb-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              style={searchStyle}
              placeholder="Search blogs..."
              value={query}
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
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <div key={blog.id} className="card mb-2" style={cardStyle}>
                    <div className="card-body">
                      <h3 className="card-title">{blog.title}</h3>
                      <Divider />
                      <p className="card-text" dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 400) }} />
                      <p className="card-text"><small className="text-muted">Views: {blog.views}</small></p>
                      <p className="card-text"><small className="text-muted">{moment(blog.date).format("DD-MMMM-YYYY")}</small></p>
                      <a href={`/blogs/${blog.url}/`} className="btn btn-primary" rel="noopener noreferrer">
                        Continue Reading
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div>No blogs found.</div> // Message when no blogs are found
              )}
            </div>
          )}
        </div>

        {/* Pagination controls */}
        <div className="d-flex justify-content-center p-3">
          <button
            className="btn btn-secondary mr-2"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>{currentPage} / {totalPages}</span>
          <button
            className="btn btn-secondary ml-2"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
