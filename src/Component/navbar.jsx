import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { logout } from "../reducer/Actions";
import { ThemeContext } from './ThemeContext';
import { Divider, IconButton, Button, Avatar, Menu, MenuItem } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = ({ logout, isAuthenticated }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = () => {
    logout();
  };

  const headingColor = theme === 'light' ? '#000000' : '#ffffff';
  const accentColor = theme === 'light' ? 'tomato' : '#ff6347';
  const navbarClass = theme === 'light' ? 'navbar navbar-expand-lg navbar-light bg-light' : 'navbar navbar-expand-lg navbar-dark bg-dark';
  const location = useLocation();
  const isActiveLink = (path) => location.pathname === path;
  const footerBgColor = theme === 'light' ? '#f8f9fa' : '#343a40';

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Navigate to the search page
    navigate('/search'); // Change '/search' to your search page route
  };


  return (
    <>
      <div className="navbar-container" style={{ backgroundColor: footerBgColor }}>
        <a href="/" className="navbar-brand">
          <div className="brand-content">
            <h2 className="fw-bold" style={{ margin: 0, color: headingColor }}>Acadamic</h2>
            <h2 className="fw-bold" style={{ margin: 0, color: accentColor }}>Folio</h2>
          </div>
        </a>
        <div style={{ display: 'flex', alignItems: 'center' }} className="ms-auto">
          <IconButton
            onClick={handleSearchSubmit}
            sx={{ color: theme === 'light' ? '#000' : '#fff' }}
          >
            <SearchIcon />
          </IconButton>
          <IconButton
            onClick={toggleTheme}
            sx={{ color: theme === 'light' ? '#000' : '#fff' }}
          >
            {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
          {isAuthenticated ? (
            <>
              <IconButton onClick={handleMenuOpen}>
                <Avatar sx={{ bgcolor: accentColor, width: 32, height: 32, fontSize: 16 }}>A</Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <Button href='change/password/' color='inherit'>Change Password</Button>
                </MenuItem>
                <MenuItem onClick={logoutUser}>
                  <Button color='inherit'>Logout</Button>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <a className="btn btn-dark" href="login">Login</a>
          )}
        </div>
      </div>
      <Divider sx={{ borderColor: accentColor }} />

      <nav className={navbarClass}>
        <div className="container-fluid text-center">
          <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className={`nav-item nav-link ${isActiveLink("/") ? "active" : ""}`} aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className={`nav-item nav-link ${isActiveLink("/about") ? "active" : ""}`} aria-current="page" href="/about">About</a>
              </li>
              <li className="nav-item">
                <a className={`nav-item nav-link ${isActiveLink("/contact") ? "active" : ""}`} aria-current="page" href="/contact">Contact</a>
              </li>
              <li className="nav-item">
                <a className={`nav-item nav-link ${isActiveLink("/blogs") ? "active" : ""}`} aria-current="page" href="/blogs">Blogs</a>
              </li>
              <li className="nav-item">
                <a className={`nav-item nav-link ${isActiveLink("/shorts") ? "active" : ""}`} aria-current="page" href="/shorts">Shorts</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Divider sx={{ borderColor: accentColor }} />

      <div
        className="bg-dark"
        style={{
          backgroundColor: '#1e1e1e', // Dark background color
          padding: '0px', // Adjust padding if necessary
          margin: 0, // Remove any extra margin
        }}
      >
        <ul
          className="text-white"
          style={{
            listStyle: 'none',
            display: 'flex',
            padding: 0,
            margin: 0, // Ensure there's no margin causing a gap
            overflowX: 'auto', // Enables horizontal scrolling
            whiteSpace: 'nowrap', // Prevents items from wrapping to the next line
          }}
        >
          <li style={{ padding: '10px 0' }}>
            <a
              href="#"
              className="nav-links"
              style={{
                textDecoration: 'none',
                color: 'white',
                padding: '10px',
                borderRadius: '5px',
              }}
            >
              Python
            </a>
          </li>
          <li style={{ padding: '10px 0' }}>
            <a
              href="#"
              className="nav-links"
              style={{
                textDecoration: 'none',
                color: 'white',
                padding: '10px',
                borderRadius: '5px',
              }}
            >
              JavaScript
            </a>
          </li>
          <li style={{ padding: '10px 0' }}>
            <a
              href="#"
              className="nav-links"
              style={{
                textDecoration: 'none',
                color: 'white',
                padding: '10px',
                borderRadius: '5px',
              }}
            >
              React
            </a>
          </li>
          <li style={{ padding: '10px 0' }}>
            <a
              href="#"
              className="nav-links"
              style={{
                textDecoration: 'none',
                color: 'white',
                padding: '10px',
                borderRadius: '5px',
              }}
            >
              Django
            </a>
          </li>
        </ul>
      </div>



    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated
  }
}

export default connect(mapStateToProps, { logout })(Navbar);
