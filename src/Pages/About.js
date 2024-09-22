import React, { useContext } from 'react';

import { ThemeContext } from '../Component/ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const About = () => {
    const { theme } = useContext(ThemeContext);
    const accentColor = theme === 'light' ? 'tomato' : '#ff6347';

    return (
        <div className={`bg-${theme === 'light' ? 'light' : 'dark'} text-${theme === 'light' ? 'dark' : 'light'}`}>
                <div className="container py-5">
                    <h2 className="text-center fw-bold text-success mb-4">About Us</h2>
                    <p className="fw-bold">
                        Welcome to Acadamic<span style={{ color: accentColor }}>Folio</span>!
                    </p>
                    <p className="fw-bold">
                        At Acadamic<span style={{ color: accentColor }}>Folio</span>, we are passionate about empowering technology enthusiasts and professionals through high-quality educational content. Our mission is to provide a comprehensive resource for learning and mastering the latest in technology.
                    </p>
                    <section>
                        <h2 className="mb-3">What We Offer</h2>
                        <ul className="list-unstyled">
                            <li><strong>Tutorials:</strong> Our step-by-step guides cover a wide range of topics, from beginner basics to advanced techniques. Whether you’re diving into a new technology or honing your skills, our tutorials are designed to make complex concepts easy to understand.</li>
                            <li><strong>Blogs:</strong> Stay updated with the latest trends and insights in the tech world through our engaging blog posts. Our articles cover industry news, best practices, and personal experiences to keep you informed and inspired.</li>
                            <li><strong>Code Snippets:</strong> Find practical, reusable code snippets to speed up your development process. Our collection of code examples is designed to help you solve common problems and implement new features efficiently.</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className="mb-3">Why Choose Us?</h2>
                        <ul className="list-unstyled">
                            <li><strong>Expertise:</strong> Our content is created by experienced professionals who are dedicated to delivering accurate and up-to-date information.</li>
                            <li><strong>Community:</strong> We believe in the power of collaboration and learning from each other. Join our community to share your knowledge, ask questions, and connect with like-minded individuals.</li>
                            <li><strong>Quality:</strong> We are committed to providing high-quality content that meets the needs of our diverse audience. From clear explanations to well-organized resources, we strive to ensure a valuable learning experience.</li>
                        </ul>
                    </section>
                </div>
        </div>
    );
}

export default About;
