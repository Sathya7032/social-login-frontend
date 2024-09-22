import React, { useContext, useState } from "react";
import { connect } from "react-redux";
import { logout } from "../reducer/Actions";
import { ThemeContext } from './ThemeContext';
import { Divider, IconButton, Button, Avatar, Menu, MenuItem } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useLocation } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = ({ logout, isAuthenticated }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState(null);

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

  
  return (
    <>
      <div className="navbar-container" style={{ backgroundColor: footerBgColor }}>
        <a href="/" className="navbar-brand">
          <div className="brand-content">
            <h2 className="fw-bold" style={{ margin: 0, color: headingColor }}>Acadamic</h2>
            <h2 className="fw-bold" style={{ margin: 0, color: accentColor }}>Folio</h2>
          </div>
        </a>
        <div style={{ display: 'flex', alignItems: 'center' }} className="ms-auto"> {/* Align to the right */}
          <IconButton
            onClick={toggleTheme}
            sx={{ color: theme === 'light' ? '#000' : '#fff' }}
          >
            {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
          {isAuthenticated ? (
            <>
              <IconButton onClick={handleMenuOpen}>
                <Avatar sx={{ bgcolor: accentColor }}>U</Avatar> {/* Change 'U' to user's initial */}
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <Button href='/profile' color='inherit'>Profile</Button>
                </MenuItem>
                <MenuItem onClick={logoutUser}>
                  <Button color='inherit'>Logout</Button>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <a className="btn btn-success" href="login">login</a>
          )}
        </div>
      </div>
      <Divider sx={{ borderColor: accentColor }} />

      {/* Bootstrap Navbar */}
      <nav className={navbarClass}>
        <div className="container-fluid text-center">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-info" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
      <Divider sx={{ borderColor: accentColor }} />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated
  }
}

export default connect(mapStateToProps, { logout })(Navbar);
